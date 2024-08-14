import {LOGO_DEFAULT} from "@/constants";
import moment from "moment";
import Image from "next/image";
import React from "react";
import {IoIosArrowForward} from "react-icons/io";

const FixtureItemHome = ({it}: any) => {
	return (
		<div className=" flex justify-between max-md:pr-4">
			<div className="flex items-center gap-2">
				<div className="w-6 h-6 relative">
					<Image src={it?.homeIcon || LOGO_DEFAULT} alt={"Default Logo"} fill />
				</div>
				<p className="text-wrap max-md:text-sm">{it?.homeName}</p>
			</div>

			<div className="flex items-center gap-x-8 max-md:text-sm">
				<span>{it?.homeHalfScore}</span>
				<span>{it?.homeScore}</span>
			</div>
		</div>
	);
};

export default FixtureItemHome;
