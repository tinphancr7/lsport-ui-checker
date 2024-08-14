"use client";

import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { usePathname } from "next/navigation";

const ProfileBreadCrumbs = () => {
  const pathname = usePathname();

  const breadCrumbs = [
    { href: "/profile", value: "Trang cá nhân" },
    { href: "/profile/bai-viet", value: "Bài viết" },
    { href: "/profile/follow", value: "Theo dõi của tôi" },
    { href: "/profile/feedback", value: "Phản hồi" },
  ];

  const renderBreadCumb = () => {
    const item = breadCrumbs.find((item) => item.href === pathname);

    return (
      <BreadcrumbItem>
        <span className="text-base text-primary font-medium">
          {item?.value}
        </span>
      </BreadcrumbItem>
    );
  };

  return (
    <Breadcrumbs>
      <BreadcrumbItem>
        <span className="text-base font-medium">Trang chủ</span>
      </BreadcrumbItem>
      {renderBreadCumb()}
    </Breadcrumbs>
  );
};

export default ProfileBreadCrumbs;
