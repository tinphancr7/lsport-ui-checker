"use client";
const ListFixture = dynamic(() => import("../ListFixture/ListFixture"));
import moment from "moment";
import dynamic from "next/dynamic";

const PlayingComp = ({search}: {search: string}) => {
	return (
		<div className="flex flex-col gap-5">
			<ListFixture
				statuses="1,2,3,4,5"
				date={moment().toISOString()}
				search={search}
			/>
		</div>
	);
};

export default PlayingComp;
