"use client";

import {createVote} from "@/apis/tips.api";
import {useAuthStore} from "@/stores/useAuthStore";
import NotifyMessage from "@/utils/notify";
import {Button} from "@nextui-org/react";
import {useEffect, useState} from "react";

function TabsVotes({data, tabs}: any) {
	const {isAuthenticated, user} = useAuthStore();
	const [tab, setTab] = useState("");

	useEffect(() => {
		if (isAuthenticated) {
			const getVote = data?.votes?.find(
				(vt: any) => vt?.createdBy === user?._id
			);

			if (getVote) {
				setTab(String(getVote.position));
			}
		}

		return () => {};
	}, [data, isAuthenticated, user]);

	const handleChangeTab = async (value: any) => {
		if (value === tab) return;

		if (!isAuthenticated) {
			return NotifyMessage("Vui lòng đăng nhập để bình chọn trận đấu!", "info");
		}

		setTab(value);

		const getTabValue = tabs?.find((it: any) => it?.position === value);

		try {
			const {data: response} = await createVote(data?._id, {
				position: Number(getTabValue?.position),
				value: getTabValue?.value,
			});

			if (response?.status === 1) {
				NotifyMessage("Bình chọn thành công!", "success");
			}
		} catch (error) {
			console.log("error: ", error);

			NotifyMessage("Bình chọn thất bại. Vui lòng thử lại!", "error");
		}
	};

	return (
		<div className="flex justify-center mt-4 bg-light rounded-lg shadow-md overflow-hidden p-4 gap-x-1 max-md:p-2">
			<div className="flex h-fit items-center flex-nowrap overflow-x-scroll scrollbar-hide shadow-none justify-between border-0 gap-6 w-full relative rounded-lg bg-light p-0 font-semibold">
				{tabs?.map((item: any) => (
					<Button
						key={item?.position}
						className="bg-light z-0 w-full px-3 py-1 border-0 h-12 rounded-md data-[hover-unselected=true]:bg-primary"
						onPress={() => handleChangeTab(item?.position)}
						isDisabled={
							(data?.type !== "europeOdds" && item.position === "1") ||
							data?.status !== 0
								? true
								: false
						}
					>
						<div
							className={`flex items-center justify-center text-center rounded-md text-xl max-md:text-base z-10 ${
								tab === item?.position
									? "text-light font-semibold"
									: "text-dark"
							}`}
						>
							{item?.label}
						</div>

						{/* Cursor */}
						<div
							className={`transition-all absolute z-0 rounded-small shadow-small w-full dark:bg-primary bg-primary ${
								tab === item?.position
									? "visible opacity-100 inset-0"
									: "invisible opacity-0 transform-none"
							}`}
						/>
					</Button>
				))}
			</div>
		</div>
	);
}

export default TabsVotes;
