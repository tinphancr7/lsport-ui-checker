"use client";
import React from "react";
import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Button,
} from "@nextui-org/react";
import {MdKeyboardArrowLeft} from "react-icons/md";
import Link from "next/link";
import {getPreviousDays, leagues} from "@/utils";
import InputMatch from "../../components/InputMatch/InputMatch";
import {useMetaParamsStore} from "@/stores/useMetaParamsStore";
const FilterResult = () => {
	const {currentDate, setSearchText, setCurrentDate, leagueId, setLeagueId} =
		useMetaParamsStore();

	const dates = getPreviousDays() || [];

	return (
		<div className="bg-light py-2 px-10 rounded-xl w-full max-md:px-2">
			<div className="flex items-center justify-end relative max-md:flex-col-reverse max-md:items-end max-md:gap-2">
				<Link
					href="/"
					className="absolute top-[50%] left-0 -translate-y-[50%] max-md:translate-y-0 max-md:top-[12%]"
				>
					<MdKeyboardArrowLeft size={24} />
				</Link>

				<div className="flex flex-row max-md:w-full">
					<Dropdown size="sm">
						<DropdownTrigger>
							<Button
								variant="bordered"
								className="max-md:w-full border border-r-0 rounded-tl-full rounded-bl-full"
							>
								{currentDate}
							</Button>
						</DropdownTrigger>
						<DropdownMenu
							aria-label="Dynamic Actions"
							items={dates}
							itemClasses={{
								base: "data-[hover=true]:bg-primary data-[hover=true]:text-light data-[selectable=true]:focus:bg-primary data-[selectable=true]:focus:text-light",
							}}
							selectionMode="single"
							disallowEmptySelection
							selectedKeys={new Set([currentDate])}
							onSelectionChange={(key) => setCurrentDate([...key][0])}
						>
							{(item) => (
								<DropdownItem key={item.date} textValue={item.label}>
									{item.date} {item.label}
								</DropdownItem>
							)}
						</DropdownMenu>
					</Dropdown>
					<Dropdown size="sm">
						<DropdownTrigger>
							<Button
								variant="bordered"
								className="max-md:w-full border rounded-tr-full rounded-br-full capitalize"
							>
								{
									leagues.find(
										(item) => item.key.toString() === leagueId.toString()
									)?.label
								}
							</Button>
						</DropdownTrigger>
						<DropdownMenu
							aria-label="Dynamic Actions"
							itemClasses={{
								base: "data-[hover=true]:bg-primary data-[hover=true]:text-light data-[selectable=true]:focus:bg-primary data-[selectable=true]:focus:text-light",
							}}
							items={leagues}
							onAction={(key) => {
								setLeagueId(key.toString());
							}}
						>
							{(item) => (
								<DropdownItem key={item.key}>{item.label}</DropdownItem>
							)}
						</DropdownMenu>
					</Dropdown>
				</div>
				<div className="max-md:w-full max-md:pl-5">
					<InputMatch setSearchText={setSearchText} />
				</div>
			</div>
		</div>
	);
};

export default FilterResult;
