import HandicapBetting from "./handicapBetting";


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

const HandicapBetData1 = {
	homeTeam: {
		name: "Slovakia",
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
		name: "Ukraine",
		scope: 2,
		category: "+",
		bets: [
			{
				bet: "0/0.6",
				total: "1.86",
			},
		],
	},
};

const HandicapBetData4 = {
	homeTeam: {
		name: "Slovakia",
		scope: 0,
		bets: [
			{
				bet: "0",
				total: "1.86",
			},
		],
	},
	awayTeam: {
		name: "Ukraine",
		scope: 1,
		bets: [
			{
				bet: "1",
				total: "1.86",
			},
		],
	},
};

const HandicapBetData5 = {
	homeTeam: {
		name: "Slovakia",
		scope: 0,
		bets: [
			{
				bet: "1",
				total: "1.86",
			},
			{
				bet: "1",
				total: "1.86",
			},
			{
				bet: "1",
				total: "1.86",
			},
			{
				bet: "1",
				total: "1.86",
			},
		],
	},
	awayTeam: {
		name: "Ukraine",
		scope: 1,
		bets: [
			{
				bet: "1",
				total: "1.86",
			},
			{
				bet: "1",
				total: "1.86",
			},
			{
				bet: "1",
				total: "1.86",
			},
			{
				bet: "1",
				total: "1.86",
			},
		],
	},
	draw: {
		name: "",
		bets: ["1.86", "1.86", "1.86", "1.86"],
	},
};

const dataList = [
	{
		title: "Cược chấp",
		openScope: false,
		data: HandicapBetData,
	},
	{
		title: "Cược chấp hiệp 1",
		openScope: false,
		data: HandicapBetData,
	},
	{
		title: "Cược chấp hiệp 2",
		openScope: false,
		data: HandicapBetData1,
	},
	{
		title: "Phạt Góc: Cược chấp",
		openScope: true,
		data: HandicapBetData4,
	},
	{
		title: "Phạt Góc: Cược chấp hiệp 1",
		openScope: true,
		data: HandicapBetData4,
	},
	{
		title: "Phạt Góc: Cược chấp hiệp 2",
		openScope: true,
		data: HandicapBetData4,
	},
	{
		title: "Phạt Góc 1X2",
		openScope: true,
		data: HandicapBetData5,
	},
];

function InfoHandicapBetting() {
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

export default InfoHandicapBetting;