const homeTabs = [
	{
		id: "playing",
		label: "Trong trận",
	},
	{
		id: "upcoming",
		label: "Sắp diễn ra",
	},
	{
		id: "soon",
		label: "Sớm",
	},
	{
		id: "betting",
		label: "Cược xâu",
	},
	{
		id: "finish",
		label: "Chung cuộc",
	},
];

const betTabs = [
	{
		id: "tat-ca",
		label: "Tất cả",
	},
	{
		id: "cuoc-chap",
		label: "Cược chấp",
	},
	{
		id: "tai-xiu",
		label: "Tài/Xỉu",
	},
	{
		id: "keo-goc",
		label: "Kèo góc",
	},
	{
		id: "cuoc-phut",
		label: "Cược phút",
	},
	{
		id: "keo-the-phat",
		label: "Kèo thẻ phạt",
	},
];

const paymentTabs = [
	{
		id: "tat-ca",
		label: "Tất cả",
	},
	{
		id: "chua-thanh-toan",
		label: "Chưa thanh toán",
	},
	{
		id: "da-thanh-toan",
		label: "Đã thanh toán",
	},
	{
		id: "huy",
		label: "Hủy",
	},
];

const weekdays = [
	"Chủ nhật",
	"Thứ 2",
	"Thứ 3",
	"Thứ 4",
	"Thứ 5",
	"Thứ 6",
	"Thứ 7",
];
const upcomingTabs = [
	{
		id: 1,
		label: "1 giờ",
	},
	{
		id: 3,
		label: "3 giờ",
	},
	{
		id: 6,
		label: "6 giờ",
	},
	{
		id: 12,
		label: "12 giờ",
	},
	{
		id: 24,
		label: "24 giờ",
	},
];
export enum FootballPeriods {
	FirstHalf = 10, // 1st Half
	SecondHalf = 20, // 2nd Half
	FirstExtraHalf = 30, // Overtime 1st Half
	SecondExtraHalf = 35, // Overtime 2nd Half
	Penalties = 50, // Penalties
	FullTime = 100, // Full time
	FullTimeAfterOvertime = 101, // Full time after overtime
	FullTimeAfterPenalties = 102, // Full time after penalties
}
const matchStatus: {[key: string]: string} = {
	"1": "Sắp diễn ra",
	"2": "Trong trận",
	"3": "Chung cuộc",
	"4": "Hủy",
	"5": "Hoãn",
	"6": "Bị gián đoạn",
	"7": "Bị hủy",
	"8": "Mất tín hiệu",
};

const periodsStatus: {[key: number]: string} = {
	[FootballPeriods.FirstHalf]: "Hiệp 1",
	[FootballPeriods.SecondHalf]: "Hiệp 2",
	[FootballPeriods.FirstExtraHalf]: "Hiệp 1 hiệp phụ",
	[FootballPeriods.SecondExtraHalf]: "Hiệp 2 hiệp phụ",
	[FootballPeriods.Penalties]: "Luân lưu",
	[FootballPeriods.FullTime]: "Chung cuộc",
	[FootballPeriods.FullTimeAfterOvertime]: "Chung cuộc sau hiệp phụ",
	[FootballPeriods.FullTimeAfterPenalties]: "Chung cuộc sau luân lưu",
};
const LOGO_DEFAULT = "/imgs/logo-default.png";
const currencies = [
	{
		key: "vi",
		label: "Việt Nam Đồng (VND)",
	},
];

export {
	homeTabs,
	betTabs,
	paymentTabs,
	weekdays,
	upcomingTabs,
	matchStatus,
	periodsStatus,
	LOGO_DEFAULT,
	currencies,
};
