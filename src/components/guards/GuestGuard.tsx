// ** React Imports
import {ReactNode, ReactElement, useEffect} from "react";

// ** Next Import
import {usePathname, useRouter} from "next/navigation";

// ** Hooks Import

import {useAuthStore} from "@/stores/useAuthStore";

interface GuestGuardProps {
	children: ReactNode;
	fallback: ReactElement | null;
}

const GuestGuard = (props: GuestGuardProps) => {
	const {children, fallback} = props;
	const {isAuthenticated, isLoading} = useAuthStore();
	const router = useRouter();
	const pathname = usePathname();
	useEffect(() => {
		if (!router) {
			return;
		}

		if (isAuthenticated) {
			router.replace("/");
			router.refresh();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	// if (isAuthenticated) {
	// 	return fallback;
	// }
	// if (isLoading || (!isLoading && isAuthenticated)) {
	// 	return fallback;
	// }

	return <>{children}</>;
};

export default GuestGuard;
