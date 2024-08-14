"use client";
import React, { useState } from "react";
import BookmarkRow from "@/components/ListBoard/BookmarkRow";
import HeaderRow from "@/components/ListBoard/HeaderRow";
import GameRow from "@/components/ListBoard/GameRow";
import GameRow2 from "@/components/ListBoard/GameRow2";
import HalfTimeRow from "@/components/ListBoard/HalfTimeRow";

const BoardFavourite = ({ item }: any) => {
	const [isBookmark, setIsBookmark] = useState(true);
	
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

export default BoardFavourite;
