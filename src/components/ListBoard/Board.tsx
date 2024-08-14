"use client";
import React, {useState} from "react";
import HeaderRow from "./HeaderRow";
import BookmarkRow from "./BookmarkRow";
import GameRow from "./GameRow";
import HalfTimeRow from "./HalfTimeRow";
import GameRow2 from "./GameRow2";
import {useFavouriteStore} from "@/stores/useFavouriteStore";

const Board = ({item}: any) => {
	const {favouritesUser} = useFavouriteStore();

	const [isBookmark, setIsBookmark] = useState(
		Boolean(favouritesUser?.find((it: any) => it?.matchId === item?.matchId))
	);

	return (
		<div className="relative overflow-x-auto bg-white rounded-lg p-4 flex flex-col gap-4 w-full max-md:p-2 max-md:gap-2">
			<BookmarkRow
				isBookmark={isBookmark}
				setIsBookmark={setIsBookmark}
				item={item}
			/>
			<HeaderRow leagueName={item?.leagueName} />
			<div className="flex flex-col gap-2">
				<GameRow item={item} />
				<GameRow2 item={item} />
				<HalfTimeRow item={item} />
			</div>
		</div>
	);
};

export default Board;
