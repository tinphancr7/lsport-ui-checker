import { toast } from "react-toastify";

type ToastType = 'info' | 'success' | 'warning' | 'error';

function NotifyMessage(title: string, type: ToastType) {
	return toast[type](title, {
		position: "top-right",
		autoClose: 2000,
	});
}

export default NotifyMessage;
