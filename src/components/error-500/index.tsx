"use client";
import {Button} from "@nextui-org/react";
import {IoMdRefresh} from "react-icons/io";

function Error500({reset}: {reset: () => void}) {
	const refreshPage = () => {
		window.location.reload();
	};

	return (
		<div className="flex flex-col space-y-2 bg-table shadow-wrapper flex-grow">
			<div className="w-full h-page flex flex-wrap items-center justify-center">
				<div className="px-5 py-6 text-center flex items-center gap-5 bg-primary rounded-lg">
					<h1 className="font-mono z-10 max-md:text-3xl md:text-4xl lg:text-5xl text-light inline-block font-bold tracking-widest">
						500
					</h1>

					<div className="flex flex-col items-center gap-1 z-10 pl-4 relative after:absolute after:left-0 after:w-1 after:bg-light after:top-0 after:bottom-0">
						<p className="max-md:text-sm md:text-base lg:text-lg text-light tracking-wider">
							Đã xảy ra lỗi trong quá trình tải dữ liệu!
						</p>

						<Button
							variant="solid"
							color="primary"
							className="max-md:text-sm text-base shadow-sm bg-light max-h-8 max-w-max flex flex-row justify-center py-3 text-primary transition-bg hover:opacity-80 duration-400 w-full font-semibold rounded items-center !gap-3 tracking-wider"
							onPress={refreshPage}
						>
							<IoMdRefresh className="w-6 h-6" />
							Tải lại trang
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Error500;
