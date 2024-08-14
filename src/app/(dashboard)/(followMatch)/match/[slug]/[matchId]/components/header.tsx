"use client";

import {homeTabs} from "@/constants";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import {useState} from "react";

const posts = [
	{
		_id: "1",
		label: "Giải Vô Địch Bóng Đá Châu Âu 2024 (tại Đức)",
	},
];

function Header({currentTab}: {currentTab: string}) {
	const tab = homeTabs.find((item) => item.id === currentTab);

	const [selectedKey, setSelectedKey] = useState(posts[0]?._id);

	const onSelectionChange = (key: any) => {
		setSelectedKey(key);
	};

	return (
		<div className="mt-2 px-4 py-2 bg-light rounded-lg flex items-center justify-between">
			<p className="text-dark font-semibold text-lg">{tab?.label}</p>

			<Autocomplete
				aria-label="post"
				items={posts}
				placeholder="Chọn trận đấu"
				radius="lg"
				variant="flat"
				selectedKey={selectedKey}
				inputProps={{
					classNames: {
						inputWrapper:
							"bg-grayF5 group-data-[open=true]:border-primary group-data-[hover=true]:border-primary group-data-[focus=true]:border-primary",
						input: "font-medium",
					},
				}}
				classNames={{
					base: "max-w-[40%]",
				}}
				onSelectionChange={onSelectionChange}
				allowsEmptyCollection={false}
			>
				{(item) => (
					<AutocompleteItem key={item?._id} textValue={item?.label}>
						{item?.label}
					</AutocompleteItem>
				)}
			</Autocomplete>
		</div>
	);
}

export default Header;
