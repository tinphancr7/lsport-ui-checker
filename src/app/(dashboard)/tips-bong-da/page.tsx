import Image from "next/image";
import { TipsBongDa } from "../../../../public/imgs/tips-bong-da";
import TableTips from "@/components/tips-bong-da/TableTips";

function Tips() {
	return (
		<>
			<div className="w-full">
				<Image
					src={TipsBongDa}
					alt="tips-bong-da"
					width={TipsBongDa.width}
					height={TipsBongDa.height}
					className="bg-cover w-full"
				/>
			</div>
			<div className="mt-4 mb-10 bg-light rounded-lg shadow-md overflow-hidden">
				<div className="p-5 border-b border-b-[#EAECF0]">
					<h1 className="text-lg font-semibold">Tips bóng đá</h1>
					<p className="text-sm">
						Chuyên gia bóng đá OKVIP cung cấp thông tin chuyên sâu
						để giúp bạn chọn cược của mình.
					</p>
				</div>

				<TableTips />
			</div>
		</>
	);
}

export default Tips;
