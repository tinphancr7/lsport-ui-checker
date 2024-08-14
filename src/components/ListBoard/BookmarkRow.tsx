import {addFavourite, FAVOURITE_TYPE} from "@/apis/favourite.api";
import routes from "@/configs/routes";
import {generateMatchTime} from "@/utils";
import NotifyMessage from "@/utils/notify";
import {Tooltip} from "@nextui-org/react";
import Link from "next/link";
import {CiBookmark, CiYoutube} from "react-icons/ci";
import {FaBookmark} from "react-icons/fa";
import slugify from "slugify";

const BookmarkRow = ({isBookmark, setIsBookmark, item}: any) => {
	const handleAddFavourite = async () => {
		try {
			const {data} = await addFavourite({
				matchId: String(item?.matchId),
				type: FAVOURITE_TYPE.MATCH,
			});
			if (data?.status === 1) {
				setIsBookmark(!isBookmark);
				NotifyMessage(
					`${!isBookmark ? "Đã thêm vào" : "Đã xóa khỏi"} mục yêu thích!`,
					isBookmark ? "warning" : "success"
				);
			}
		} catch (error) {
			console.log("error: ", error);
			NotifyMessage("Không thể thêm vào mục yêu thích!", "error");
		}
	};

	return (
		<div className="flex justify-between gap-6">
			<div className="flex items-center gap-1">
				<Tooltip
					color={isBookmark ? "warning" : "success"}
					content={`${!isBookmark ? "Thêm vào" : "Xóa khỏi"} mục yêu thích!`}
					classNames={{
						base: "capitalize",
						content: "text-light",
					}}
				>
					<span
						className="inline-block cursor-pointer"
						onClick={handleAddFavourite}
					>
						{isBookmark ? (
							<FaBookmark className="text-primary" size={20} />
						) : (
							<CiBookmark size={20} />
						)}
					</span>
				</Tooltip>
				<span
					className={`max-md:text-sm  font-semibold ${
						[1, 2, 3, 4, 5].includes(item?.status)
							? "text-red-500"
							: "text-primary"
					}`}
				>
					{generateMatchTime({
						matchTime: item?.matchTime,
						status: item?.status,
						halfStartTime: item?.halfStartTime,
					})}
					{[1, 2, 3, 4, 5].includes(item?.status) && (
						<span className="blink-minute text-[16px">{`'`}</span>
					)}
				</span>
			</div>

			<div className="flex items-center justify-center gap-1 text-center">
				<span className="bg-[#7EB000] text-white rounded w-[22px] h-5 inline-block max-md:hidden">
					N
				</span>
				<Link
					href={`match/${slugify(`${item?.homeName} vs ${item?.awayName}`, {
						lower: true,
						replacement: "-",
						locale: "vi",
						trim: true,
					})}/${item?.matchId}`}
					className="max-md:hidden"
				>
					<CiYoutube size={30} className="text-gray" />
				</Link>
				<span className="bg-primary text-white rounded flex items-center max-h-5 px-3 text-center">
					2
				</span>
			</div>
		</div>
	);
};
export default BookmarkRow;
