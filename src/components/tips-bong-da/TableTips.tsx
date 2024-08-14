"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Pagination,
	Spinner,
} from "@nextui-org/react";
import { GoArrowDown } from "react-icons/go";
import Link from "next/link";
import CardTip from "../card-tip";
import { useTipStore } from "@/stores/useTipStore";
import moment from "moment";
import { getPagingTipsPublic } from "@/apis/tips.api";
import { generateValueBet } from "@/utils";

const columns = [
	{
		name: (
			<p className="flex items-center gap-x-2">
				Trận <GoArrowDown size={20} />
			</p>
		),
		_id: "tip",
	},
	{ name: "Lựa chọn", _id: "vote" },
];

const TableTips = () => {
	const { pageSize } = useTipStore();

	const [tips, setTips] = useState([]);
	const [pageIndex, setPageIndex] = useState(1);
	const [total, setTotal] = useState(1);
	const [isLoading, setIsLoading] = useState(false);

	const fetchData = async (query: {
		pageIndex: number;
		pageSize: number;
	}) => {
		try {
			setIsLoading(true);

			const { data } = await getPagingTipsPublic(query);

			if (data?.status === 1) {
				setTotal(data?.data?.counts);
				setTips(data?.data?.data);
			}
		} catch (error) {
			console.log("error: ", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData({ pageIndex: 1, pageSize });
	}, []);

	const renderCell = useCallback((item: any, columnKey: React.Key) => {
		const cellValue = item[columnKey as any];

		switch (columnKey) {
			case "tip":
				return (
					<Link href={`/tips-bong-da/${item._id}`}>
						<CardTip
							tip={{
								leagueLogo: item?.league?.logo,
								season: item?.league?.currentSeason,
								homeName: item?.match?.homeName,
								awayName: item?.match?.awayName,
								leagueName: item?.league?.name,
								date: moment(item?.match?.date).format(
									"DD-MM-YYYY"
								),
								time: moment
									.unix(item?.match?.matchTime)
									.format("HH:mm"),
							}}
						/>
					</Link>
				);
			case "vote":
				return (
					<div className="flex flex-col">
						{[0, 2].includes(Number(cellValue?.position)) && (
							<p className="text-sm font-medium capitalize">
								{Number(cellValue?.position) === 0
									? item?.match?.homeName
									: item?.match?.awayName
								}
							</p>
						)}
						<p className="text-sm capitalize text-default-500/80">
							{generateValueBet(item?.type, Number(cellValue?.position), cellValue?.value)}
						</p>
					</div>
				);
		}
	}, []);

	const classNames = useMemo(
		() => ({
			wrapper: ["rounded-none", "p-0", "bg-white"],
			th: [
				"text-default-500",
				"border-b",
				"border-divider",
				"!bg-[#F9FAFB]",
				"px-4",
			],
			td: ["px-4"],
		}),
		[]
	);

	const totalPages = useMemo(() => {
		const caculator = Math.ceil(total / pageSize);

		return caculator;
	}, [pageSize, total]);

	const handlePageChange = (value: number) => {
		setPageIndex(value);

		fetchData({ pageIndex: value, pageSize });
	};

	return (
		<div>
			<Table
				aria-label="Example table with custom cells"
				classNames={classNames}
			>
				<TableHeader columns={columns}>
					{(column) => (
						<TableColumn
							key={column._id}
							align={
								column._id === "actions" ? "center" : "start"
							}
							className="text-left"
						>
							{column.name}
						</TableColumn>
					)}
				</TableHeader>
				<TableBody
					items={tips}
					isLoading={isLoading}
					emptyContent={
						!isLoading && !tips?.length ? "Không có dữ liệu" : ""
					}
					loadingContent={<Spinner size="lg" color="primary" />}
				>
					{(item: any) => (
						<TableRow key={item._id}>
							{(columnKey) => (
								<TableCell>
									{renderCell(item, columnKey)}
								</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>
			</Table>

			<div className="py-3 float-right">
				<Pagination
					showControls
					color="primary"
					page={pageIndex}
					total={totalPages || 1}
					variant="light"
					onChange={handlePageChange}
					classNames={{
						item: "font-medium [&[data-hover=true]:not([data-active=true])]:bg-default-300/40",
						prev: "[&[data-hover=true]:not([data-active=true])]:bg-default-300/40",
						next: "[&[data-hover=true]:not([data-active=true])]:bg-default-300/40",
					}}
				/>
			</div>
		</div>
	);
};

export default TableTips;
