import {getTipById} from "@/apis/tips.api";
import {generateData} from "@/utils";
import TabsVotes from "./components/TabsVotes";
import Header from "./components/Header";
import Description from "./components/Description";

const TipsBongDaId = async ({params}: {params: {id: string}}) => {
	const {data} = await getTipById(params?.id);

	const homeBet = generateData({
		type: data?.tip?.type,
		pos: "home",
		item: data?.tip,
	})?.bot;

	const headBet = generateData({
		type: data?.tip?.type,
		pos: "home",
		item: data?.tip,
	})?.head;

	const awayBet = generateData({
		type: data?.tip?.type,
		pos: "away",
		item: data?.tip,
	})?.bot;

	const label = {
		home: "Chủ",
		head: "HDP",
		away: "Khách",
	};

	if (data?.tip?.type === "europeOdds") {
		label.head = "Hòa";
	}

	if (data?.tip?.type === "overUnder") {
		label.home = "Tài";
		label.head = "Kèo đấu";
		label.away = "Xỉu";
	}

	const tabs: any = [
		{
			label: label?.home + " " + homeBet,
			position: "0",
			value: String(homeBet),
		},
		{
			label: `${label?.head} ${headBet ? headBet : `- ${awayBet}`}`,
			position: "1",
			value: headBet ? String(headBet) : `- ${awayBet}`,
		},
		{
			label: label?.away + " " + awayBet,
			position: "2",
			value: String(awayBet),
		},
	];

	return (
		<>
			<Header
				match={{
					homeName: data?.tip?.homeName as string,
					homeIcon: data?.tip?.homeIcon as string,
					awayName: data?.tip?.awayName as string,
					awayIcon: data?.tip?.awayIcon as string,
					matchTime: data?.tip?.matchTime as number,
				}}
			/>

			<TabsVotes data={data?.tip} tabs={tabs} />

			<Description descript={data?.tip?.descript} />
		</>
	);
};

export default TipsBongDaId;
