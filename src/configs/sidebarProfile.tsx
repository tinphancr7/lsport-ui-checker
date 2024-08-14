import { BiMessageDetail, BiSolidUserRectangle } from "react-icons/bi";
import { BsFileEarmarkPost } from "react-icons/bs";
import { PiUserCirclePlusLight } from "react-icons/pi";
import routes from "./routes";

const sidebarProfile = [
  {
    link: routes.profile,
    icon: BiSolidUserRectangle,
    title: "Thông tin cá nhân",
  },
  {
    link: routes.createNewTips,
    icon: BsFileEarmarkPost,
    title: "Bài viết",
  },
  /*
  {
    link: "/thong-tin-ca-nhan/follow",
    icon: PiUserCirclePlusLight,
    title: "Theo dõi của tôi",
  },
  {
    link: "/thong-tin-ca-nhan/feedback",
    icon: BiMessageDetail,
    title: "Phản hồi",
  },
  */
];

export { sidebarProfile };
