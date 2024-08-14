import {URL_IMAGE} from "@/configs/minio";
import {useAuthStore} from "@/stores/useAuthStore";

import {Avatar, Chip} from "@nextui-org/react";
import moment from "moment";

const ChatBody = ({
	lastMessageRef,
	messages,
	scrollRef,
}: {
	lastMessageRef: any;
	messages: any;
	scrollRef: any;
}) => {
	const {user, isAuthenticated} = useAuthStore();

	return (
		<div ref={scrollRef} className="h-[790px]  p-2.5 overflow-auto ">
			{messages?.length > 0 &&
				messages?.map((message, index) => {
					const showAvatar =
						index === 0 ||
						messages[index - 1].sender?._id !== message.sender?._id;
					const showTime =
						messages[index + 1]?.sender?._id !== message?.sender?._id;

					return (
						<div
							key={index}
							className={`flex items-center my-2 ${
								message?.sender?._id === user?._id ? "justify-end" : ""
							}`}
						>
							<div
								className={`flex gap-2 ${
									message?.sender?._id === user?._id ? "flex-row-reverse" : ""
								}`}
							>
								{showAvatar ? (
									<>
										<Avatar
											src={
												message?.sender?.avatar
													? `${URL_IMAGE}/${message?.sender?.avatar}`
													: ""
											}
											size="sm"
										/>
										<div className={`flex flex-col gap-1  `}>
											<div
												className={`flex text-center gap-2 ${
													message?.sender?._id === user?._id
														? "flex-row-reverse"
														: ""
												}`}
											>
												<span className="text-xs text-primary">
													{message?.sender?.username}
												</span>
											</div>
											<div
												className={`text-xs rounded-lg   p-2  ${
													message?.sender?._id === user?._id
														? "bg-primary text-white"
														: "bg-[#F6F6F6]"
												}`}
											>
												{message.message}
											</div>
											<span className="text-[10px] font-medium">
												{showTime && moment(message?.createdAt).format("HH:mm")}
											</span>
										</div>
									</>
								) : (
									<div>
										<div
											className={`text-xs rounded-lg   p-2  ${
												message?.sender?._id === user?._id
													? "bg-primary text-white mr-10"
													: "bg-[#F6F6F6] ml-10"
											}`}
										>
											{message.message}
										</div>
										{showTime && (
											<span
												className={`text-[10px] font-medium  ${
													message?.sender?._id === user?._id ? "" : " ml-10"
												}`}
											>
												{moment(message?.createdAt).format("HH:mm")}
											</span>
										)}
									</div>
								)}
							</div>
						</div>
					);
				})}
			<div ref={lastMessageRef} />
		</div>
	);
};

export default ChatBody;
