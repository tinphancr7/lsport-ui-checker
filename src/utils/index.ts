import {weekdays} from "@/constants";
import {FixtureScoreboardStatus} from "@/constants/enum";
import {isNil, omitBy} from "lodash";
import moment from "moment";

const getNextDays = ({num = 7, pos = 0} = {}) => {
	let days = [];
	for (let i = 0; i < num; i++) {
		const day = moment().add(i, "days");

		const isToday = day.isSame(moment(), "day");
		const dayOfWeek = isToday ? "Hôm nay" : weekdays[day.day()];

		days.push({
			id: i + pos,
			date: day.format("DD-MM"),
			day: day.toISOString(),
			label: ` (${dayOfWeek})`,
		});
	}

	return days;
};

const getPreviousDays = ({num = 7, pos = 0} = {}) => {
	let days = [];
	for (let i = 0; i < num; i++) {
		const day = moment().subtract(i, "days");

		const isToday = day.isSame(moment(), "day");
		const dayOfWeek = isToday ? "Hôm nay" : weekdays[day.day()];

		days.push({
			id: i + pos,
			date: day.format("DD-MM"),
			day: day.toISOString(),
			label: ` ${dayOfWeek}`,
		});
	}

	return days;
};
const isNilOrEmpty = (value: any) => isNil(value) || value === "";
const createSearchParams = ({queryConfig, params, pathname}: any) => {
	// Conditionally include params only if they have valid values
	// const validParams = omitBy(params, isNilOrEmpty);

	const config = {
		...queryConfig,
		...params,
	};

	const newParams = new URLSearchParams(config).toString();

	return `${pathname}?${newParams}`;
};

const filterParams = (params: any) => {
	return omitBy(params, isNilOrEmpty);
};
const generateStatus = ({status, date}: any) => {
	switch (status) {
		case FixtureScoreboardStatus.NotStartedYet:
			return moment.utc(date).format("DD-MM-YYYY HH:mm");
		case FixtureScoreboardStatus.InProgress:
			return "Đang diễn ra";
		case FixtureScoreboardStatus.Finished:
			return "FT";
		case FixtureScoreboardStatus.Cancelled:
			return "Hủy";
		case FixtureScoreboardStatus.Postponed:
			return "hoãn";

		default:
			return "";
	}
};
const convertStringOddToArray = (str: string) => {
	return str?.split(",");
};
const convertToOdd = (number: string) => {
	let strString = "";
	let numberParse = Math.abs(Number(number));

	if (
		numberParse == 0.5 ||
		numberParse == 1.5 ||
		numberParse == 2.5 ||
		numberParse == 1 ||
		numberParse == 3.5
	) {
		return numberParse;
	}

	if (numberParse > 0 && numberParse < 0.5) {
		strString += "0/0.5";
		return strString;
	}

	if (numberParse > 0.5 && numberParse < 1) {
		strString += "0.5/1";
		return strString;
	}

	if (numberParse > 1 && numberParse < 1.5) {
		strString += "1/1.5";
		return strString;
	}

	if (numberParse > 1.5 && numberParse < 2) {
		strString += "1.5/2";
		return strString;
	}

	if (numberParse > 2 && numberParse < 2.5) {
		strString += "2/2.5";
		return strString;
	}

	if (numberParse > 2.5 && numberParse < 3) {
		strString += "2.5/3";
		return strString;
	}

	if (numberParse > 3 && numberParse < 3.5) {
		strString += "3/3.5";
		return strString;
	}

	if (numberParse > 3.5 && numberParse < 4) {
		strString += "3.5/4";
		return strString;
	}

	return number;
};

export const generateMatchTime = ({matchTime, status, halfStartTime}: any) => {
	const matchMoment = moment.unix(matchTime);
	const now = moment();

	if (status === 0 || status === -1) {
		return matchMoment.format("DD/MM/YYYY HH:mm");
	} else if (status === 1) {
		const diffMinutes = moment.duration(now.diff(matchMoment)).asMinutes();
		return diffMinutes > 45 ? "45+" : Math.floor(diffMinutes).toString();
	} else if (status === 3) {
		const halfMoment = moment.unix(halfStartTime);
		const diffMinutes = moment.duration(now.diff(halfMoment)).asMinutes() + 45;
		return diffMinutes > 90 ? "90+" : Math.floor(diffMinutes).toString();
	} else if (status === 2) {
		return "HT";
	} else if (status === 4) {
		return "ET";
	} else if (status === 5) {
		return "Penalty";
	} else {
		return "";
	}
};
const generateData = ({type, pos, item}) => {
	const getValue = (type, index) =>
		convertStringOddToArray(item?.[type])?.[index];

	let head = "";
	let bot = "";
	const index = pos === "home" ? 6 : 7;

	const handleHandicap = (key) => {
		const value = getValue(key, 5);
		if (!value) return {head: "", bot: ""};
		head = Number(value) >= 0 === (pos === "home") ? convertToOdd(value) : "";
		bot = getValue(key, index);
		return {head, bot};
	};

	switch (type) {
		case "handicap":
		case "handicapHalf":
			return handleHandicap(type);
		case "overUnder":
		case "overUnderHalf":
			const value = getValue(type, 5);
			if (!value) return {head: "", bot: ""};
			head = convertToOdd(value);
			bot = getValue(type, index);
			return {head, bot};
		default:
			if (pos === "home" && getValue("europeOdds", 5)) {
				head = 1;
				bot = getValue("europeOdds", 5);
			} else if (pos === "away" && getValue("europeOdds", 6)) {
				head = 2;
				bot = getValue("europeOdds", 6);
			} else if (getValue("europeOdds", 7)) {
				head = "X";
				bot = getValue("europeOdds", 7);
			}
			return {head, bot};
	}
};

const generateValueBet = (type: string, pos: number, value: string) => {
	if (pos === 0 && type === "overUnder") {
		return `Tài ${value}`;
	}

	if (pos === 2 && type === "overUnder") {
		return `Xỉu ${value}`;
	}

	if (pos === 0 && (type === "handicap" || type === "europeOdds")) {
		return `Chủ ${value}`;
	}

	if (pos === 2 && (type === "handicap" || type === "europeOdds")) {
		return `Khách ${value}`;
	}

	if (pos === 1 && type === "europeOdds") {
		return `Hòa ${value}`;
	}

	return "Invalid Bet";
};
const leagues = [
	{
		key: "",
		label: "--- chọn ---",
	},
	{
		key: 1763,
		rankId: 4584,
		label: "UEFA Euro",
		logo: "uefa-euro.png",
		nameVi: "Euro Cup 2024",
		type: "2",
		description:
			"Giải vô địch bóng đá châu Âu UEFA, tên gọi ít chính thức hơn là Giải vô địch châu Âu và không chính thức là Euro, là giải đấu bóng đá chính do Liên đoàn bóng đá châu Âu (UEFA) tổ chức",
	},
	{
		key: 1639,
		rankId: 4335,
		label: "English Premier League",
		logo: "prlogo2.png",
		nameVi: "anh",
		type: "1",
		description:
			"Đối với những người yêu mến môn thể thao vua thì giải bóng đá Ngoại hạng Anh là điểm đến không thể bỏ lỡ mỗi dịp cuối tuần. Dù là các fan túc cầu lâu năm nhưng lịch sử hình thành và quá trình phát triển của Premier League là thứ ít nhiều khiến chúng ta phải tò mò. Cùng theo chân Lịch Bóng Đá để khám phá mọi góc cạnh về giải bóng đá này thông qua bài viết dưới đây.",
	},
	{
		key: 188,
		rankId: 4346,
		label: "German Bundesliga",
		logo: "bundesliga.png",
		nameVi: "đức",
		type: "1",

		description:
			"Giải bóng đá vô địch quốc gia Đức, hay còn được biết đến với cái tên Bundesliga, là giải đấu hàng đầu của bóng đá Đức. Bundesliga được thành lập vào năm 1963, thay thế cho giải Oberliga, và là giải đấu bóng đá hàng đầu của Đức. Giải đấu này được tổ chức bởi Hiệp hội bóng đá Đức (DFL).",
	},
	{
		key: 1134,
		rankId: 4378,
		label: "Spanish La Liga",
		logo: "la-liga.png",
		nameVi: "tây ban nha",
		type: "1",
		description:
			"La Liga là giải bóng đá hàng đầu của Tây Ban Nha. Giải đấu này được tổ chức bởi Hiệp hội bóng đá Tây Ban Nha (LFP). Giải bóng đá vô địch quốc gia Tây Ban Nha được thành lập năm 1929, và là giải đấu bóng đá hàng đầu của Tây Ban Nha. La Liga là giải đấu bóng đá có số lượng người hâm mộ đông đảo nhất trên thế giới.",
	},
	{
		key: 1437,
		rankId: 4399,
		label: "Italian Serie A",
		logo: "serie-a.png",
		nameVi: "ý",
		type: "1",
		description:
			"Giải bóng đá vô địch quốc gia Ý, hay còn được biết đến với cái tên Serie A, là giải đấu hàng đầu của bóng đá Ý. Serie A được thành lập vào năm 1929, và là giải đấu bóng đá hàng đầu của Ý. Giải đấu này được tổ chức bởi Hiệp hội bóng đá Ý (FIGC).",
	},
	{
		key: 1112,
		rankId: 4347,
		label: "France Ligue 1",
		logo: "ligue-1.png",
		nameVi: "pháp",
		type: "1",
		description:
			"Giải bóng đá vô địch quốc gia Pháp, hay còn được biết đến với cái tên Ligue 1, là giải đấu hàng đầu của bóng đá Pháp. Ligue 1 được thành lập vào năm 1932, và là giải đấu bóng đá hàng đầu của Pháp. Giải đấu này được tổ chức bởi Hiệp hội bóng đá Pháp (LFP).",
	},
	{
		key: 16679,
		rankId: 4976,
		label: "V.League 1",
		logo: "V.League_1.png",
		nameVi: "việt nam",
		type: "1",
		description:
			"V-League là giải bóng đá chuyên nghiệp hàng đầu Việt Nam. Giải đấu này được tổ chức bởi Liên đoàn bóng đá Việt Nam (VFF). V-League được thành lập vào năm 1980, và là giải đấu bóng đá hàng đầu của Việt Nam.",
	},
	{
		key: 13014,
		rankId: 4314,
		label: "UEFA Champions League",
		logo: "champions_league.png",
		nameVi: "champions league",
		type: "2",
		description:
			"UEFA Champions League là giải đấu bóng đá hàng đầu châu Âu. Giải đấu này được tổ chức bởi Liên đoàn bóng đá châu Âu (UEFA). UEFA Champions League được thành lập vào năm 1955, và là giải đấu bóng đá hàng đầu của châu Âu.",
	},
	{
		key: 13115,
		rankId: 4584,
		label: "UEFA Europa League",
		logo: "uefa-europa-league.png",
		nameVi: "europa league",
		type: "2",
		description:
			"UEFA Europa League là giải đấu bóng đá hàng đầu châu Âu. Giải đấu này được tổ chức bởi Liên đoàn bóng đá châu Âu (UEFA). UEFA Europa League được thành lập vào năm 1971, và là giải đấu bóng đá hàng đầu của châu Âu.",
	},
];
export {
	getNextDays,
	getPreviousDays,
	createSearchParams,
	filterParams,
	generateStatus,
	convertStringOddToArray,
	convertToOdd,
	generateData,
	generateValueBet,
	leagues,
};
