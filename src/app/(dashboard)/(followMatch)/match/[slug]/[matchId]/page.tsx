import dynamic from "next/dynamic";
import {betTabs} from "@/constants";
const TabSSR = dynamic(() => import("@/components/TabComp/TabSSR"));
const InfoAllBet = dynamic(() => import("./components/InfoAllBet"));
const InfoCardBet = dynamic(() => import("./components/InfoCardBet"));
const MatchStat = dynamic(() => import("./components/MatchStat"));
const InfoCorner = dynamic(() => import("./components/InfoCorner"));
const InfoHandicap = dynamic(() => import("./components/InfoHandicap"));
const InfoOverUnderBet = dynamic(() => import("./components/InfoOverUnderBet"));
const InfoMinute = dynamic(() => import("./components/InfoMinute"));

const MatchInfo = async ({
	searchParams,
	params,
}: {
	searchParams: {
		tab: string;
	};
	params: {
		matchId: string;
	};
}) => {
	const matchId = params?.matchId;

	const renderTab = {
		"tat-ca": <InfoAllBet />,
		"cuoc-chap": <InfoHandicap />,
		"tai-xiu": <InfoOverUnderBet />,
		// "cuoc-phut": <InfoMinute matchId={matchId} />,
		// "keo-goc": <InfoCorner matchId={matchId} />,
		// "keo-the-phat": <InfoCardBet matchId={matchId} />,
	};

	const currentTab = searchParams?.tab || "tat-ca";

	return (
		<>
			<div className="flex flex-col gap-4 mb-4 p-2 sticky -top-2 max-md:gap-2 max-md:px-0">
				{/* <Header currentTab={tab} /> */}

				<MatchStat matchId={matchId} />

				<TabSSR tabs={betTabs} currentTab={currentTab} />
			</div>

			<div className="mb-10">{renderTab[currentTab]}</div>
		</>
	);
};

export default MatchInfo;
