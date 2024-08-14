import HandicapBetting from "./handicapBetting";

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
        category: "Tài",
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
        category: "Xỉu",
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
};

const dataList = [
	{
		title: "Thẻ Phạt: Cược chấp",
		openScope: false,
		data: HandicapBetData4,
	},
	{
		title: "Thẻ Phạt: Tài/Xỉu",
		openScope: false,
		data: HandicapBetData4,
	},
	{
		title: "Thẻ Phạt: Tài/Xỉu hiệp 1",
		openScope: false,
		data: HandicapBetData4,
	},
	{
		title: "Thẻ Phạt: Tài/Xỉu hiệp 2",
		openScope: false,
		data: HandicapBetData5,
	},
];

function InfoPenaltyBet() {
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

export default InfoPenaltyBet;