import { Avatar, Button } from "@nextui-org/react";

function SubSidebar() {
	return (
		<div className="col-span-3 max-h-page overflow-auto">
			<div className="bg-light p-3 rounded-lg">
				<div className="flex flex-col items-center">
					<Avatar
						src="https://i.pravatar.cc/150?u=a04258114e29026708c"
						className="w-20 h-20 text-large"
					/>
					<p className="text-lg font-bold">Long Tứ ODD</p>
				</div>
				<div className="mt-4 flex items-center justify-between bg-[#F3F3F3] p-4 rounded-lg">
					<div className="basis-1/3 ">
						<p className="text-center text-primary font-semibold">
							10
						</p>
						<p className="text-center">Bài viết</p>
					</div>
					<div className="basis-1/3 ">
						<p className="text-center text-primary font-semibold">
							10
						</p>
						<p className="text-center">Thích</p>
					</div>
					<div className="basis-1/3 ">
						<p className="text-center text-primary font-semibold">
							10
						</p>
						<p className="text-center text-nowrap">
							Người theo dõi
						</p>
					</div>
				</div>
				<Button
					variant="bordered"
					className="mt-4 w-full border border-primary font-medium"
				>
					Theo dõi
				</Button>
				<div className="mt-4 flex items-center justify-between bg-[#F3F3F3] p-4 rounded-lg">
					<div className="basis-1/3 ">
						<p className="text-center text-primary font-semibold">
							70%
						</p>
						<p className="text-center">Tỷ lệ thắng</p>
					</div>
					<div className="basis-1/3 ">
						<p className="text-center text-primary font-semibold">
							+20%
						</p>
						<p className="text-center">ROI</p>
					</div>
					<div className="basis-1/3 ">
						<p className="text-center text-primary font-semibold">
							10
						</p>
						<p className="text-center">TIPS</p>
					</div>
				</div>
			</div>
			<div className="bg-light p-3 rounded-lg mt-4">
				<p className="text-lg font-bold">BXH Chuyên gia</p>

				{[1, 2, 3].map((item, index) => (
					<div
						className="mt-5 flex items-center justify-between"
						key={index}
					>
						<div className="flex items-center gap-x-2">
							<Avatar
								src="https://i.pravatar.cc/150?u=a04258114e29026302d"
								size="md"
							/>
							<span className="text-lg font-medium">
								Đại ca Bê
							</span>
						</div>
						<p className="text-lg text-primary font-bold">70%</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default SubSidebar;