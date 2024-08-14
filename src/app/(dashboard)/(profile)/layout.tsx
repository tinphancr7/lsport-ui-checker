"use client"

import SidebarProfile from "@/components/thong-tin-ca-nhan/SidebarProfile";
import { ReactNode } from "react";
import NavbarProfile from "./thong-tin-ca-nhan/components/NavbarProfile";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import routes from "@/configs/routes";

interface Props {
	children: ReactNode;
}

const ProfileLayout = ({ children }: Props) => {
	const router = useRouter();
	const { isAuthenticated } = useAuthStore();

	if (!isAuthenticated) {
		return router.push(routes.dashboard);
	}

	return (
		<>
			<NavbarProfile />

			<div className="grid grid-cols-12 lg:gap-x-10 py-3">
				<SidebarProfile />
				<div className="col-span-9 max-md:col-span-12 mb-10">{children}</div>
			</div>
		</>
	);
};

export default ProfileLayout;


