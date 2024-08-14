import Navbar from "@/components/navbar";
import NavbarMobile from "@/components/navbarMobile";
import Sidebar from "@/components/sidebar";

function DashboardLayout({children}: {children: React.ReactNode}) {
	return (
		<div className="h-screen w-full flex flex-col items-stretch bg-layout">
			<div className="h-full w-full grid grid-cols-12 gap-x-2">
				<Sidebar />
				<div className="max-md:col-span-12 md:col-span-10 max-h-screen chat overflow-y-auto">
					<Navbar />

					<div className="mt-2 mx-6 max-md:mx-1 max-md:pb-20">
						{children}
					</div>

					<NavbarMobile />
				</div>
			</div>
		</div>
	);
}

export default DashboardLayout;
