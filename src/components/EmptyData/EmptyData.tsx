import Image from "next/image";
import React from "react";

const EmptyData = () => {
	return (
		<div className="flex items-center flex-col gap-5 h-[400px] justify-center">
			<div className="w-[200px] h-[200px] relative">
				<Image src="/imgs/emptyData.png" fill alt="" />
			</div>
			<div className="font-medium">Dữ liệu đang cập nhật</div>
		</div>
	);
};

export default EmptyData;
