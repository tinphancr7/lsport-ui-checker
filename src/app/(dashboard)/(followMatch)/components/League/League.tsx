import {Radio} from "@nextui-org/react";
import Image from "next/image";
import React from "react";

const League = ({item}: any) => {
	return (
		<div className="bg-light rounded-lg px-10 py-4">
			<div className="flex items-center justify-between mb-2.5">
				<span className="text-lg font-medium">
					{item?.countryProfile?.country}
				</span>
				<div className="w-[44px] h-8 relative">
					<Image src={item?.countryProfile?.countryLogo || ""} fill alt="" />
				</div>
			</div>
			<div className="flex flex-col gap-2.5">
				{item?.data.length > 0 &&
					item?.data.map((league: any, index: number) => {
						return (
							<div key={index} className="flex items-center justify-between ">
								<Radio
									value={league?.league?.leagueId}
									color="primary"
									classNames={{
										label: "text-black",
										wrapper: "group-data-[hover-unselected=true]:bg-primary",
									}}
								>
									{league?.league?.name}
								</Radio>
								<span className="w-[44px] flex items-center justify-center h-8 ">
									{league?.listMatches?.length || 0}
								</span>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default League;
