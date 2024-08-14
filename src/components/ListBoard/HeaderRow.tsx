const HeaderRow = ({leagueName}: {leagueName: string}) => (
	<div className="text-sm w-full grid grid-cols-12 items-center gap-2 text-center">
		<div className="col-span-4 font-semibold text-left text-base text-wrap line-clamp-2 max-md:text-sm max-md:text-center">
			{leagueName}
		</div>
		<div className="col-span-8 grid grid-cols-6 gap-2 items-center">
			<div className="max-md:hidden">Toàn trận cược</div>
			<div className="max-md:hidden">Toàn trận tài/xỉu</div>
			<div className="max-md:hidden">Toàn trận 1X2</div>
			<div className="max-md:col-span-2">Cược chấp HT</div>
			<div className="max-md:col-span-2">Tài xỉu HT</div>
			<div className="max-md:col-span-2">1X2 HT</div>
		</div>
	</div>
);
export default HeaderRow;
