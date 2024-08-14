import HandicapBetting from "./handicapBetting";

const X2BetData = {
    title: "1X2",
	homeTeam: {
		scope: 2,
        category: "+",
		bets: [
			{
				bet: "0/0.5",
				total: "1.86",
			},
		],
	},
	awayTeam: {
		scope: 2,
		bets: [
			{
				bet: <span className="text-gray/50 tracking-wider">1</span>,
				total: "1.86",
			},
		],
	},
    draw: {
		name: <span className="text-primary tracking-wider">Tài 2/2.5</span>,
		bets: ["1.86"],
	},
};

const HandicapBetData = {
	homeTeam: {
		name: "Slovakia",
		scope: 2,
		category: "+",
		bets: [
			{
				bet: "0/0.5",
				total: "1.86",
			},
			{
				bet: "0/0.5",
				total: "1.86",
			},
			{
				bet: "0/0.5",
				total: "1.86",
			},
			{
				bet: "0/0.5",
				total: "1.86",
			},
		],
	},
	awayTeam: {
		name: "Ukraine",
		scope: 2,
		category: "+",
		bets: [
			{
				bet: "0/0.6",
				total: "1.86",
			},
			{
				bet: "0/0.6",
				total: "1.86",
			},
			{
				bet: "0/0.6",
				total: "1.86",
			},
			{
				bet: "0/0.6",
				total: "1.86",
			},
		],
	},
};

const HandicapBetData3 = {
	homeTeam: {
		name: "Slovakia",
		scope: 2,
		category: "Tài",
		bets: [
			{
				bet: "0/0.5",
				total: "1.86",
			},
			{
				bet: "0/0.6",
				total: "1.86",
			},
			{
				bet: "0/0.6",
				total: "1.86",
			},
			{
				bet: "0/0.6",
				total: "1.86",
			},
		],
	},
	awayTeam: {
		name: "Ukraine",
		scope: 2,
		category: "Xỉu",
		bets: [
			{
				bet: "0/0.6",
				total: "1.86",
			},
			{
				bet: "0/0.6",
				total: "1.86",
			},
			{
				bet: "0/0.6",
				total: "1.86",
			},
			{
				bet: "0/0.6",
				total: "1.86",
			},
		],
	},
};

const dataList = [
    {
		title: "Bàn thắng 15 Phút (00:01 - 15:00)",
		openScope: false,
		data: X2BetData,
	},
	{
		title: "Cược chấp",
		openScope: false,
		data: HandicapBetData,
	},
    {
		title: "Tài/Xỉu",
		openScope: false,
		data: HandicapBetData3,
	},
];

function InfoMinuteBet() {
    return (  
        <div className="flex flex-col gap-4 px-2 max-md:px-0">
            {dataList?.map((item: any, index: number) => (
				<HandicapBetting
					key={index}
					title={item?.title}
					openScope={item?.openScope}
					data={item?.data}
				/>
			))}
        </div>
    );
}

export default InfoMinuteBet;