"use client";
import {usePathname} from "next/navigation";
import Header from "./components/header";
import LiveVideo from "./components/liveVideo";

function FollowMatch() {
	const pathname = usePathname();
	return (
		<>
			{pathname.includes("livestream") ? (
				""
			) : (
				<div className="flex flex-col h-full gap-3 flex-1">
					{/* Header */}
					<Header />

					{/* Live Video */}
					<LiveVideo />
				</div>
			)}
		</>
	);
}

export default FollowMatch;
