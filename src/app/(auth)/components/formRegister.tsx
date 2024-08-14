"use client";

import { signUp } from "@/apis/auth.api";
import routes from "@/configs/routes";
import {currencies} from "@/constants";
import languages from "@/constants/languages";
import nations from "@/constants/nations";
import { useAuthStore } from "@/stores/useAuthStore";
import NotifyMessage from "@/utils/notify";
import {
	Button,
	Checkbox,
	Input,
	Selection,
	Select,
	SelectItem,
	Avatar,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {useMemo, useState} from "react";

function FormLogin() {
    const router = useRouter();
    const { isLoading, setUser, setIsLoading } = useAuthStore();
	const [form, setForm] = useState<any>({
		username: {
			label: "Tên tài khoản",
			type: "text",
			errorMessage: "",
			value: "",
		},
		password: {
			label: "Mật khẩu",
			type: "password",
			errorMessage: "",
			value: "",
		},
		verifyPassword: {
			label: "Nhập lại mật khẩu",
			type: "password",
			errorMessage: "",
			value: "",
		},
		nation: {
			label: "Quốc gia",
			type: "select",
			errorMessage: "",
			options: nations,
			value: new Set([nations[0]?.key]),
		},
		currency: {
			label: "Đơn vị tiền",
			type: "select",
			errorMessage: "",
			options: currencies,
			value: new Set([currencies[0]?.key]),
		},
		language: {
			label: "Ngôn ngữ",
			type: "select",
			errorMessage: "",
			options: languages,
			value: new Set([languages[0]?.key]),
		},
	});

	const [checkbox, setCheckbox] = useState<any>(false);

	const handleValueChange = (value: string | Selection, key: string): void => {
		setForm((prev: any) => ({
			...prev,
			[key]: {
				...prev[key],
				value: value,
				errorMessage: value ? "" : prev[key].errorMessage,
			},
		}));
	};

	const handleTypeInputChange = (key: string, type: string) => {
		setForm((prev: any) => ({
			...prev,
			[key]: {
				...prev[key],
				type: type === "text" ? "password" : "text",
			},
		}));
	};

	const renderEndContend = (key: string, type: string) => {
		if (key === "password" && type === "password") {
			return (
				<span
					className="cursor-pointer"
					onClick={() => handleTypeInputChange(key, type)}
				>
					<Image
						priority
						src="/icons/hide-password.svg"
						height={22}
						width={22}
						alt="Follow us on Twitter"
					/>
				</span>
			);
		}

		if (key === "password" && type === "text") {
			return (
				<span
					className="cursor-pointer"
					onClick={() => handleTypeInputChange(key, type)}
				>
					<Image
						priority
						src="/icons/show-password.svg"
						height={22}
						width={22}
						alt="Follow us on Twitter"
					/>
				</span>
			);
		}

		return <></>;
	};

	const isValidBtn = useMemo(() => {
		const hasEmptyField = Object.keys(form).some((key) => !form[key]?.value);

		if (!hasEmptyField && checkbox) {
			return false;
		}

		return true;
	}, [checkbox, form]);

	const onSubmit = async () => {
		const hasEmptyField = Object.keys(form).some((key) => !form[key]?.value);

        if (hasEmptyField) {
            Object.keys(form).forEach((key) => {
                const isEmpty = !form[key]?.value;
                
                const errorMessage = isEmpty ? `Vui lòng nhập ${form[key]?.label}` : "";

                setForm((prev: any) => ({
                    ...prev,
                    [key]: {
                        ...prev[key],
                        errorMessage: errorMessage,
                    },
                }));
            });

			return;
        }

        if (form?.verifyPassword?.value !== form?.password?.value) {
            return setForm((prev: any) => ({
                ...prev,
                verifyPassword: {
                    ...prev?.verifyPassword,
                    errorMessage: 'Nhập lại mật khẩu đúng. Vui lòng thử lại!',
                },
            }));
        }

        try {
			setIsLoading(true);

            const { data } = await signUp({
                username: form?.username?.value,
                password: form?.password?.value,
                nation: [...form?.nation?.value][0],
                currency: [...form?.currency?.value][0],
                language: [...form?.language?.value][0],
            });

            if (data?.status === 1) {
                setUser(data?.user);

                NotifyMessage('Đăng ký thành công!', 'success');

                // Navigate to Dashboard
                router.push(routes.dashboard);
            }
        } catch (error: any) {
            console.log('error: ', error);
			if (error?.response?.data?.status === 7) {
                return NotifyMessage('Tên Đăng Nhập Đã Tồn Tại. Vui lòng thử tên đăng nhập khác!', 'error');
			}

			return NotifyMessage('Đăng ký thất bại!', 'error');
        } finally {
			setIsLoading(false);
		}
    }

	return (
		<>
			<div className="flex flex-col gap-3 mt-6 max-md:mt-0 max-md:gap-0">
				{Object.keys(form).map((key: string, index: number) => {
					if (["text", "password"].includes(form[key].type))
						return (
							<Input
								key={index}
								color="primary"
								variant="bordered"
								classNames={{
									inputWrapper: "h-12 data-[hover=true]:border-primary border border-slate-400",
									input: "max-md:text-sm",
									label: "text-dark font-medium max-md:text-sm max-md:hidden",
								}}
								labelPlacement="outside"
								label={form[key].label}
								placeholder={form[key].label}
								type={form[key].type}
								value={form[key].value}
								onValueChange={(value: string) => handleValueChange(value, key)}
								endContent={renderEndContend(key, form[key].type)}
								errorMessage={form[key].errorMessage}
								isInvalid={!!form[key].errorMessage}
							/>
						);

					return (
						<Select
							key={index}
							variant={"bordered"}
							radius="sm"
							classNames={{
								label: "text-dark font-medium max-md:text-sm max-md:hidden",
								value: "text-dark max-md:text-sm",
								trigger:
									"text-gray data-[open=true]:border-primary data-[hover=true]:border-primary data-[focus=true]:border-primary border border-slate-400",
							}}
							selectionMode={"single"}
							disallowEmptySelection={true}
							labelPlacement="outside"
							label={form[key].label}
							placeholder={form[key].label}
							items={form[key].options}
							selectedKeys={form[key].value}
							onSelectionChange={(keys: Selection) =>
								handleValueChange(keys, key)
							}
							renderValue={(items) => {
								return items.map((item) => (
									<div key={item.key} className="flex items-center gap-2">
										{key === "nation" && (
											<Avatar
												size="sm"
												icon={item.data.icon}
												classNames={{
													icon: "w-full h-full",
												}}
											/>
										)}
										<span>{item.data.label}</span>
									</div>
								));
							}}
						>
							{(option: any) => (
								<SelectItem
									key={option.key}
									value={option.key}
									textValue={option.label}
								>
									{key === "nation" ? (
										<div className="flex items-center gap-2">
											<Avatar
												size="sm"
												icon={option.icon}
												classNames={{
													icon: "w-full h-full",
												}}
											/>
											<p>{option.label}</p>
										</div>
									) : (
										option.label
									)}
								</SelectItem>
							)}
						</Select>
					);
				})}

				<div className="mt-4 flex justify-between">
					<Checkbox
						color="primary"
						value={checkbox}
						onValueChange={setCheckbox}
						classNames={{
							base: "max-md:items-start",
							wrapper: "before:border-2 before:border-slate-400 max-md:before:border"
						}}
					>
						<p className="flex gap-1 max-md:text-sm flex-wrap">
							Tôi đồng ý với
							<Link href={routes.login} className="text-link font-medium max-md:text-sm">
								Điều khoản
							</Link>
							và
							<Link href={routes.login} className="text-link font-medium max-md:text-sm">
								Điều kiện
							</Link>
						</p>
					</Checkbox>
				</div>
			</div>

			<Button
				variant="solid"
				radius="sm"
				className={`text-light mt-6 text-lg font-medium ${
					isValidBtn ? "bg-default-400" : "bg-primary"
				} max-md:text-sm`}
				isDisabled={isValidBtn}
				isLoading={isLoading}
				onPress={onSubmit}
			>
				Tạo tài khoản
			</Button>

			<div className="mt-4 justify-center items-center flex gap-1 text-gray max-md:text-sm text-wrap">
				Bạn đã có tài khoản?
				<Link href={routes.login} className="text-link font-medium max-md:text-sm">
					Đăng nhập ngay
				</Link>
			</div>
		</>
	);
}

export default FormLogin;
