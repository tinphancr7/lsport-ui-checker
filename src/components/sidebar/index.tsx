"use client";

import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {SidebarItem, SidebarTypes} from "@/interfaces/sidebarItem";
import {sidebarItems} from "@/configs/sidebarItems";
import {SiteItem} from "@/interfaces/siteItem";
import routes from "@/configs/routes";
import Image from "next/image";
import { useAuthStore } from "@/stores/useAuthStore";

function Sidebar() {
	const pathname = usePathname();
	const router = useRouter();
	const { isAuthenticated } = useAuthStore();

	const bgActiveRoute = (href: string) => {
		return href === pathname
			? "bg-primary hover:bg-primary-hover"
			: "bg-transparent hover:bg-slate-100";
	};

	const textActiveRoute = (href: string) => {
		return href === pathname ? "text-light font-bold" : "font-medium";
	};

	const createSidebarItem = (category: SidebarItem, index: number) => {
		if (category.type === SidebarTypes.LINK) {
			return (
				<div key={index} className="flex flex-col gap-1 px-2 py-4">
					{category?.child?.map((item: SiteItem, index: number) => {
						if(!isAuthenticated && item?.private) return;
						
						return (
							// Create Link sidebar
							<Link
								key={index}
								className={`flex py-2 px-4 gap-3 items-center justify-start select-none cursor-pointer rounded-2xl ${bgActiveRoute(
									item?.href
								)}`}
								href={item?.href}
							>
								<span
									className={`text-2xl min-w-6 ${textActiveRoute(item?.href)}`}
								>
									{item?.icon}
								</span>
								<h4 className={`text-base ${textActiveRoute(item?.href)}`}>
									{item?.title}
								</h4>
							</Link>
						)
					})}
				</div>
			);
		}

		return (
			<div key={index} className="px-4 py-2">
				<h3 className="font-semibold">{category?.title}</h3>

				{category.desc}
			</div>
		);
	};

	return (
		<div className="max-md:hidden col-span-2 h-full max-h-screen sticky top-0 overflow-hidden shadow-container bg-light">
			{/* Logo Okvip */}
			<div className="flex items-center justify-center pt-5 pb-2 cursor-pointer">
				<div className="w-[160px] h-[78px] relative">
					<Image
						alt="okvip-logo"
						src={"/LOGO-OKVIP-FINAL.png"}
						className=""
						fill
						onClick={() => router.push(routes.dashboard)}
					/>
				</div>
			</div>

			{/* Sidebar List */}
			<div className="divide-y-1 !divide-slate-400/40 overflow-y-auto">
				{sidebarItems?.map((category: SidebarItem, index: number) =>
					createSidebarItem(category, index)
				)}
			</div>
		</div>
	);
}

export default Sidebar;
