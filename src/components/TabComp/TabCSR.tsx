"use client";

import {Tabs, Tab} from "@nextui-org/react";
const TabCSR = ({
	tabs,
	currentTab,
	variant = "bordered",
	className,
	setCurrentTab,
	setLeaguesId,
}: any) => {
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
				onSelectionChange={(tab) => {
					setCurrentTab(tab as string);
					setLeaguesId && setLeaguesId("");
				}}
				classNames={{
					tabList:
						className?.tabList ||
						"shadow-none border-0 gap-6 w-full relative rounded-lg bg-light p-2 font-semibold",
					cursor: "w-full bg-primary",
					tab:
						className?.tab ||
						`max-w-fit ${customStyleTab} aria-selected:border-transparent data-[hover-unselected=true]:bg-primary data-[hover-unselected=true]:opacity-100 data-[hover-unselected=true]:border-transparent`,
					tabContent:
						className?.tabContent ||
						`text-black37 group-data-[hover-unselected=true]:text-light ${customStyleTabContent}`,
				}}
			>
				{(item: any) => (
					<Tab
						key={item.id}
						title={
							<div className="flex items-center flex-col justify-center ">
								<span>{item?.date}</span>
								<span className="">{item.label}</span>
							</div>
						}
					></Tab>
				)}
			</Tabs>
		</div>
	);
};

export default TabCSR;
