import {generateData} from "@/utils";

const BoardBettingTwoCol = ({title = "", data, type}) => {
	return (
		<div className="p-4 rounded-xl bg-light max-md:px-2 w-full">
			<div className="pb-4">{title}</div>
			<div className="flex items-center text-sm pb-4 w-full">
				<div className="w-[40%]">{data?.match?.homeName}</div>
				<div className="w-[20%] flex items-center justify-center">VS</div>
				<div className="w-[40%] flex items-center justify-end">
					{data?.match?.awayName}
				</div>
			</div>
			<div className="flex w-full flex-col gap-2">
				<BoardBettingItemTwoCol data={data} type={type} />
			</div>
		</div>
	);
};
const BoardBettingItemTwoCol = ({data, type}) => {
	return (
		<div className="grid grid-cols-12 gap-5">
			<div className="col-span-6 py-2 bg-cell rounded-md flex items-center justify-between text-xl max-md:text-xs max-md:px-2 px-9">
				<span className="text-primary font-medium max-md:text-xs max-md:text-right">
					{type === "overUnder" && `Tài `}{" "}
					{generateData({type, pos: "home", item: data})?.head}
				</span>
				<span>{generateData({type, pos: "home", item: data})?.bot}</span>
			</div>
			<div className=" col-span-6 py-2 bg-cell rounded-md flex items-center justify-between text-xl max-md:text-xs max-md:px-2 px-9">
				<span className="text-primary font-medium max-md:text-xs max-md:text-right">
					{type === "overUnder" && `Xỉu `}{" "}
					{generateData({type, pos: "away", item: data})?.head}
				</span>
				<span> {generateData({type, pos: "away", item: data})?.bot}</span>
			</div>
		</div>
	);
};
export default BoardBettingTwoCol;
