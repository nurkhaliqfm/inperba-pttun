function ErrorPage() {
	return (
		<div className="relative bg-black flex flex-col  items-center justify-center h-screen w-screen overflow-hidden">
			<div className="flex w-[404px] divide-x divide-white text-white">
				<span className="pr-4 text-4xl font-medium">404</span>
				<span className="pl-4 text-lg flex-1 leading-10">
					Halaman tidak dapat ditemukan.
				</span>
			</div>
		</div>
	);
}

export default ErrorPage;
