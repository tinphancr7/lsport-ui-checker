// "use client";

// import {useAuthStore} from "@/stores/useAuthStore";
// import {useRouter} from "next/router";
// import {useEffect} from "react";
// import {ComponentType} from "react";

// export default function withAuth<T>(Component: ComponentType<T>) {
// 	return function AuthenticatedComponent(props: T) {
// 		const {isAuthenticated} = useAuthStore();
// 		const router = useRouter();

// 		useEffect(() => {
// 			if (!isAuthenticated) {
// 				router.push("/");
// 			}
// 		}, [isAuthenticated, router]);

// 		if (!isAuthenticated) {
// 			return null;
// 		}

// 		return <Component {...props} />;
// 	};
// }
