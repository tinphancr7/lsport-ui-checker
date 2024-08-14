"use client";

import React, {useCallback, useEffect, useRef, useState} from "react";

import ChatFooter from "./ChatFooter";
import ChatBody from "./ChatBody";
import {useChatStore} from "@/stores/useChatStore";
import io from "socket.io-client";
import {useParams} from "next/navigation";
import {useAuthStore} from "@/stores/useAuthStore";
import Image from "next/image";
import {BACKEND_URL} from "@/utils/http";
import chatApi from "@/apis/chat.api";

const Chat = () => {
	const {
		socket,
		messages,
		setMessages,
		setSocket,
		fetchMessages,
		isLoadMore,
		setIsLoadMore,
		page,
		setPage,
		isLoading,
		setIsLoading,
		scrollToBottom,
		setScrollToBottom,
		initialScroll,
		setInitialScroll,
		maintainScrollPosition,
		setMaintainScrollPosition,
	} = useChatStore();

	const scrollRef = useRef(null);

	const {isAuthenticated} = useAuthStore();

	const lastMessageRef = useRef(null);
	const {fixtureId} = useParams();

	useEffect(() => {
		const newSocket = io(BACKEND_URL);
		newSocket.on("connect", () => console.log("Connected to the server"));
		newSocket.on("disconnect", (reason) =>
			console.log("Disconnected from the server", reason)
		);
		setSocket(newSocket);
		return () => newSocket.disconnect();
	}, [setSocket, fixtureId]);

	useEffect(() => {
		if (isAuthenticated) {
			if (fixtureId) {
				socket?.emit("join-room", {room: fixtureId});
			}
			fetchMessages(fixtureId);
		}
	}, [isAuthenticated, fixtureId, socket]);

	useEffect(() => {
		if (socket) {
			if (fixtureId) {
				socket.on("receive-room-msg", (data) =>
					setMessages([...messages, data?.message])
				);
			} else {
				socket.on("receive-msg", (data) =>
					setMessages([...messages, data?.message])
				);
			}
		}
	}, [socket, messages]);

	const loadMoreMessages = useCallback(async () => {
		if (isLoading || !isLoadMore) return;

		const scrollElement = scrollRef.current;
		if (scrollElement) {
			setInitialScroll(scrollElement.scrollHeight); // Save the scroll height before loading new
			setMaintainScrollPosition(true); // Set flag to maintain scroll position
		}

		setIsLoading(true);

		try {
			const res = await chatApi.getMessages({fixtureId, page: page + 1});

			if (res?.data?.data?.length === 0 || res?.data.totalPages <= page + 1) {
				setIsLoadMore(false); // No more messages to load
			} else {
				setMessages([...res?.data?.data, ...messages]);
				setPage(page + 1);
			}
		} catch (error) {
			console.error("Error fetching messages:", error);
		} finally {
			setIsLoading(false);
		}
	}, [isLoading, isLoadMore, fixtureId, page, setMessages, messages]);

	const handleScroll = useCallback(() => {
		if (scrollRef.current.scrollTop === 0 && isLoadMore) {
			loadMoreMessages();
		}
		showScrollbar();
	}, [loadMoreMessages]);

	useEffect(() => {
		const scrollElement = scrollRef.current;
		if (scrollElement) {
			scrollElement.addEventListener("scroll", handleScroll);
		}
		return () => {
			if (scrollElement) {
				scrollElement.removeEventListener("scroll", handleScroll);
			}
		};
	}, [handleScroll]);

	useEffect(() => {
		const scrollElement = scrollRef.current;
		// Adjust scroll position manually based on the height difference
		if (scrollElement && maintainScrollPosition) {
			scrollElement.scrollTop = scrollElement?.scrollHeight - initialScroll;
		}
	}, [messages, initialScroll, maintainScrollPosition]);
	useEffect(() => {
		if (lastMessageRef.current && scrollToBottom) {
			lastMessageRef.current.scrollIntoView({behavior: "smooth"});
			setScrollToBottom(false);
			setMaintainScrollPosition(false);
		}
	}, [messages, scrollToBottom]);
	useEffect(() => {
		if (lastMessageRef.current && page === 1) {
			lastMessageRef.current.scrollIntoView({behavior: "smooth"});
		}
	}, [lastMessageRef.current, messages]);

	// Show and hide scrollbar
	const showScrollbar = () => {
		const scrollElement = scrollRef.current;

		if (scrollElement) {
			scrollElement.classList.remove("hide-scrollbar");
			scrollElement.classList.add("show-scrollbar");
			clearTimeout(scrollElement.hideScrollbarTimeout);
			scrollElement.hideScrollbarTimeout = setTimeout(() => {
				scrollElement.classList.remove("show-scrollbar");
				scrollElement.classList.add("hide-scrollbar");
			}, 2000); // Hide scrollbar after 2 seconds of no scrolling
		}
	};
	return (
		<div
			className="bg-white rounded-lg shadow-md w-full z-50"
			id="chatbot-popup"
		>
			{isAuthenticated ? (
				<div>
					<ChatBody
						messages={messages}
						lastMessageRef={lastMessageRef}
						scrollRef={scrollRef}
					/>
					<ChatFooter setScrollToBottom={setScrollToBottom} />
				</div>
			) : (
				<div className="h-[calc(100vh-90px)] p-2.5 overflow-auto chat">
					<div className="flex items-center justify-center h-full flex-col gap-4">
						<div className="w-[120px] h-[120px] relative">
							<Image src="/imgs/hi-robot.gif" fill alt="" />
						</div>
						<p className="text-primary font-medium text-base capitalize">
							Đăng nhập để xem và gửi tin nhắn
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default Chat;
