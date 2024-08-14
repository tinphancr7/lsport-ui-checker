import Image from "next/image";
import { LOGO_DEFAULT } from "@/constants";
import moment from "moment";
import { CiCalendar, CiClock2 } from "react-icons/ci";

export interface HeaderProps {
	match: {
		homeName: string;
		homeIcon: string;
		awayName: string;
		awayIcon: string;
		matchTime: number;
	};
}

function Header({ match }: HeaderProps) {
    const day = moment.unix(match.matchTime)
    const isToday = day.isSame(moment(), "day");
    const renderDay = isToday ? "Hôm nay" : day?.format("DD-MM");

	return (
		<div className="relative flex items-center justify-center">
			<div className="h-[120px] w-full relative">
				<Image
					src="/imgs/match-info.png"
					alt=""
					fill
					className="h-auto object-cover rounded-xl"
				/>
			</div>
			<div className="absolute z-10 top-0 left-0 bottom-0 right-0 bg-slate-900/80 rounded-lg">
				<div className="h-full grid grid-cols-12 justify-between items-center max-md:py-3 max-md:gap-1">
					<div className="col-span-5 max-md:col-span-3 flex justify-center items-center gap-5 max-md:flex-col-reverse max-md:justify-end max-md:gap-2 max-md:h-full">
						<p className="text-light text-center text-2xl font-bold max-md:text-xs max-md:font-medium line-clamp-3">
							{match?.homeName}
						</p>
						<div className="bg-white rounded-full p-2 max-md:p-0">
							<div className="w-14 h-14 bg-transparent ring-offset-white max-md:w-10 max-md:h-10 relative">
								<Image
									src={match?.homeIcon || LOGO_DEFAULT}
									alt=""
									fill
									className="rounded-lg"
								/>
							</div>
						</div>
					</div>
					<div className="col-span-2 max-md:col-span-6 text-light max-md:h-full">
                        <h1 className="text-center font-bold text-3xl">VS</h1>

						<div className="font-semibold text-sm flex justify-center items-center gap-2 mt-2">
                            <span>
                                <CiCalendar className="text-xl" />
                            </span>
                            <span className="tracking-wide">
                                {renderDay}
                            </span>
                            <span>
                                <CiClock2 className="text-xl" />
                            </span>
                            <span className="tracking-wide">
                                {moment.unix(match?.matchTime)?.format("HH:mm")}
                            </span>
						</div>
					</div>
					<div className="col-span-5 max-md:col-span-3 flex justify-center items-center gap-5 max-md:flex-col max-md:justify-start max-md:gap-2 max-md:h-full">
						<div className="bg-white rounded-full p-2 max-md:p-0">
							<div className="w-14 h-14 bg-transparent ring-offset-white max-md:w-10 max-md:h-10 relative">
								<Image
									src={match?.awayIcon || LOGO_DEFAULT}
									alt=""
									fill
									className="rounded-lg"
								/>
							</div>
						</div>
						<p className="text-light text-center text-2xl font-bold max-md:text-xs max-md:font-medium line-clamp-3">
							{match?.awayName}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Header;
