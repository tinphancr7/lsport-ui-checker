"use client";

import useLoadMore from "@/hooks/useLoadMore";
import {Accordion, AccordionItem, Button} from "@nextui-org/react";
import Image from "next/image";
import ButtonLoadMore from "@/components/Button/ButtonLoadMore";
import LeagueList from "./LeagueList";
import matchApi from "@/apis/match.api";

function LocationList({
	data,
	isLoadMore,
	search,
	startDate,
	endDate,
	statuses,
}: any) {
	const fetchData = async ({page}: any) => {
		return matchApi.getMatchesGrCountryLeague({
			search,
			page,
			statuses,
			startDate,
			endDate,
		});
	};
	const {items, loadMoreData, hasMoreData, isLoading} = useLoadMore({
		fetchData,
		isLoadMore,
		initialData: data,
	});

	return (
		<div className="mt-4">
			<Accordion variant="splitted">
				{items?.map((item: any, index: number) => (
					<AccordionItem
						key={String(index)}
						aria-label={String(index)}
						hideIndicator
						className="max-md:group-[.is-splitted]:px-2"
						title={
							<div className="flex items-center justify-between text-black text-lg font-medium capitalize">
								{item?.countryProfile?.country || ""}
								<Image
									src={item?.countryProfile?.countryLogo}
									width={44}
									height={32}
									alt="Châu Âu"
								/>
							</div>
						}
					>
						<LeagueList key={index} idex={index} item={item} />
					</AccordionItem>
				))}
			</Accordion>
			<ButtonLoadMore
				isLoading={isLoading}
				loadMoreData={loadMoreData}
				hasMoreData={hasMoreData}
			/>
		</div>
	);
}

export default LocationList;
