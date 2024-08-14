import {LOGO_DEFAULT} from "@/constants";
import Image from "next/image";
import React from "react";

const FixtureItemAway = ({it}: any) => {
	return (
		<div className=" flex justify-between max-md:pr-4">
			<div className="flex items-center gap-2">
				<div className="w-6 h-6 relative">
					<Image src={it?.awayIcon || LOGO_DEFAULT} alt={"Default Logo"} fill />
				</div>
				<p className="text-wrap max-md:text-sm">{it?.awayName}</p>
			</div>

			<div className="flex items-center gap-x-8 max-md:text-sm">
				<span>{it?.awayHalfScore}</span>
				<span>{it?.awayScore}</span>
			</div>
		</div>
	);
};

export default FixtureItemAway;
