"use client";

import {updateAvatar} from "@/apis/user.api";
import UploadAvatar from "@/components/uploadAvatar";
import {URL_IMAGE} from "@/configs/minio";
import {useAuthStore} from "@/stores/useAuthStore";
import NotifyMessage from "@/utils/notify";
import {useState} from "react";

function NavbarProfile() {
	const {user, setAvatar} = useAuthStore();
	const [avatarUser, setAvatarUser] = useState<any>(null);

	const handleChangeAvatar = async (value: File) => {
		setAvatarUser(value);

		if (value) {
			try {
				const formData = new FormData();
				formData.append("file", value);

				const {data} = await updateAvatar(formData);

				if (data?.status === 1) {
					NotifyMessage("Cập nhật ảnh đại diện thành công!", "success");
					setAvatar(data?.user?.avatar);
				}
			} catch (error) {
				console.log("error");
				NotifyMessage("Cập nhật ảnh đại diện thất bại!", "error");
			}
		}
	};

	return (
		<div className="bg-light p-3 rounded-lg flex items-center gap-x-4">
			<UploadAvatar
				file={avatarUser}
				src={user?.avatar ? `${URL_IMAGE}/${user?.avatar}` : ""}
				setFile={handleChangeAvatar}
			/>

			<div className="flex-1">
				<p className="font-bold uppercase text-lg max-md:text-base mb-1">
					{user?.username}
				</p>
				<div className="flex items-center gap-x-20 max-md:justify-between max-md:gap-x-2 max-md:flex-wrap max-md:text-sm">
					<div>
						Bài viết: <span className="text-primary font-medium">0</span>
					</div>
					<div>
						Người theo dõi: <span className="text-primary font-medium">0</span>
					</div>
					<div>
						Thích: <span className="text-primary font-medium">0</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default NavbarProfile;
