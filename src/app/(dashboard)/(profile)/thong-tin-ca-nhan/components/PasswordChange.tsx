"use client"

import { passwordChange } from "@/apis/user.api";
import NotifyMessage from "@/utils/notify";
import { Button, Input } from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";
import { SlLock } from "react-icons/sl";

type FormValue = {
    label: string,
    type: string,
    errorMessage: string,
    value: string,
}

type FormPassword = {
    currentPassword: FormValue;
    newPassword: FormValue;
    confirmNewPassword: FormValue;
}

const initialForm: FormPassword = {
    currentPassword: {
        label: "Mật khẩu hiện tại",
        type: "password",
        errorMessage: "",
        value: "",
    },
    newPassword: {
        label: "Mật khẩu mới",
        type: "password",
        errorMessage: "",
        value: "",
    },
    confirmNewPassword: {
        label: "Xác nhận mật khẩu mới",
        type: "password",
        errorMessage: "",
        value: "",
    },
}

function PasswordChange() {
    const [visible, setVisible] = useState<boolean>(false);
    const [form, setForm] = useState<FormPassword>(initialForm);

    const handleChangeInput = (value: string, key: keyof FormPassword) => {
        setForm((prev: FormPassword) => ({
            ...prev,
            [key]: {
                ...prev[key],
                value,
				errorMessage: value ? "" : prev[key].errorMessage,
            }
        }));
    }

    const handleTypeInputChange = (key: string, type: string) => {
        setForm((prev: any) => ({
            ...prev,
            [key]: {
                ...prev[key],
                type: type === "text" ? "password" : "text",
            }
        }));
    }

    const renderEndContend = (key: string, type: string) => {
        if(type === "password") {
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
            )
        }

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

        )
    }

    const onSubmit = async () => {
        const hasEmptyField = Object.keys(form).some((key) => !form[key as keyof FormPassword]?.value);

        if (hasEmptyField) {
            Object.keys(form).forEach((key) => {
                const isEmpty = !form[key as keyof FormPassword]?.value;
                
                const errorMessage = isEmpty ? `Vui lòng nhập ${form[key as keyof FormPassword]?.label}` : "";

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

        if (form?.newPassword?.value !== form?.confirmNewPassword?.value) {
            return setForm((prev: any) => ({
                ...prev,
                confirmNewPassword: {
                    ...prev?.confirmNewPassword,
                    errorMessage: 'Xác nhận lại mật khẩu đúng. Vui lòng thử lại!',
                },
            }));
        }

        try {
            const currentPassword = form?.currentPassword?.value;
            const newPassword = form?.newPassword?.value;

            const { data } = await passwordChange({
                currentPassword,
                newPassword,
            });

            if (data?.status === 1) {
                NotifyMessage('Đổi mật khẩu thành công!', 'success');
                setVisible(!visible);
                setForm(initialForm);
            }
        } catch (error: any) {
            console.log('error: ', error);

            if (error?.response?.data?.status === 8) {
                return NotifyMessage('Mật Khẩu Hiện Tại Không Đúng!', 'error');
			}

            NotifyMessage('Đổi mật khẩu thất bại!', 'error');
        }
    };

    return (
        <div className="max-md:col-span-12 col-span-4 bg-light border border-slate-300 py-3 px-5 rounded-md transition-all w-full">
            <div className="grid grid-cols-12 items-center justify-center">
                <div className="col-span-2">
                    <SlLock size={24} className="text-primary" />
                </div>
                <div className="col-span-7">
                    <p className="font-bold">Mật khẩu</p>
                    <p className="text-xs text-gray9E">Đổi mật khẩu</p>
                </div>

                <Button 
                    className="bg-primary text-light col-span-3"
                    onPress={() => setVisible(!visible)}
                >
                    Sửa đổi
                </Button>
            </div>

            <div className={`flex flex-col gap-1 ${visible ? 'max-md:mt-3 mt-5 visible max-h-max transition-all opacity-100' : 'invisible max-h-0 transition-all opacity-0'}`}>
                {visible && Object.keys(form).map(
                    (key) => (
                        <Input
                            fullWidth
                            key={key}
                            color="primary"
                            radius="sm"
                            variant="bordered"
                            labelPlacement="outside"
                            classNames={{
                                inputWrapper: "h-12 min-w-max data-[hover=true]:border-primary border border-slate-400",
                                label: "text-dark font-medium",
                            }}
                            type={form[key as keyof FormPassword].type}
                            label={form[key as keyof FormPassword].label}
                            value={form[key as keyof FormPassword]?.value}
                            onValueChange={(value: string) => handleChangeInput(value, key as keyof FormPassword)}
                            endContent={renderEndContend(key, form[key as keyof FormPassword].type)}
                            errorMessage={form[key as keyof FormPassword].errorMessage}
                            isInvalid={!!form[key as keyof FormPassword].errorMessage}
                            onKeyDown={(event) => event.key === "Enter" && onSubmit()}
                        />
                    ) 
                )}

                <div className={`justify-end gap-4 items-center mt-4 ${visible ? 'flex' : 'hidden'}`}>
                    <Button
                        radius="sm"
                        color="danger"
                        className="min-h-max h-8"
                        onPress={() => setVisible(!visible)}
                    >
                        Hủy
                    </Button>
                    <Button
                        radius="sm"
                        className="bg-blue-600 text-light min-h-max h-8"
                        onPress={onSubmit}
                    >
                        Lưu
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default PasswordChange;
