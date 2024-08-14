"use client";

import {useMatchDetailStore} from "@/stores/useMatchDetailStore";
import dynamic from "next/dynamic";

const BoardBettingTwoCol = dynamic(() => import("./BoardBettingTwoCol"));
const BoardBettingThreeCol = dynamic(() => import("./BoardBettingThreeCol"));

function InfoAll() {
	const {data} = useMatchDetailStore();

	return (
		<div className="flex flex-col gap-4 px-2 max-md:px-0">
			{data?.handicap && (
				<>
					<BoardBettingTwoCol title="Cược chấp" data={data} type="handicap" />
					<BoardBettingTwoCol
						title="Cược chấp Hiệp 1"
						data={data}
						type="handicapHalf"
					/>
				</>
			)}

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
			{data?.europeOdds && (
				<>
					<BoardBettingThreeCol title="1X2" data={data} type="europe" />
					<BoardBettingThreeCol
						title="1X2 Hiệp 1"
						data={data}
						type="europeHalf"
					/>
				</>
			)}
		</div>
	);
}

export default InfoAll;
