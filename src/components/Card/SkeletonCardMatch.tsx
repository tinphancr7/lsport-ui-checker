import {Skeleton} from "@nextui-org/react";

function SkeletonCardMatch() {
	return (
		<div className="bg-light rounded-xl py-3 px-4 flex flex-col gap-2 h-[190px] ">
			<div className="flex justify-between items-center">
				<Skeleton className="h-3 w-3/12 rounded-lg" />
				<Skeleton className="h-3 w-1/12 rounded-lg" />
			</div>

			<Skeleton className="h-5 w-full rounded-lg" />

			<div className="flex flex-col justify-between h-full">
				<div className="grid grid-cols-12">
					<div className="col-span-5 flex flex-col items-center gap-2">
						<Skeleton className="flex rounded-full w-10 h-10" />
						<Skeleton className="h-5 w-4/6 rounded-lg" />
					</div>
					<div className="col-span-2 flex items-center justify-center flex-col">
						<div className="font-medium text-sm text-nowrap text-center">
							Cược chấp
						</div>

						<div className="flex items-center gap-2 text-lg font-semibold text-black">
							<Skeleton className="h-5 w-5 rounded-lg" />
							<span>:</span>
							<Skeleton className="h-5 w-5 rounded-lg" />
						</div>
					</div>
					<div className="col-span-5 flex flex-col items-center gap-2">
						<Skeleton className="flex rounded-full w-10 h-10" />
						<Skeleton className="h-5 w-4/6 rounded-lg" />
					</div>
				</div>
				<div className="flex flex-row gap-5">
					<Skeleton className="h-5 w-full rounded-lg" />
					<Skeleton className="h-5 w-full rounded-lg" />
				</div>
			</div>
		</div>
	);
}

export default SkeletonCardMatch;
