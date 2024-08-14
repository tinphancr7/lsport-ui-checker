"use client";
import GuardProvider, {
	getProperAuthGuardType,
	getProperPublicGuardType,
} from "@/components/guards/GuardProvider";
import Modal from "@/components/modal";
import {useAuthStore} from "@/stores/useAuthStore";
import {NextUIProvider} from "@nextui-org/react";
import {usePathname, useRouter} from "next/navigation";
import {useEffect} from "react";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Provider({children}: {children: React.ReactNode}) {
	const pathName = usePathname();
	const router = useRouter();
	const {setIsLoading} = useAuthStore();
	const authGuard = getProperAuthGuardType(pathName);

	const guestGuard = getProperPublicGuardType(pathName);

	return (
		<NextUIProvider>
			<ToastContainer
				theme="colored"
				autoClose={3000}
				pauseOnHover={false}
				style={{minWidth: "max-content"}}
			/>
			<Modal />
			<GuardProvider authGuard={authGuard} guestGuard={guestGuard}>
				{children}
			</GuardProvider>
		</NextUIProvider>
	);
}

export default Provider;
