import { PasswordChangeRequest } from "@/interfaces/passwordChangeRequest";
import http from "@/utils/http";

const userApi = {
    async passwordChange(data: PasswordChangeRequest) {
        return http.put('/users/password', data)
    },

    async updateAvatar(data: FormData) {
        return http.put('/users/avatar', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
		})
    },
}

export const { passwordChange, updateAvatar } = userApi;