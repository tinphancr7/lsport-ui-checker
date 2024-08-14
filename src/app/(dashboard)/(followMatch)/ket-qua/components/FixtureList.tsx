"use client";

import moment from "moment";
import {IoIosArrowForward} from "react-icons/io";
import FixtureItemHome from "./FixtureItemHome";
import FixtureItemAway from "./FixtureItemAway";
import Link from "next/link";
import slugify from "slugify";

const FixtureList = ({listMatches}: any) => {
	return (
		<>
			{listMatches?.map((it: any, index: number) => (
				<div key={index}>
					<div className="grid grid-cols-12 items-center border-t border-slate-200 py-4">
						<div className="col-span-10 flex flex-col gap-4">
							<FixtureItemHome it={it} />
							<FixtureItemAway it={it} />
						</div>
						<div className="col-span-2 flex items-center gap-5">
							<span className=" w-full text-right text-primary font-semibold max-md:text-sm max-md:font-medium">
								{moment.unix(it?.matchTime).format("HH:mm")}
							</span>
							<Link
								href={`match/${slugify(`${it?.homeName} vs ${it?.awayName}`, {
									lower: true,
									replacement: "-",
									locale: "vi",
									trim: true,
								})}/${it?.matchId}`}
								className="flex justify-end text-right text-primary font-semibold"
							>
								<IoIosArrowForward size={20} />
							</Link>
						</div>
					</div>
				</div>
			))}
		</>
	);
};

export default FixtureList;
