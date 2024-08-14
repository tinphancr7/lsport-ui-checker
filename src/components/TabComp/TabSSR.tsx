"use client";

import {Tabs, Tab} from "@nextui-org/react";
import {usePathname, useRouter} from "next/navigation";
import useQueryConfig from "@/hooks/useQueryConfig";
import {createSearchParams} from "@/utils";

const TabSSR = ({tabs, currentTab, variant = "bordered", className}: any) => {
	const queryConfig = useQueryConfig();
	const router = useRouter();
	const pathname = usePathname();

	const handleChangeTab = (tab: string) => {
		console.log("tab", tab);
		const url = createSearchParams({
			queryConfig,
			pathname,
			params: {tab},
		});
		router.push(url);
	};

	const customStyleTab =
		variant === "bordered"
			? "border border-slate-400/50"
			: "border-0 rounded-md";
	const customStyleTabContent =
		variant === "bordered" ? "group-data-[selected=true]:text-light" : "";

	return (
		<div className="flex w-full flex-col">
			<Tabs
				aria-label="Dynamic tabs"
				variant={variant}
				items={tabs}
				selectedKey={currentTab}
				onSelectionChange={(tab) => handleChangeTab(tab as string)}
				classNames={{
					tabList:
						className?.tabList ||
						"shadow-none border-0 gap-6 w-full relative rounded-lg bg-light p-2 font-semibold max-md:gap-2",
					cursor: "w-full bg-primary",
					tab:
						className?.tab ||
						`max-w-fit ${customStyleTab} aria-selected:border-transparent data-[hover-unselected=true]:bg-primary data-[hover-unselected=true]:opacity-100 data-[hover-unselected=true]:border-transparent`,
					tabContent:
						className?.tabContent ||
						`text-black37 group-data-[hover-unselected=true]:text-light ${customStyleTabContent}`,
				}}
			>
				{(item: any) => <Tab key={item.id} title={item.label}></Tab>}
			</Tabs>
		</div>
	);
};

export default TabSSR;
