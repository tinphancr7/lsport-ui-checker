const PlayingMatch = dynamic(
	() => import("./components/PlayingMatch/PlayingMatch")
);
const UpcomingMatch = dynamic(
	() => import("./components/UpcomingMatch/UpcomingMatch")
);
const SoonMatch = dynamic(() => import("./components/SoonMatch/SoonMatch"));

const BettingMatch = dynamic(
	() => import("./components/BettingMatch/BettingMatch")
);
const FinishMatch = dynamic(
	() => import("./components/FinishMatch/FinishMatch")
);
// const ListCardMatch = dynamic(
// 	() => import("./components/ListCardMatch/ListCardMatch")
// );
import {homeTabs} from "@/constants";
import dynamic from "next/dynamic";
import ListCardMatch from "./components/ListCardMatch/ListCardMatch";

const TabSSR = dynamic(() => import("@/components/TabComp/TabSSR"));

const Home = ({
	searchParams,
}: {
	searchParams: {
		tab?: string;
	};
}) => {
	const {tab = "playing"} = searchParams;

	const renderTab: {[key: string]: JSX.Element} = {
		playing: <PlayingMatch />,
		upcoming: <UpcomingMatch />,
		soon: <SoonMatch />,
		betting: <BettingMatch />,
		finish: <FinishMatch />,
	};

	return (
		<div className="flex flex-col gap-5 max-md:gap-3 pb-10">
			<div className="max-md:hidden">
				<TabSSR tabs={homeTabs} currentTab={tab} />
			</div>

			<ListCardMatch />

			<div>{renderTab[tab]}</div>
		</div>
	);
};

export default Home;
