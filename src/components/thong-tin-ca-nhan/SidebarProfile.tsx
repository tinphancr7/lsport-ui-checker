"use client";

import { sidebarProfile } from "@/configs/sidebarProfile";
import { ISidebarProfile } from "@/interfaces/sidebarItem";
import { Tab, Tabs } from "@nextui-org/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

const SidebarProfile = () => {
  const pathname = usePathname();
  const router = useRouter();

  const createSidebarItem = useCallback((category: ISidebarProfile, index: number) => {
    const compareUrls = (url1: string, url2: string, substring: string) => {
      return url1.includes(substring) && url2.includes(substring);
    }

    return (
      <div
        key={index}
        className={`p-4 border-b border-b-slate-100 ${
          (compareUrls(pathname, category.link, 'bai-viet') || pathname === category.link)
            ? "border-l-4 border-l-primary bg-orange-100"
            : ""
        }`}
      >
        <Link
          key={index}
          href={category.link}
          className="flex items-center gap-x-2"
        >
          <category.icon
            size={24}
            className={`${
              (compareUrls(pathname, category.link, 'bai-viet') || pathname === category.link) ? "text-primary" : "text-gray"
            }`}
          />
          <span
            className={`${
              (compareUrls(pathname, category.link, 'bai-viet') || pathname === category.link) ? "text-primary font-medium" : ""
            }`}
          >
            {category.title}
          </span>
        </Link>
      </div>
    );
  }, [pathname]);

  return (
    <div className="col-span-3 shadow-container h-fit bg-light rounded-md p-4 max-md:col-span-12 max-md:p-2 max-md:mb-5">
      <div className="bg-light max-md:hidden">
        {sidebarProfile?.map((category, index) =>
          createSidebarItem(category, index)
        )}
      </div>

      <div className="md:hidden">
        <Tabs
          aria-label="Dynamic tabs"
          variant={"solid"}
          items={sidebarProfile}
          defaultSelectedKey={"/thong-tin-ca-nhan"}
          onSelectionChange={(value) => {
            router.push(value as string);
          }}
          classNames={{
            tabList: "shadow-none border-0 gap-2 w-full relative rounded-lg bg-light font-semibold",
            cursor: "w-full bg-orange-100 shadow-none",
            tab: `max-w-fit aria-selected:border-transparent data-[hover-unselected=true]:bg-orange-100 data-[hover-unselected=true]:opacity-100 data-[hover-unselected=true]:border-transparent`,
            tabContent: `text-gray group-data-[hover-unselected=true]:text-primary group-data-[selected=true]:text-primary`,
          }}
        >
          {(item: any) => (
            <Tab 
              key={item.link} 
              title={(
                <div className="flex gap-2 items-center">
                  <item.icon size={24} />
                  <span>{item.title}</span>
                </div>
              )} 
            />
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default SidebarProfile;
