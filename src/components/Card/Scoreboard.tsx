const Scoreboard = ({
	homeScore,
	awayScore,
}: {
	homeScore: number | null;
	awayScore: number | null;
}) => (
	<div className="col-span-2 flex items-center justify-center flex-col">
		<div className="font-medium text-sm text-nowrap text-center">Cược chấp</div>

		<div className="flex items-center gap-2 font-semibold text-black">
			<span>{homeScore}</span>
			<span>:</span>
			<span>{awayScore}</span>
		</div>
	</div>
);

export default Scoreboard;
