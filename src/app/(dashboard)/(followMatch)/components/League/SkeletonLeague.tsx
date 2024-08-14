import {Skeleton} from "@nextui-org/react";

function SkeletonLeague() {
	return (
		<div className="bg-light rounded-lg px-10 py-4 w-full">
			<div className="flex items-center justify-between mb-2.5">
				<Skeleton className="h-3 w-3/12 rounded-lg" />
				<Skeleton className="w-[44px] h-8 rounded-lg" />
			</div>

			<div className="flex flex-col gap-4">
				{new Array(3).fill(0).map((_, index) => (
					<div key={index} className="flex justify-between gap-2">
						<div className="flex items-center gap-2">
							<Skeleton className="h-6 w-6 rounded-full" />
							<Skeleton className="h-3 w-48 rounded-lg" />
						</div>
						<Skeleton className="w-5 h-5 rounded-lg" />
					</div>
				))}
			</div>
		</div>
	);
}

export default SkeletonLeague;
