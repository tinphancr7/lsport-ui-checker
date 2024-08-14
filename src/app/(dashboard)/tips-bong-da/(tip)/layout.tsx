// import SubSidebar from "@/components/tips-bong-da/SubSidebar";

function TipLayout({ children }: { children: React.ReactNode }) {
	return (
        <div className="grid grid-cols-12 gap-x-5">
            <div className="col-span-12 max-h-page overflow-auto">{children}</div>

            {/* <SubSidebar /> */}
		</div>
	);
}

export default TipLayout;
