"use client";
import {useMatchDetailStore} from "@/stores/useMatchDetailStore";
import dynamic from "next/dynamic";
const BoardBettingTwoCol = dynamic(() => import("./BoardBettingTwoCol"));

function InfoOverUnder() {
	const {data} = useMatchDetailStore();

	return (
		<div className="flex flex-col gap-4 px-2 max-md:px-0">
			{data?.overUnder && (
				<>
					<BoardBettingTwoCol title="Tài/Xỉu" data={data} type="overUnder" />
					<BoardBettingTwoCol
						title="Tài/Xỉu Hiệp 1"
						data={data}
						type="overUnderHalf"
					/>
				</>
			)}
		</div>
	);
}

export default InfoOverUnder;
