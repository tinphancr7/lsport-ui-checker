"use client";

import {signIn} from "@/apis/auth.api";
import routes from "@/configs/routes";
import NotifyMessage from "@/utils/notify";
import {Button, Input} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import {useMemo, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {useAuthStore} from "@/stores/useAuthStore";

function FormLogin() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const redirectURL = searchParams.get("returnUrl")
		? searchParams.get("returnUrl")
		: "/";
	console.log("searchParams.get", redirectURL);
	const {isLoading, setUser, setIsLoading, setIsAuthenticated} = useAuthStore();
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
	});

	const handleValueChange = (value: string, key: string): void => {
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

		if (hasEmptyField) {
			return true;
		}

		return false;
	}, [form]);

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

		try {
			setIsLoading(true);

			const {data} = await signIn({
				username: form?.username?.value,
				password: form?.password?.value,
			});

			if (data?.status === 1) {
				setUser(data?.user);
				setIsAuthenticated(true);

				NotifyMessage(`Xin chào. ${data?.user?.username}!`, "success");

				console.log("redirectURL", redirectURL);
				router.replace(redirectURL as string);
			}
		} catch (error: any) {
			if (error?.response?.data?.status === 4) {
				return NotifyMessage("Tên Đăng Nhập Không Tồn tại!", "error");
			}

			if (error?.response?.data?.status === 8) {
				return NotifyMessage("Mật Khẩu Không Đúng!", "error");
			}

			return NotifyMessage(`Đăng nhập thất bại!`, "error");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<div className="flex flex-col gap-2 mt-6">
				{Object.keys(form).map((key: string, index: number) => (
					<Input
						key={index}
						color="primary"
						variant="bordered"
						labelPlacement="outside"
						classNames={{
							inputWrapper:
								"h-12 data-[hover=true]:border-primary border border-slate-400",
							label: "text-dark font-medium",
						}}
						type={form[key].type}
						label={form[key].label}
						value={form[key].value}
						onValueChange={(value: string) => handleValueChange(value, key)}
						endContent={renderEndContend(key, form[key].type)}
						errorMessage={form[key].errorMessage}
						isInvalid={!!form[key].errorMessage}
						onKeyDown={(event) => event.key === "Enter" && onSubmit()}
					/>
				))}

				{/*  
				<div className="mt-4 flex justify-between">
					<Checkbox
						color="primary"
						value={checkbox}
						onValueChange={setCheckbox}
						classNames={{
							label: "max-md:text-sm",
						}}
					>
						Lưu mật khẩu
					</Checkbox>

					<Link
						href={routes.register}
						className="text-link font-medium max-md:text-sm"
					>
						Quên mật khẩu?
					</Link>
				</div>
				*/}
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
				Đăng nhập
			</Button>

			<div className="mt-4 justify-center items-center flex gap-1 text-gray max-md:text-sm">
				Bạn chưa có tài khoản?
				<Link href={routes.register} className="text-link font-medium">
					Đăng ký ngay
				</Link>
			</div>
		</>
	);
}

export default FormLogin;
