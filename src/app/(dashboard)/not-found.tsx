import { Button, Image } from "@nextui-org/react";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import routes from "@/configs/routes";

export default function NotFound() {
	return (
		<div className="h-screen bg-light rounded-md p-4 flex items-center justify-center gap-6">
			<Image
				src={"/error-4-0-4.png"}
				className="w-auto h-auto max-h-96"
				alt=""
			/>

			<div className="flex flex-col gap-4 items-center">
				<p className="font-mono pr-4 z-10 max-md:text-3xl md:text-4xl lg:text-5xl text-dark inline-block font-bold tracking-widest relative after:absolute after:right-0 after:w-1 after:top-0 after:bottom-0">
					404 Not Found
				</p>
				<p className="max-md:text-lg md:text-base lg:text-lg text-dark tracking-wider">
					Trang web không hợp lệ. Vui lòng thử lại!
				</p>

				<Button
					as={Link}
					href={routes?.dashboard}
					variant="solid"
					color="primary"
					className="shadow-sm bg-danger text-light max-h-8 max-w-max flex flex-row justify-center py-3 transition-bg hover:opacity-80 duration-400 w-full font-semibold rounded items-center !gap-3 tracking-wider"
					startContent={<FaArrowLeftLong />}
				>
					Quay lại
				</Button>
			</div>
		</div>
	);
}
