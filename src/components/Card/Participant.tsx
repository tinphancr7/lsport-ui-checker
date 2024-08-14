import {LOGO_DEFAULT} from "@/constants";
import Image from "next/image";
import React from "react";

const Participant = ({logo, name}: any) => (
	<div className={`col-span-5 flex flex-col gap-1 items-center justify-center`}>
		<div className="w-9 h-9 relative">
			<Image src={logo || LOGO_DEFAULT} alt={name || "Default Logo"} fill />
		</div>
		<h3 className={`text-sm text-center font-bold line-clamp-2 text-black`}>
			{name}
		</h3>
	</div>
);

export default Participant;
