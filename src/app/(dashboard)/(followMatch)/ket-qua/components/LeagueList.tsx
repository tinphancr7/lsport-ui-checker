"use client";
import {IoIosArrowForward} from "react-icons/io";
import {Fragment} from "react";
import FixtureList from "./FixtureList";
import Image from "next/image";
import {LOGO_DEFAULT} from "@/constants";

const LeagueList = ({item}: any) => {
	return (
		<div>
			{item?.data?.map((league: any, index: number) => {
				return (
					<Fragment key={index}>
						<div className="flex justify-between border-t border-slate-200 py-4">
							<div className="flex items-center gap-x-2">
								<div className="w-8 h-8 relative">
									<Image
										src={league?.league?.logo || LOGO_DEFAULT}
										fill
										alt="Châu Âu"
									/>
								</div>
								<div>
									<p>{league?.league?.name}</p>
								</div>
							</div>
							<div className="flex items-center text-lg text-primary font-semibold gap-2">
								<span>{league?.listMatches?.length}</span>{" "}
								<span>
									<IoIosArrowForward />
								</span>
							</div>
						</div>
						<FixtureList listMatches={league?.listMatches} />
					</Fragment>
				);
			})}
		</div>
	);
};

export default LeagueList;
