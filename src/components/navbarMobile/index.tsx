"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import routes from "@/configs/routes";
import {RiHome6Fill} from "react-icons/ri";
import {IoMdFootball} from "react-icons/io";
import {IoSettingsSharp} from "react-icons/io5";

function NavbarMobile() {
	const pathname = usePathname();

	const textActiveRoute = (href: string) => {
		return href === pathname
			? "text-primary font-bold"
			: href === routes.livestream
			? "text-danger relative"
			: "font-medium text-black";
	};

	const animationPingForLivestream = (href: string) => (href !== pathname && href === routes.livestream) && "after:animate-ping after:absolute after:block after:top-0 after:bottom-0 after:left-0 after:right-0 after:rounded-full after:bg-danger/50 after:opacity-75"

	const navbarMobile = [
		{
			title: "Trang chủ",
			icon: <RiHome6Fill />,
			href: routes.dashboard,
		},
		{
			title: "Livestream",
			icon: <IoMdFootball />,
			href: routes.livestream,
		},
		{
			title: "Kết quả",
			icon: <IoSettingsSharp />,
			href: routes.result,
		},
	];

	return (
		<div className="hidden z-50 max-md:flex fixed left-0 right-0 bottom-0 bg-light flex-row justify-between px-2 py-4 shadow-[rgba(0,_0,_0,_0.1)_0px_0px_5px_0px,_rgba(0,_0,_0,_0.1)_0px_0px_1px_0px]">
			{navbarMobile?.map((item, index) => (
				<Link
					key={index}
					className={`flex px-2  gap-1 items-center justify-start select-none cursor-pointer rounded-2xl`}
					href={item?.href}
				>
					<span className={`text-2xl min-w-6 relative ${textActiveRoute(item?.href)} ${animationPingForLivestream(item?.href)}`}>
						{item?.icon}
					</span>
					<h4 className={`text-sm ${textActiveRoute(item?.href)}`}>
						{item?.title}
					</h4>
				</Link>
			))}
		</div>
	);
}

export default NavbarMobile;
