function ForbiddenPage() {
	return (
		<div className="flex flex-col bg-black text-white  items-center justify-center h-screen w-screen overflow-hidden">
			<div className="flex justify-center items-center w-[404px] divide-x">
				<p className="pr-4 text-4xl font-medium">403</p>
			</div>
			<p>Maaf, Anda tidak memiliki akses untuk membuka halaman ini.</p>
		</div>
	);
}

export default ForbiddenPage;
