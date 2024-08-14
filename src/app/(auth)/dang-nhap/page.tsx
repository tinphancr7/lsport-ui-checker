import FormLogin from "../components/formLogin";

function Login() {
	return (
		<div className="px-[20%] py-[20%] max-md:px-[10%] max-md:py-[10%] h-full flex flex-col justify-center">
			<h1 className="max-md:text-2xl pl-6 font-medium text-5xl leading-tight relative after:absolute after:left-0 after:top-0 after:bottom-0 after:w-2 after:bg-primary after:rounded-full">
				Đăng nhập
			</h1>

			<FormLogin />
		</div>
	);
}

export default Login;
