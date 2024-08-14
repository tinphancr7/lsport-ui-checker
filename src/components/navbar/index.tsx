"use client";

import {useCallback, useEffect, useMemo} from "react";
import {usePathname, useRouter} from "next/navigation";
import {SidebarItem} from "@/interfaces/sidebarItem";
import {sidebarItems} from "@/configs/sidebarItems";
import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	User,
	Button,
	Image,
	Avatar,
} from "@nextui-org/react";
import {SiteItem} from "@/interfaces/siteItem";
import routes from "@/configs/routes";
import {useAuthStore} from "@/stores/useAuthStore";
import {TfiLayoutListLargeImage} from "react-icons/tfi";
import {useModalStore} from "@/stores/useModalStore";
import NotifyMessage from "@/utils/notify";
import {getRefreshTokenFromLS, LocalStorageEventTarget} from "@/utils/auth";
import {URL_IMAGE} from "@/configs/minio";
import {signOut} from "@/apis/auth.api";

function Navbar() {
	const router = useRouter();
	const pathname = usePathname();
	const {isAuthenticated, user, logout} = useAuthStore();
	const {setModal, resetModal} = useModalStore();

	const getRoutes: any = sidebarItems
		.filter((item: SidebarItem) => item.child)
		.map((item: SidebarItem) => item.child)
		.flat();

	const labelPage = useMemo(() => {
		const page = getRoutes?.find((item: SiteItem) => item?.href === pathname);

		return page?.title;
	}, [pathname, getRoutes]);

	const handleNavigateModal = useCallback(
		(route: string) => {
			if (route === "logout") {
				logout();
				router.push(routes.login);
				NotifyMessage("Bạn đã đăng xuất!", "warning");
			} else {
				router.push(route);
			}
			resetModal();
		},
		[logout, resetModal, router]
	);

	const handleLogout = async () => {
		try {
			const data = await signOut(getRefreshTokenFromLS());
			if (data?.data?.status === 1) {
				logout();

				NotifyMessage("Đăng xuất thành công", "success");
			}
		} catch (error) {
			NotifyMessage("Đăng xuất thất bại", "error");
		}
	};

	const renderBodyModal = useMemo(() => {
		const isAuthenticatedList = [
			{
				label: "Thông tin cá nhân",
				color: "primary",
				href: routes.profile,
			},
			{
				label: "Tips bóng đá",
				color: "primary",
				href: routes.tips,
			},
			{
				label: "Mục yêu thích",
				color: "primary",
				href: routes.favourites,
			},
			{
				label: "Đăng xuất",
				color: "danger",
				href: "logout",
			},
		];

		return (
			<>
				{isAuthenticated ? (
					<div className="mt-2 flex flex-col gap-3 px-2 py-4">
						<div className="flex items-center justify-center mt-2">
							<Avatar
								src={`${URL_IMAGE}/${user?.avatar}`}
								isBordered
								showFallback
								className="w-12 h-12"
							/>
						</div>

						{isAuthenticatedList?.map((it, index: number) => (
							<Button
								key={index}
								fullWidth
								radius="sm"
								variant="bordered"
								color={it?.color}
								className="border font-semibold tracking-wide max-md:text-sm max-md:px-2 max-md:h-8"
								onPress={() => handleNavigateModal(it?.href)}
							>
								{it?.label}
							</Button>
						))}
					</div>
				) : (
					<div className="mt-6 flex flex-col gap-3 px-2 py-4">
						<Button
							fullWidth
							radius="sm"
							variant="bordered"
							color="primary"
							className="border font-semibold tracking-wide max-md:text-sm max-md:px-2 max-md:h-8"
							onPress={() => handleNavigateModal(routes.login)}
						>
							Đăng nhập
						</Button>

						<Button
							fullWidth
							radius="sm"
							variant="bordered"
							color="primary"
							className="border min-h-max font-semibold tracking-wide text-dark max-md:text-sm max-md:px-2 max-md:h-8"
							onPress={() => handleNavigateModal(routes.register)}
						>
							Đăng ký
						</Button>
					</div>
				)}
			</>
		);
	}, [handleNavigateModal, isAuthenticated, user?.avatar]);

	const handleOpenModal = useCallback(() => {
		setModal({
			isOpen: true,
			title: "",
			isDismissable: true,
			hideCloseButton: false,
			backdrop: "transparent",
			classNames: {
				wrapper: "w-full overflow-hidden !justify-end items-start",
				base: `max-h-modal-mobile !shadow-card-project max-w-[50%] h-full !my-0 !mr-0 rounded-none border-l-1 border-default-300`,
				header: "justify-end border-b-1 border-default-200",
				body: "overflow-y-auto rounded-tr-none !rounded-none p-0",
				closeButton: "right-2 z-10 text-lg",
			},
			body: renderBodyModal,
			motionProps: {
				initial: {x: "100%"},
				animate: {x: "0%"},
				exit: {x: "100%"},
				transition: {duration: 0.3},
			},
		});
	}, [renderBodyModal, setModal]);

	useEffect(() => {
		if (isAuthenticated) {
			LocalStorageEventTarget.addEventListener("clearLS", logout);
		}

		return () => {
			LocalStorageEventTarget.removeEventListener("clearLS", logout);
		};
	}, [isAuthenticated, logout]);

	return (
		<div className="shadow-container z-50 sticky top-0 bg-light flex items-center justify-between py-3 px-10 max-md:py-0 max-md:px-2 max-md:grid max-md:grid-cols-12">
			{/* Logo Okvip */}
			<div className="max-md:flex md:hidden items-center max-md:col-span-4">
				<Image
					alt="okvip-logo"
					src={"/LOGO-OKVIP-FINAL.png"}
					className="max-md:max-w-24 md:max-w-40 h-auto w-auto"
					removeWrapper
					onClick={() => router.push(routes.dashboard)}
				/>
			</div>

			<h2 className="font-semibold text-2xl max-md:text-base max-md:col-span-5 max-md:text-center">
				{labelPage}
			</h2>

			{!isAuthenticated ? (
				<div className="flex gap-3 max-md:hidden">
					<Button
						radius="sm"
						variant="solid"
						color="primary"
						className="max-w-max font-semibold tracking-wide max-md:text-sm max-md:px-2 max-md:h-8"
						onPress={() => router.push(routes.login)}
					>
						Đăng nhập
					</Button>

					<Button
						radius="sm"
						variant="bordered"
						color="primary"
						className="min-h-max max-w-max font-semibold tracking-wide text-dark max-md:text-sm max-md:px-2 max-md:h-8"
						onPress={() => router.push(routes.register)}
					>
						Đăng ký
					</Button>
				</div>
			) : (
				<div className="max-md:hidden">
					<Dropdown
						placement="bottom-start"
						classNames={{
							trigger: "cursor-pointer",
							content: "rounded-md",
						}}
					>
						<DropdownTrigger>
							<div className="flex items-center gap-1">
								<div className="flex flex-row justify-center items-center gap-2">
									<div className="w-14 h-14 flex flex-row justify-center items-center relative">
										<Avatar
											src={`${URL_IMAGE}/${user?.avatar}`}
											isBordered
											showFallback
											className="w-10 h-10"
										/>
									</div>

									<p className="text-base text-dark font-bold uppercase">
										{user?.name || user?.username}
									</p>
								</div>
							</div>
						</DropdownTrigger>
						<DropdownMenu
							aria-label="User Actions"
							variant="flat"
							color="primary"
							classNames={{
								base: "max-md:hidden",
							}}
						>
							<DropdownItem
								key="profile"
								className="h-10 gap-2"
								showDivider
								onClick={() => handleNavigateModal(routes.profile)}
							>
								<h3 className="text-base font-medium">Trang cá nhân</h3>
							</DropdownItem>

							<DropdownItem key="settings" onClick={handleLogout}>
								<h2 className="text-base font-medium">Đăng xuất</h2>
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</div>
			)}

			{/* Mobile */}
			<div className="md:hidden max-md:col-span-3">
				<Button
					variant="solid"
					color="primary"
					className="float-right min-w-max w-max min-h-max h-6 font-semibold tracking-wide px-2 py-0 rounded-md"
					onPress={handleOpenModal}
				>
					<TfiLayoutListLargeImage className="text-xl" />
				</Button>
			</div>
		</div>
	);
}

export default Navbar;
