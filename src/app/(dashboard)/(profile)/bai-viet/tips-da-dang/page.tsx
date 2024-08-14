'use client'

import CardTip from "@/components/card-tip";
import { Button, Chip } from "@nextui-org/react";
import { FaCheck } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import { useEffect } from "react";
import { useTipStore } from "@/stores/useTipStore";
import moment from "moment";

function TipsList() {
	const { pageIndex, pageSize, tips, isLoadMore, isLoading, getPaging } = useTipStore();

	useEffect(() => {
		getPaging({ pageIndex: 1, pageSize });
	}, []);

	const handLoadMore = async () => {
		getPaging({ pageIndex, pageSize });
	};

	const renderBet = (option: any): string => {
		if (!option) return "NULL"

		switch(option.type) {
			case "handicap":
				return "HDP"

			case "overUnder":
				return "T/X"

			case "europeOdds":
				return "1X2"

			default: 
				return "Invalid Options";
		}
	}

	return (
		<div className="flex flex-col gap-5 pb-5 py-3 w-full divide-y-1 divide-slate-400/30">
			{(!isLoading && !!tips?.length) &&
				tips?.map((data, index) => (
					<div
						key={index}
						className="pt-4 flex items-center justify-between px-3"
					>
						<div>
							<CardTip
								tip={{
									leagueLogo: data?.league?.logo,
									season: data?.league?.currentSeason,
									homeName: data?.match?.homeName,
									awayName: data?.match?.awayName,
									leagueName: data?.league?.name,
									date: moment(data?.match?.date).format(
										"DD-MM-YYYY"
									),
									time: moment
										.unix(data?.match?.matchTime)
										.format("HH:mm"),
								}}
							/>

							<div className="grid grid-cols-12 items-center gap-3 text-sm">
								<Chip color="success" radius="lg" className="col-span-2">
									<span className="text-light tracking-wider">{renderBet(data)}</span>
								</Chip>

								<div className="col-span-10">
									<span>{data?.match?.homeName}</span>
									<span className="text-primary">
										{data?.match?.homeScore}
									</span>
									<span>-</span>
									<span className="text-primary">
										{data?.match?.awayScore}
									</span>
									<span>{data?.match?.awayName}</span>
								</div>

							</div>
						</div>
						{index !== 3 ? (
							<Chip
								variant="flat"
								color="success"
								startContent={<FaCheck size={24} />}
								className="text-[#4CAF50] font-semibold gap-1 bg-[#ECFDF3]"
								size="lg"
							>
								Thắng
							</Chip>
						) : (
							<Chip
								startContent={<CgClose size={24} />}
								color="danger"
								variant="flat"
								className="font-semibold gap-1 bg-[#FEF3F2] text-[#B42318]"
								size="lg"
							>
								Thua
							</Chip>
						)}
					</div>
				))}

			{!isLoading && !tips?.length && <div>Không có bài viết nào!</div>}

			{isLoadMore && (
				<div className="w-full flex justify-center">
					<Button
						variant="solid"
						radius="sm"
						className={`text-light max-w-max mt-6 text-base font-medium bg-primary max-md:text-sm`}
						isDisabled={isLoading}
						isLoading={isLoading}
						onPress={handLoadMore}
					>
						Xem thêm
					</Button>
				</div>
			)}
		</div>
	);
}

export default TipsList;
