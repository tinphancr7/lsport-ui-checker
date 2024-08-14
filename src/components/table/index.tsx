import {
	Spinner,
	Table as TableNextUI,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
    Selection,
    SelectionMode,
} from "@nextui-org/react";
import { useMemo, useState } from "react";

function Table({
	data = [],
	columns,
	renderCell,
	isLoading = false,
	selectionMode = "single", //multiple or single
	selectedKeys = new Set([]),
	onSelectedChange = () => {},
}: {
	data: any,
	columns: any,
	renderCell: any,
	isLoading: boolean,
	selectionMode: SelectionMode, //multiple or single
	selectedKeys: Selection,
	onSelectedChange: any,
}) {
    const [sortDescriptor, setSortDescriptor] = useState<any>({
		column: "age",
		direction: "ascending",
	});

	const sortedItems = useMemo(() => {
		return [...data]?.sort((a, b) => {
			const first = a[sortDescriptor.column];
			const second = b[sortDescriptor.column];
			let cmp = first < second ? -1 : first > second ? 1 : 0;

			if (Number(first) == String(first) && Number(second) == String(second)) {
				cmp = first - second;
			}

			return sortDescriptor.direction === "descending" ? -cmp : cmp;
		});
	}, [data, sortDescriptor]);

	// Handler that is called when a user performs an action on the cell.
	// (key: react.Key) => void
	// eslint-disable-next-line no-unused-vars
	const onCellAction = () => {};

    return (  
        <TableNextUI
			color="default"
			aria-label="Example table with custom cells"
			fullWidth
			classNames={{
				base: "",
				wrapper: "max-h-[65vh] min-h-[200px] bg-transparent shadow-wrapper scrollbar-kanban",
				table: "overflow-auto",
				th: "uppercase text-center bg-primary text-light text-base font-medium",
				td: "text-sm text-dark py-4 text-center group-aria-[selected=false]:group-data-[hover=true]:before:bg-gray-500/60",
			}}
			isHeaderSticky={false}
			bottomContentPlacement="outside"
			// topContentPlacement="outside"
			sortDescriptor={sortDescriptor}
			onSortChange={setSortDescriptor}
			selectionMode={selectionMode}
			selectedKeys={selectedKeys}
			onSelectionChange={onSelectedChange}
			isLoading={isLoading}
			onCellAction={onCellAction}
			emptyContent={
				<p className="text-white">Không có dữ liệu</p>
			}
		>
			<TableHeader columns={columns}>
				{(column: any) => (
					<TableColumn
						key={column._id}
						className={`${column._id === "actions" && "w-36 text-center"} ${
							column.className
						}`}
						allowsSorting={column.sortable}
					>
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody
				items={sortedItems}
				emptyContent={!isLoading ? "Không có dữ liệu" : ""}
				isLoading={isLoading}
				loadingContent={<Spinner size="lg" color="primary" />}
			>
				{(item) => (
					<TableRow key={item._id}>
						{(columnKey) => (
							<TableCell>{renderCell(item, columnKey)}</TableCell>
						)}
					</TableRow>
				)}
			</TableBody>
		</TableNextUI>
    );
}

export default Table;