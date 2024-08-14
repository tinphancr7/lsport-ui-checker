'use client'

import dynamic from 'next/dynamic';
import {getAllLeagues} from "@/apis/league.api";
import matchApi from "@/apis/match.api";
import routes from "@/configs/routes";
import {LOGO_DEFAULT} from "@/constants";
import useForm from "@/hooks/useForm";
import {useTipStore} from "@/stores/useTipStore";
import {convertStringOddToArray, convertToOdd} from "@/utils";
import {
	Autocomplete,
	AutocompleteItem,
	Button,
	Select,
	SelectItem,
} from "@nextui-org/react";
import moment from "moment";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useCallback, useEffect, useMemo, useState} from "react";
import {CiCalendar} from "react-icons/ci";
import {CiClock2} from "react-icons/ci";

// Dynamically import TinyMCE with SSR disabled
const TinyMCE = dynamic(() => import('@/components/tinyMCE'), {
	ssr: false,
});

function CreateNewTip() {
	const router = useRouter();

	const {
		form,
		isEmptyValues,
		validateForm,
		getState,
		getValue,
		setValue,
		setOptions,
	} = useForm({
		leagueId: {
			label: "Giải đấu",
			type: "autocomplete",
			options: [],
			value: "",
			errorMessage: "",
			isRequire: true,
		},
		matchId: {
			label: "Trận đấu",
			type: "autocomplete",
			options: [],
			value: "",
			errorMessage: "",
			isRequire: true,
		},
		time: {
			label: "Thời gian",
			type: "time",
			value: "",
			isRequire: true,
		},
		vote: {
			label: "Lựa chọn",
			type: "select",
			options: [],
			value: "",
			errorMessage: "",
		},
		descript: {
			label: "Chi tiết",
			type: "editor",
			value: "",
			errorMessage: "",
			isRequire: true,
		},
	});

	const [isLoadingMatch, setIsLoadingMatch] = useState(false);

	const generateMatchOdd = (data: any) => {
		const options = [];
		const initalOdd: any = {
			handicap: null,
			overUnder: null,
			europeOdds: null,
		};

		const handicapArray = convertStringOddToArray(data?.handicap);
		const overUnderArray = convertStringOddToArray(data?.overUnder);

		const handicapValue: any = Number(handicapArray?.[5]);

		const overUnderValue = overUnderArray?.[5];

		if (data.handicap) {
			initalOdd.handicap = {
				type: "handicap",
				home: `${data?.homeName} ${
					handicapValue >= 0
						? convertToOdd(handicapValue)
						: `-${convertToOdd(handicapValue)}`
				}`,
				away: `${data?.awayName} ${
					handicapValue < 0
						? convertToOdd(handicapValue)
						: `-${convertToOdd(handicapValue)}`
				}`,
			};
		}

		if (data?.overUnder) {
			initalOdd.overUnder = {
				type: "overUnder",
				home: convertToOdd(overUnderValue),
				away: convertToOdd(overUnderValue),
			};
		}

		if (data?.europeOdds) {
			initalOdd.europeOdds = {
				type: "europeOdds",
				home: convertStringOddToArray(data?.europeOdds)?.[5],
				draw: convertStringOddToArray(data?.europeOdds)?.[6],
				away: convertStringOddToArray(data?.europeOdds)?.[7],
			};
		}

		if (initalOdd.handicap) {
			options.push(
				{
					type: "handicap",
					value: initalOdd.handicap.home,
					label: initalOdd.handicap.home,
					position: 0,
				},
				{
					type: "handicap",
					value: initalOdd.handicap.away,
					label: initalOdd.handicap.away,
					position: 2,
				}
			);
		}

		if (initalOdd.overUnder) {
			options.push(
				{
					type: "overUnder",
					value: initalOdd.overUnder.home,
					label: `Tài ${initalOdd.overUnder.home}`,
					position: 0,
				},
				{
					type: "overUnder",
					value: initalOdd.overUnder.away,
					label: `Xỉu ${initalOdd.overUnder.away}`,
					position: 2,
				}
			);
		}

		if (initalOdd.europeOdds) {
			options.push(
				{
					type: "europeOdds",
					value: initalOdd.europeOdds.home,
					label: `Chủ ${initalOdd.europeOdds.home}`,
					position: 0,
				},
				{
					type: "europeOdds",
					value: initalOdd.europeOdds.draw,
					label: `Hòa ${initalOdd.europeOdds.draw}`,
					position: 1,
				},
				{
					type: "europeOdds",
					value: initalOdd.europeOdds.away,
					label: `Khách ${initalOdd.europeOdds.away}`,
					position: 2,
				}
			);
		}

		return options;
	};

	const {isSubmit, addTip} = useTipStore();

	const fetchDataLeagues = async () => {
		try {
			const {data} = await getAllLeagues();

			if (data?.status === 1) {
				setOptions("leagueId", data?.results);
			}
		} catch (error) {
			console.log("error: ", error);
		}
	};

	const fetchDataGetMatchsList = async (id: string) => {
		try {
			setIsLoadingMatch(true);

			const {data} = await matchApi.getMatchsListByLeagueId(id);

			setOptions("matchId", data);
		} catch (error) {
			console.log("error: ", error);
		} finally {
			setIsLoadingMatch(false);
		}
	};

	useEffect(() => {
		fetchDataLeagues();
	}, []);

	const handleDataChange = (key: string, value: any): void => {
		if (key === "leagueId") {
			fetchDataGetMatchsList(value);
			setValue("matchId", "");
		}

		if (key === "matchId") {
			const matchsList = getState("matchId")?.options;

			if (!matchsList) return;

			const getMatchById = matchsList?.find((it) => it.matchId === value);

			if (!getMatchById) return;

			setValue("time", getMatchById?.matchTime);

			setOptions("vote", generateMatchOdd(getMatchById));
		}

		setValue(key, value);
	};

	const isDisabledMatch = useCallback(
		(key: string) => {
			if (
				(key === "matchId" && !getValue("leagueId")) ||
				(key === "matchId" && isLoadingMatch) ||
				(key === "matchId" &&
					!!getValue("leagueId") &&
					!getState("matchId")?.options?.length) ||
				(key === "vote" && !getValue("matchId"))
			) {
				return true;
			}

			return false;
		},
		[getState, getValue, isLoadingMatch]
	);

	const dateTimeOfMatch = useMemo(() => {
		const matchsList = getState("matchId")?.options;

		if (!matchsList) return;

		const getMatchById = matchsList?.find(
			(it) => it.matchId === getValue("matchId")
		);

		if (!getMatchById) return;

		return moment.unix(getMatchById?.matchTime);
	}, [getState, getValue]);

	const onSubmit = async () => {
		// addTip
		if (isEmptyValues) {
			validateForm();
			return;
		}

		const [optionValue] = [...(getValue("vote") as any)];

		const parseValue = JSON.parse(optionValue);

		const {type, ...rest} = parseValue;

		const isSuccess = await addTip({
			league: getValue("leagueId"),
			match: getValue("matchId"),
			type,
			vote: rest,
			descript: getValue("descript"),
		});

		if (isSuccess) {
			router.push(routes.tipsList);
		}
	};

	return (
		<div className="flex flex-col gap-5 pb-5 py-3 w-full divide-y-1 divide-slate-400/30">
			{Object.keys(form).map((key: string) => {
				if (getState(key).type === "autocomplete")
					return (
						<Autocomplete
							key={key}
							fullWidth
							aria-label="post"
							defaultItems={getState(key).options}
							label={getState(key).label}
							labelPlacement="outside-left"
							placeholder={getState(key).label}
							radius="sm"
							variant="bordered"
							selectedKey={getValue(key)}
							inputProps={{
								classNames: {
									base: "justify-between mt-5 grid grid-cols-12",
									mainWrapper: "col-span-10 max-md:col-span-12",
									inputWrapper:
										"shadow-none border group-data-[open=true]:border-primary group-data-[hover=true]:border-primary group-data-[focus=true]:border-primary",
									input: "font-medium",
									label: "col-span-2 max-md:col-span-12 text-sm font-semibold",
								},
							}}
							scrollShadowProps={{
								isEnabled: false,
							}}
							isLoading={key === "matchId" ? isLoadingMatch : false}
							onSelectionChange={(value) => handleDataChange(key, value)}
							allowsEmptyCollection={false}
							isDisabled={isDisabledMatch(key)}
							errorMessage={getState(key).errorMessage}
							isInvalid={!!getState(key).errorMessage}
							onKeyDown={(event) => event.key === "Enter" && onSubmit()}
						>
							{(item) => {
								const keyValue =
									key === "leagueId" ? item?.leagueId : item?.matchId;
								const textValue =
									key === "leagueId"
										? item?.name
										: `${item?.homeName} vs ${item?.awayName}`;

								return (
									<AutocompleteItem key={keyValue} textValue={textValue}>
										{key === "leagueId" ? (
											<div className="flex gap-2 items-center">
												<Image
													src={item.logo || LOGO_DEFAULT}
													alt="loi-anh"
													width={40}
													height={40}
												/>
												{textValue}
											</div>
										) : (
											<div className="grid grid-cols-11 items-center justify-center">
												<div className="flex gap-1 justify-end items-center col-span-5">
													{item?.homeName}
													<Image
														src={item.homeIcon || LOGO_DEFAULT}
														alt="loi-anh"
														width={40}
														height={40}
													/>
												</div>
												<div className="col-span-1 text-center">-</div>
												<div className="flex gap-1 justify-start items-center col-span-5">
													<Image
														src={item.awayIcon || LOGO_DEFAULT}
														alt="loi-anh"
														width={40}
														height={40}
													/>
													{item?.awayName}
												</div>
											</div>
										)}
									</AutocompleteItem>
								);
							}}
						</Autocomplete>
					);

				if (getState(key).type === "editor")
					return (
						<div key={key} className="grid grid-cols-12 pt-5">
							<p className="col-span-2 max-md:col-span-12 text-sm font-semibold">
								{getState(key).label}
							</p>

							<div className="col-span-10 max-md:col-span-12">
								<TinyMCE
									value={getValue(key)}
									onEditorChange={(value) => handleDataChange(key, value)}
								/>

								{!!!!getState(key).errorMessage && (
									<p className="mt-1 col-span-2 text-xs text-danger">
										{getState(key).errorMessage}
									</p>
								)}
							</div>
						</div>
					);

				if (getState(key).type === "time")
					return (
						<div
							key={key}
							className={`grid grid-cols-12 pt-5 items-center ${
								getValue("matchId") ? "opacity-100" : "opacity-50"
							}`}
						>
							<p className="col-span-2  max-md:col-span-12 text-sm font-semibold">
								{getState(key).label}
							</p>

							<div className="col-span-10 max-md:col-span-12 py-2 px-3 flex gap-1 text-sm rounded-md border border-default-200 bg-layout select-none">
								{getValue("matchId") ? (
									<>
										<span>
											<CiCalendar className="text-lg" />
										</span>
										<span className="tracking-wide">
											{dateTimeOfMatch?.format("DD-MM-YYYY")}
										</span>
										<span className="mx-1">-</span>
										<span>
											<CiClock2 className="text-lg" />
										</span>
										<span className="tracking-wide">
											{dateTimeOfMatch?.format("HH:mm")}
										</span>
									</>
								) : (
									<span>Vui lòng chọn trận </span>
								)}
							</div>
						</div>
					);

				return (
					<Select
						key={key}
						variant={"bordered"}
						radius="sm"
						classNames={{
							base: " pt-5 grid grid-cols-12 items-center",
							label: "col-span-2 max-md:col-span-12 text-dark font-medium",
							value: "text-dark max-md:text-sm",
							mainWrapper: "col-span-10 max-md:col-span-12",
							trigger:
								"text-gray data-[open=true]:border-primary data-[hover=true]:border-primary data-[focus=true]:border-primary border border-slate-400/30",
						}}
						selectionMode={"single"}
						disallowEmptySelection={true}
						labelPlacement="outside-left"
						label={form[key].label}
						placeholder={form[key].label}
						items={form[key].options}
						selectedKeys={form[key].value}
						onSelectionChange={(value) => handleDataChange(key, value)}
						isDisabled={isDisabledMatch(key)}
					>
						{(option: any) => {
							const {label, ...rest} = option;
							const keyValue = JSON.stringify(rest);

							return (
								<SelectItem key={keyValue} textValue={option.label}>
									{option.label}
								</SelectItem>
							);
						}}
					</Select>
				);
			})}

			<Button
				variant="solid"
				radius="sm"
				className={`text-light max-w-max mt-6 text-base font-medium bg-primary max-md:text-sm`}
				isDisabled={isSubmit}
				isLoading={isSubmit}
				onPress={onSubmit}
			>
				Đăng bài viết
			</Button>
		</div>
	);
}

export default CreateNewTip;
