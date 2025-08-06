import { ResetPasswordForm } from "../components/ResetPasswordForm";

function ResetPasswordPage() {
	return (
		<div className="flex flex-col mt-10 md:mt-14 rounded-2xl bg-public-secondary items-center justify-center bg-muted p-6 md:p-10">
			<div className="w-full max-w-sm md:max-w-3xl ">
				<ResetPasswordForm />
			</div>
		</div>
	);
}

export default ResetPasswordPage;
