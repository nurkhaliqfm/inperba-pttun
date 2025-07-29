import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getListPerkaraPagination } from "../service/perkaraService";
import type { PerkaraResponse } from "../types/perkara.type";
import { Button } from "@heroui/react";
import { HiOutlinePlus } from "react-icons/hi2";
import { PerkaraTable } from "../components/PerkaraTable";
import AppRoutes from "@/router/routes";

const DashboardAdminPage = () => {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const page = searchParams.get("page") || "1";
	const keyword = searchParams.get("keyword") || "";
	const limit = searchParams.get("limit") || "5";

	const [perkaraData, setPerkaraData] = useState<PerkaraResponse | null>(null);

	useEffect(() => {
		getListPerkaraPagination({
			page: page,
			keyword: keyword,
			limit: limit,
			onDone: (data) => {
				setPerkaraData(data);
			},
		});
	}, [page, keyword, limit]);

	return (
		<main>
			{perkaraData ? (
				<>
					<section className="flex justify-between my-2 py-4 pb-0 capitalize">
						<h3 className="capitalize text-xl font-light text-public-secondary">
							Data Perkara PTTUN Makassar
						</h3>
						<Button
							onPress={() => navigate(AppRoutes.AdminCreatePerkara.path)}
							startContent={<HiOutlinePlus />}
							size="sm"
							color="success"
							variant="solid"
							className="capitalize">{`Perkara Baru`}</Button>
					</section>
					<PerkaraTable
						data={perkaraData}
						page={Number(page)}
						keyword={keyword}
						limit={limit}
						setSearchParams={setSearchParams}
					/>
				</>
			) : (
				<div className="border-1 text-public-secondary border-public-secondary p-2 rounded-lg text-center shadow-md m-4">
					Data anggota tidak ditemukan
				</div>
			)}
		</main>
	);
};

export default DashboardAdminPage;
