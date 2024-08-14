import {Button} from "@nextui-org/react";
import {SlLock} from "react-icons/sl";
import PasswordChange from "./components/PasswordChange";

const ProfilePage = () => {
	return (
		<div className="grid grid-cols-12 items-start gap-5 max-md:flex-col">
			<PasswordChange />

			<div className="max-md:col-span-12 col-span-4 grid grid-cols-12 items-center justify-center bg-light border border-slate-300 py-3 px-5 rounded-md w-full">
				<div className="col-span-2">
					<SlLock size={24} className="text-primary" />
				</div>
				<div className="col-span-7">
					<p className="font-bold">Email</p>
					<p className="text-xs text-gray9E">em*****.com</p>
				</div>
				<Button className="bg-primary text-light col-span-3">Sửa đổi</Button>
			</div>
		</div>
	);
};

export default ProfilePage;
