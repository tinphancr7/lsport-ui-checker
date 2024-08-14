"use client";
import CardMatch from "@/components/Card/CardMatch";
import React, {memo, useEffect} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import SkeletonCardMatch from "@/components/Card/SkeletonCardMatch";
import {useMatchesHotFollowStatusStore} from "@/stores/useMatchesHotFollowStatusStore";

const ListCardMatch = () => {
	const {data, isLoading, fetchData} = useMatchesHotFollowStatusStore();

	useEffect(() => {
		fetchData({
			statuses: "-1,0,1,2,3,4,5",
		});
	}, [fetchData]);

	return (
		<div>
			{isLoading ? (
				<>
					<div className="grid grid-cols-12 gap-5 max-md:hidden">
						{Array.from({length: 3}, (_) => _).map((_, index) => (
							<div key={index} className="col-span-4">
								<SkeletonCardMatch />
							</div>
						))}
					</div>
					<div className="w-full block md:hidden">
						<SkeletonCardMatch />
					</div>
				</>
			) : (
				<Swiper
					spaceBetween={20}
					autoplay={{
						delay: 2000,
						disableOnInteraction: false,
					}}
					breakpoints={{
						640: {
							slidesPerView: 1,
						},
						// when window width is >= 768px
						768: {
							slidesPerView: 2,
						},
						// when window width is >= 1024px
						1024: {
							slidesPerView: 3,
						},
					}}
					className="mySwiper"
				>
					{data?.map((item, index) => (
						<SwiperSlide key={index}>
							<CardMatch item={item} />
						</SwiperSlide>
					))}
				</Swiper>
			)}
		</div>
	);
};

export default ListCardMatch;
