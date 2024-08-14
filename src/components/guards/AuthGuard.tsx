// ** React Imports
import {ReactNode, ReactElement, useEffect, useCallback} from "react";

// ** Next Import
import {usePathname, useRouter, useSearchParams} from "next/navigation";

// ** Hooks Import

import {useAuthStore} from "@/stores/useAuthStore";

interface AuthGuardProps {
	children: ReactNode;
	fallback: ReactElement | null;
}

const AuthGuard = (props: AuthGuardProps) => {
	const {children, fallback} = props;
	const {isAuthenticated} = useAuthStore();
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams);
			params.set(name, value);

			return params.toString();
		},
		[searchParams]
	);

	useEffect(
		() => {
			if (!router) {
				return;
			}

			if (!isAuthenticated) {
				if (pathname !== "/") {
					router.replace(
						"/dang-nhap/?" + createQueryString("returnUrl", pathname)
					);
					router.refresh();
				} else {
					router.replace("/dang-nhap");
					router.refresh();
				}
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[pathname]
	);

	if (!isAuthenticated) {
		return fallback;
	}

	return <>{children}</>;
};

export default AuthGuard;
