import {betTabs} from "@/constants";
import TabSSR from "@/components/TabComp/TabSSR";
import InfoAll from "./components/infoAll";
import InfoCornerTruss from "./components/infoCornerTruss";
import InfoMinuteBet from "./components/infoMinuteBet";
import InfoOverUnder from "./components/infoOverUnder";
import InfoHandicapBetting from "./components/infoHandicapBetting";
import InfoPenaltyBet from "./components/infoPenaltyBet";
import Header from "./components/header";
import CurrnetScope from "./components/currentScope";

function MatchInfo({
	searchParams,
}: {
	searchParams: {
		tab: string;
		keo: string;
	};
}) {
	const renderTab: {[key: string]: JSX.Element} = {
		"tat-ca": <InfoAll />,
		"cuoc-chap": <InfoHandicapBetting />,
		"tai-xiu": <InfoOverUnder />,
		"cuoc-phut": <InfoMinuteBet />,
		"keo-goc": <InfoCornerTruss />,
		"keo-the-phat": <InfoPenaltyBet />,
	};

	const tab = searchParams?.tab || "playing";
	const currentTab = searchParams?.keo || "tat-ca";

	return (
		<>
			<div className="flex flex-col gap-4 mb-4 p-2">
				<Header currentTab={tab} />

				<CurrnetScope />

				<TabSSR tabs={betTabs} currentTab={currentTab} keyTab="keo" />
			</div>

			{renderTab[currentTab]}
		</>
	);
}

export default MatchInfo;
