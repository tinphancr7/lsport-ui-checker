import FollowMatch from "@/components/followMatch";
import Chat from "./components/Chat/Chat";

function FollowMatchLayout({children}: {children: React.ReactNode}) {
	return (
		<div className="grid grid-cols-12 gap-6">
			<div className="col-span-9 max-h-page overflow-auto max-md:pb-20 max-md:col-span-12 home">
				{children}
			</div>
			<div className="max-md:hidden col-span-3 max-h-screen">
				<div className="flex flex-col justify-between gap-2">
					{/* <FollowMatch /> */}
					<Chat />
				</div>
			</div>
		</div>
	);
}

export default FollowMatchLayout;
