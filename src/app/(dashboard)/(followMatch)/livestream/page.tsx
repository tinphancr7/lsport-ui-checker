import dynamic from "next/dynamic";
const Livestream = dynamic(() => import("./components/Livestream"));
const SearchLive = dynamic(() => import("./components/SearchLive"));

const LiveStreamPage = () => {
	return (
		<div className="flex flex-col gap-5 pb-10">
			<SearchLive />
			<Livestream />
		</div>
	);
};

export default LiveStreamPage;
