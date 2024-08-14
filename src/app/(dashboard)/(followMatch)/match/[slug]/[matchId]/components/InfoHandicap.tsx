"use client";
import {useMatchDetailStore} from "@/stores/useMatchDetailStore";
import BoardBettingTwoCol from "./BoardBettingTwoCol";

function InfoHandicap() {
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
		</div>
	);
}

export default InfoHandicap;
