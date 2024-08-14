import Link from "next/link";
import Cell from "../Cell/Cell";
import slugify from "slugify";

const GameRow = ({item}: any) => (
	<>
		{/* PC */}
		<div className="max-md:hidden grid grid-cols-12 gap-2 text-black">
			<div className="col-span-4 flex items-center gap-5">
				<span className="text-primary text-xl font-semibold">
					{item?.homeScore}
				</span>
				<Link
					className="text-black"
					href={`match/${slugify(`${item?.homeName} vs ${item?.awayName}`, {
						lower: true,
						replacement: "-",
						locale: "vi",
						trim: true,
					})}/${item?.matchId}`}
				>
					{item?.homeName}
				</Link>
			</div>
			<div className="col-span-8 grid grid-cols-6 gap-2">
				{[
					"handicap",
					"overUnder",
					"europe",
					"handicapHalf",
					"overUnderHalf",
					"",
				].map((it, index) => (
					<div className="col-span-1" key={index}>
						<Cell item={item} type={it} lock={index === 5} pos="home" />
					</div>
				))}
			</div>
		</div>

		{/* Mobile */}
		<div className="max-md:grid hidden grid-cols-12 gap-2">
			<div className="col-span-4 flex items-center gap-5">
				<span className="text-primary text-xl font-semibold max-md:text-xs">
					{item?.homeScore}
				</span>

				<Link
					className="max-md:text-xs"
					href={`match/${slugify(`${item?.homeName} vs ${item?.awayName}`, {
						lower: true,
						replacement: "-",
						locale: "vi",
						trim: true,
					})}/${item?.matchId}`}
				>
					{item?.homeName}
				</Link>
			</div>

			<div className="col-span-8 grid grid-cols-6 gap-2">
				{/* {data?.slice(0, 3).map((item: any, index: number) => (
					<div key={index} className="col-span-2">
						<Cell data={item} lock={index == 3 || index == 5} />
					</div>
				))} */}
			</div>
		</div>
	</>
);
export default GameRow;
