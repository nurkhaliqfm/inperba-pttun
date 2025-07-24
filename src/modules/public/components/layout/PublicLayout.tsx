import { Outlet } from "react-router-dom";
import PublicHeader from "./PublicHeader";
import PublicFooter from "./PublicFooter";

const PublicLayout = () => {
	return (
		<main className="relative flex flex-col min-h-screen justify-center bg-public-primary bg-[url('/background.svg')] bg-cover bg-center bg-no-repeat">
			<div className="flex-1 flex flex-col items-center px-4 max-w-6xl w-full mx-auto">
				<PublicHeader />
				<div className="flex-1 w-full overflow-y-auto mt-16 py-4">
					<Outlet />
				</div>
				<PublicFooter />
			</div>
		</main>
	);
};

export default PublicLayout;
