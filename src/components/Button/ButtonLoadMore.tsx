import {Button} from "@nextui-org/react";
import React from "react";

const ButtonLoadMore = ({
	isLoading,
	loadMoreData,
	hasMoreData,
}: {
	isLoading: boolean;
	loadMoreData: () => void;
	hasMoreData: boolean;
}) => {
	return (
		<div className="text-center mt-5">
			<Button
				variant="shadow"
				isLoading={isLoading}
				className={`px-4 py-2   text-slate-50 rounded-md bg-primary data-[hover=true]:opacity-100 ${
					hasMoreData
						? ""
						: " opacity-50 data-[hover=true]:opacity-50 cursor-not-allowed"
				}`}
				onClick={loadMoreData}
			>
				Xem thêm
			</Button>
		</div>
	);
};

export default ButtonLoadMore;
