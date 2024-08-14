import routes from "./routes";
import {SidebarItem, SidebarTypes} from "@/interfaces/sidebarItem";
import Image from "next/image";
import Link from "next/link";

const sidebarItems: SidebarItem[] = [
	{
		type: SidebarTypes.LINK,
		child: [
			{
				title: "Trang chủ",
				icon: (
					<Image
						priority
						src="/icons/home.svg"
						height={24}
						width={24}
						alt="home"
					/>
				),
				href: routes.dashboard,
			},
			{
				title: "Mục yêu thích",
				icon: (
					<Image
						priority
						src="/icons/favourites.svg"
						height={24}
						width={24}
						alt="favourites"
					/>
				),
				href: routes.favourites,
				private: true,
			},
			// {
			// 	title: "Thông tin trận đấu",
			// 	icon: (
			// 		<Image
			// 			priority
			// 			src="/icons/info.svg"
			// 			height={24}
			// 			width={24}
			// 			alt="info"
			// 		/>
			// 	),
			// 	href: routes.matchInfo,
			// },
			{
				title: "Kết quả",
				icon: (
					<Image
						priority
						src="/icons/result.svg"
						height={24}
						width={24}
						alt="result"
					/>
				),
				href: routes.result,
			},
			// {
			// 	title: "Lịch sử",
			// 	icon: (
			// 		<Image
			// 			priority
			// 			src="/icons/history.svg"
			// 			height={24}
			// 			width={24}
			// 			alt="history"
			// 		/>
			// 	),
			// 	href: routes.history,
			// },
		],
	},
	{
		type: SidebarTypes.CATEGORY,
		title: "Tài trợ",
		// eslint-disable-next-line jsx-a11y/alt-text
		desc: (
			<Link href={"/"} className="w-full block h-[100px] relative">
				<Image
					alt="banner-sidebar"
					src="/imgs/banner-sidebar.png"
					className=" rounded-none"
					fill
				/>
			</Link>
			// <NextUIImage
			// 	alt="banner-sidebar"
			// 	src="/imgs/banner-sidebar.png"
			// 	classNames={{
			// 		img: "max-w-full w-full h-full rounded-none",
			// 	}}
			// />
		),
	},
	{
		type: SidebarTypes.LINK,
		child: [
			// {
			// 	title: "Khuyến mãi",
			// 	icon: (
			// 		<Image
			// 			priority
			// 			src="/icons/promotion.svg"
			// 			height={24}
			// 			width={24}
			// 			alt="promotion"
			// 		/>
			// 	),
			// 	href: routes.promotion,
			// },
			{
				title: "TIPS bóng đá",
				icon: (
					<Image
						priority
						src="/icons/tips.svg"
						height={24}
						width={24}
						alt="tips"
					/>
				),
				href: routes.tips,
			},
			{
				title: "Livestream",
				icon: (
					<div className="relative after:animate-ping after:absolute after:block after:top-0 after:bottom-0 after:left-0 after:right-0 after:rounded-full after:bg-danger/50 after:opacity-75">
						<Image
							priority
							src="/icons/livestream.svg"
							height={24}
							width={24}
							alt="tips"
						/>
					</div>
				),
				href: routes.livestream,
			},
			// {
			// 	title: "Tìm kiếm",
			// 	icon: (
			// 		<Image
			// 			priority
			// 			src="/icons/search.svg"
			// 			height={20}
			// 			width={20}
			// 			alt="search"
			// 		/>
			// 	),
			// 	href: routes.search,
			// },
		],
	},
];

export {sidebarItems};
