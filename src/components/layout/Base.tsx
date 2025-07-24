import { Outlet } from "react-router-dom";

const BaseLayout = () => {
	return (
		<main className="flex min-h-screen">
			<div className="flex flex-col flex-1 lg:ml-0 overflow-x-hidden">
				<div className="flex-1 mx-4 my-6">
					<Outlet />
				</div>
			</div>
		</main>
	);
};

export default BaseLayout;
