
import routes from "@/configs/routes";
import { Button } from "@nextui-org/react";
import { redirect } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";

function Error422() {
    const refreshPage = () => {
        redirect(routes.livestream);
    }
    
    return (  
        <div className="flex flex-col space-y-2 bg-table shadow-wrapper flex-grow">
			<div className="w-full h-page flex flex-wrap items-center justify-center">
				<div className="px-5 py-6 text-center flex items-center gap-5 bg-primary rounded-lg">
                    <h1 className="font-mono z-10 max-md:text-3xl md:text-4xl lg:text-5xl text-light inline-block font-bold tracking-widest">
                        422
                    </h1>

                    <div className="flex flex-col items-center gap-1 z-10 pl-4 relative after:absolute after:left-0 after:w-1 after:bg-light after:top-0 after:bottom-0">
                        <p className="max-md:text-sm md:text-base lg:text-lg text-light tracking-wider">
                            Không tìm livestream trận đấu này. Vui lòng thử lại!
                        </p>

                        <Button
                            variant="solid"
                            color="primary"
                            className="max-md:text-sm text-base shadow-sm bg-light max-h-8 max-w-max flex flex-row justify-center py-3 text-primary transition-bg hover:opacity-80 duration-400 w-full font-semibold rounded items-center !gap-3 tracking-wider"
                            onPress={refreshPage}
                        >
                            <FaArrowLeftLong className="w-6 h-6" />
                            Quay lại trang livestream
                        </Button>
                    </div>
                </div>
			</div>
		</div>
    );
}

export default Error422;