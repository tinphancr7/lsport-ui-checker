import { Skeleton } from "@nextui-org/react";
import { CiYoutube } from "react-icons/ci";
import { GiGolfFlag } from "react-icons/gi";

function SkeletonBoard() {
	return (
		<div className="relative overflow-x-auto bg-white rounded-lg p-4 flex flex-col gap-4 w-full max-md:p-2 max-md:gap-2">
			{/* Begin: Header Row */}
			<div className="text-sm w-full grid grid-cols-12 items-center gap-2 text-center">
				<div className="col-span-4 font-semibold text-left text-base text-wrap line-clamp-2 max-md:text-sm max-md:text-center">
					<Skeleton className="h-3 w-1/2 rounded-lg" />
				</div>
				<div className="col-span-8 grid grid-cols-6 gap-2 items-center">
					<div className="max-md:hidden">
						<Skeleton className="h-3 w-full rounded-lg" />
					</div>
					<div className="max-md:hidden">
						<Skeleton className="h-3 w-full rounded-lg" />
					</div>
					<div className="max-md:hidden">
						<Skeleton className="h-3 w-full rounded-lg" />
					</div>
					<div className="max-md:col-span-2">
						<Skeleton className="h-3 w-full rounded-lg" />
					</div>
					<div className="max-md:col-span-2">
						<Skeleton className="h-3 w-full rounded-lg" />
					</div>
					<div className="max-md:col-span-2">
						<Skeleton className="h-3 w-full rounded-lg" />
					</div>
				</div>
			</div>
			{/* End: Header Row */}

			{/* Begin: BookMark */}
			<div className="flex justify-between gap-6">
				<div className="flex items-center gap-5">
					<Skeleton className="h-5 w-5 rounded-lg" />
					<Skeleton className="h-5 w-40 rounded-lg" />
				</div>

				<div className="flex items-center justify-center gap-1 text-center">
					<span className="bg-[#7EB000] text-white rounded w-[22px] h-5 inline-block max-md:hidden">
						N
					</span>

					<CiYoutube size={30} className="text-gray max-md:hidden" />

					<span className="bg-primary text-white rounded flex items-center max-h-5 px-3 text-center">
						2
					</span>
				</div>
			</div>
			{/* End: BookMark */}

			{/* Begin: Game Row 1 */}
			<div className="flex flex-col gap-2">
				<div className="max-md:hidden grid grid-cols-12 gap-2 text-black items-center">
					<div className="col-span-4 flex items-center gap-5">
                        <Skeleton className="h-5 w-5 rounded-lg" />
						<Skeleton className="h-5 w-1/2 rounded-lg" />
					</div>
					<div className="col-span-8 grid grid-cols-6 gap-2">
                        <Skeleton className="col-span-1 h-14 w-full rounded-md" />
                        <Skeleton className="col-span-1 h-14 w-full rounded-md" />
                        <Skeleton className="col-span-1 h-14 w-full rounded-md" />
                        <Skeleton className="col-span-1 h-14 w-full rounded-md" />
                        <Skeleton className="col-span-1 h-14 w-full rounded-md" />
                        <Skeleton className="col-span-1 h-14 w-full rounded-md" />
					</div>
				</div>

				{/* Mobile */}
				<div className="max-md:grid hidden grid-cols-12 gap-2">
					<div className="col-span-4 flex items-center gap-5">
                        <Skeleton className="h-5 w-5 rounded-lg" />
                        <Skeleton className="h-5 w-1/2 rounded-lg" />
					</div>

					<div className="col-span-8 grid grid-cols-6 gap-2">
                        <Skeleton className="col-span-2 h-14 w-full rounded-md" />
                        <Skeleton className="col-span-2 h-14 w-full rounded-md" />
                        <Skeleton className="col-span-2 h-14 w-full rounded-md" />
					</div>
				</div>
			</div>
			{/* End: Game Row 1 */}

            {/* Begin: Game Row 2 */}
			<div className="flex flex-col gap-2">
				<div className="max-md:hidden grid grid-cols-12 gap-2 text-black">
					<div className="col-span-4 flex items-center gap-5">
                        <Skeleton className="h-3 w-5 rounded-lg" />
						<Skeleton className="h-3 w-1/2 rounded-lg" />
					</div>
					<div className="col-span-8 grid grid-cols-6 gap-2">
                        <Skeleton className="col-span-1 h-14 w-full rounded-md" />
                        <div className="col-span-1 bg-light"></div>
                        <Skeleton className="col-span-1 h-14 w-full rounded-md" />
                        <Skeleton className="col-span-1 h-14 w-full rounded-md" />
                        <div className="col-span-1 bg-light"></div>
                        <Skeleton className="col-span-1 h-14 w-full rounded-md" />
					</div>
				</div>

				{/* Mobile */}
				<div className="max-md:grid hidden grid-cols-12 gap-2">
					<div className="col-span-4 flex items-center gap-5">
                        <Skeleton className="h-5 w-5 rounded-lg" />
                        <Skeleton className="h-5 w-1/2 rounded-lg" />
					</div>

					<div className="col-span-8 grid grid-cols-6 gap-2">
                        <Skeleton className="col-span-2 h-14 w-full rounded-md" />
                        <div className="col-span-2 bg-light"></div>
                        <Skeleton className="col-span-2 h-14 w-full rounded-md" />
					</div>
				</div>
			</div>
			{/* End: Game Row 2 */}

            <div className="grid grid-cols-12 gap-2">
                <div className="col-span-4 text-gray9E flex items-center gap-6">
                    <div className="flex flex-row items-center gap-2 max-md:flex-col max-md:gap-1">
                        <span className="border inline-flex rounded-full text-[10px] flex-shrink-0 p-0.5">
                            H-T
                        </span>
                        <div className="flex items-center text-gray9E">
                            <Skeleton className="h-5 w-5 rounded-lg" />
                            -{" "}
                            <Skeleton className="h-5 w-5 rounded-lg" />
                        </div>
                    </div>
                    <div className="flex flex-row items-center gap-2 max-md:flex-col max-md:gap-1 text-gray9E">
                        <span>
                            <GiGolfFlag size={20} />
                        </span>
                        <div className="flex items-center text-gray9E">
                            <Skeleton className="h-5 w-5 rounded-lg" />
                            -{" "}
                            <Skeleton className="h-5 w-5 rounded-lg" />
                        </div>
                    </div>
                </div>

                {/* PC */}
                <div className="max-md:hidden col-span-8 grid grid-cols-6 gap-2">
                    <div className="col-span-1"></div>
                    <div className="col-span-1"></div>
                    <Skeleton className="col-span-1 h-14 w-full rounded-md" />
                    <div className="col-span-1"></div>
                    <div className="col-span-1"></div>
                    <div className="col-span-1"></div>
                </div>

                {/* Mobile */}
                <div className="max-md:grid hidden col-span-8 grid-cols-6 gap-2">
                    <div className="col-span-2"></div>
                    <div className="col-span-2"></div>
                    <Skeleton className="col-span-2 h-14 w-full rounded-md" />
                </div>
            </div>
		</div>
	);
}

export default SkeletonBoard;
