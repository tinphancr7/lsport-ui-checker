import React, {ReactNode, Suspense} from "react";
import GuestGuard from "./GuestGuard";

import AuthGuard from "./AuthGuard";
import {AUTH_ROUTES, PUBLIC_ROUTES} from "../../utils/routes";
import PublicGuard from "./PublicGuard";
import Loading from "../Loading/Loading";

type GuardProps = {
	authGuard: boolean;
	guestGuard: boolean;
	children: ReactNode;
};

export const getProperPublicGuardType = (path: string) =>
	PUBLIC_ROUTES.includes(path) ? true : false;

export const getProperAuthGuardType = (path: string) => {
	if (path.startsWith("/p/")) return true;
	return AUTH_ROUTES.includes(path) ? true : false;
};

const GuardProvider = ({children, authGuard, guestGuard}: GuardProps) => {
	if (guestGuard) {
		return <GuestGuard fallback={<Loading />}>{children}</GuestGuard>;
	} else if (!guestGuard && !authGuard) {
		return <>{children}</>;
	} else {
		return (
			<Suspense fallback={<Loading />}>
				<AuthGuard fallback={<Loading />}>{children}</AuthGuard>
			</Suspense>
		);
	}
};

export default GuardProvider;
