// ** React Imports
import {useAuthStore} from "@/stores/useAuthStore";
import {ReactNode, ReactElement} from "react";

// ** Hooks Import

interface PublicGuardProps {
	children: ReactNode;
	fallback: ReactElement | null;
}

const PublicGuard = (props: PublicGuardProps) => {
	const {children, fallback} = props;
	const {isAuthenticated} = useAuthStore();

	if (!isAuthenticated) {
		return fallback;
	}

	return <>{children}</>;
};

export default PublicGuard;
