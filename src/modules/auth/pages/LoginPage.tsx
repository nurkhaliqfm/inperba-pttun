import { LoginForm } from "../components/LoginForm";

function LoginPage() {
	return (
		<div className="flex min-h-svh flex-col items-center justify-center bg-public-primary bg-[url('/background.svg')] bg-cover bg-center bg-no-repeat p-6 md:p-10">
			<div className="w-full max-w-sm md:max-w-3xl">
				<LoginForm />
			</div>
		</div>
	);
}

export default LoginPage;
