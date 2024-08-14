"use client";

import {useMatchDetailStore} from "@/stores/useMatchDetailStore";

function InfoCorner() {
	const {data} = useMatchDetailStore();

	return <div className="flex flex-col gap-4 px-2 max-md:px-0"></div>;
}

export default InfoCorner;
