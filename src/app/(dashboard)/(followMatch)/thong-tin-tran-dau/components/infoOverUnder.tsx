import HandicapBetting from "./handicapBetting";


const HandicapBetData2 = {
	homeTeam: {
		name: "Slovakia",
		scope: 2,
		category: "Tài",
		bets: [
			{
				bet: "0/0.5",
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
		title: "Tài/Xỉu",
		openScope: false,
		data: HandicapBetData3,
	},
	{
		title: "Tài/Xỉu hiệp 1",
		openScope: false,
		data: HandicapBetData2,
	},
	{
		title: "Tài/Xỉu hiệp 2",
		openScope: false,
		data: HandicapBetData3,
	},
];

function InfoOverUnder() {
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

export default InfoOverUnder;