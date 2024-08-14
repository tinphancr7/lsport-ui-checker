import chatApi from "@/apis/chat.api";
import {useAuthStore} from "@/stores/useAuthStore";
import {useChatStore} from "@/stores/useChatStore";
import NotifyMessage from "@/utils/notify";
import {useParams} from "next/navigation";
import React, {useEffect, useRef, useState} from "react";
import {GrEmoji} from "react-icons/gr";
import EmojiPicker from "emoji-picker-react";
const ChatFooter = ({setScrollToBottom}) => {
	const {user} = useAuthStore();
	const {socket, setMessages, messages} = useChatStore();
	const {fixtureId} = useParams();
	const [message, setMessage] = useState("");
	const emojiPickerRef = useRef<any>(null);
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);

	const handleSendMessage = async (e: any) => {
		e.preventDefault();
		if (message) {
			try {
				const data = await chatApi.addMessage({
					sender: user?._id,
					message,
					fixtureId,
				});
				setScrollToBottom(true); // Trigger scroll to the bottom
				setMessages([...messages, data?.data?.data]);
				socket.emit("send-msg", {
					sender: user?._id,
					message: data?.data?.data,
				});

				setMessage("");
			} catch (error) {
				return NotifyMessage("Có lỗi xảy ra, vui lòng thử lại sau", "error");
			}
		}
	};
	const handleEmojiClick = (emoji: any) => {
		setMessage((prevMessage) => (prevMessage += emoji.emoji));
	};
	function handleKeyDown(event) {
		if (event.keyCode === 13) {
			handleSendMessage(event);
		}
	}
	const handleEmojiModal = () => {
		setShowEmojiPicker(!showEmojiPicker);
	};
	useEffect(() => {
		const handleOutsideClick = (e: any) => {
			if (e.target.id !== "emoji-open") {
				if (
					emojiPickerRef.current &&
					!emojiPickerRef.current.contains(e.target)
				) {
					setShowEmojiPicker(false);
				}
			}
		};
		document.addEventListener("click", handleOutsideClick);
		return () => {
			document.removeEventListener("click", handleOutsideClick);
		};
	}, []);
	return (
		<div className=" flex items-center gap-2 py-2.5 px-5 border-t border-[#ddd] relative">
			<input
				type="text"
				className="bg-[#ececec] rounded-full text-xs p-2 flex-1"
				placeholder="Đăng nhập để gửi tin nhắn"
				id="user-input"
				onChange={(e) => setMessage(e.target.value)}
				value={message}
				onKeyDown={handleKeyDown}
			/>
			{showEmojiPicker && (
				<div className="absolute bottom-0 right-0 z-40">
					<EmojiPicker onEmojiClick={handleEmojiClick} />
				</div>
			)}
			<button id="emoji-open" onClick={handleEmojiModal} ref={emojiPickerRef}>
				<GrEmoji size={20} />
			</button>
		</div>
	);
};

export default ChatFooter;
