"use client";

import routes from "@/configs/routes";
import { Tabs, Tab } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";

const PostPage = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();

  const tabsTips = [
    {
      title: "Đăng Tips",
      link: routes.createNewTips,
    },
    {
      title: "Tips đã đăng",
      link: routes.tipsList,
    },
  ];

  const handleSelectionChangeTab = (tab: any) => {
    router.push(tab)
  }

  return (
    <div className="bg-light border border-slate-300 rounded-md px-5 overflow-y-auto chat">
      <Tabs
        aria-label="Options"
        color="primary"
        variant="underlined"
        items={tabsTips || []}
        classNames={{
          tabList:
            "gap-6 relative w-[300px] rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-primary",
          tab: "w-full px-0 h-12",
          tabContent: "group-data-[selected=true]:text-primary group-data-[selected=true]:font-bold",
        }}
        selectedKey={pathname}
        onSelectionChange={handleSelectionChangeTab}
      >
        {(item) => (
          <Tab
            key={item?.link}
            title={
              <div className="flex items-center space-x-2">
                {item?.title}
              </div>
            }
          />
        )}
      </Tabs>

      {children}
    </div>
  );
};

export default PostPage;
