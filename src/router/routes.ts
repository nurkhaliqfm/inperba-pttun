const AppRoutes = {
	//NOTE: Admin Route
	AdminDashboard: {
		path: "/admin/dashboard",
		label: "Dashboard Admin | INFO PUTUS PTTUN Makassar",
	},
	AdminCreatePerkara: {
		path: "/admin/create-perkara",
		label: "Buat Informasi Perkara | INFO PUTUS PTTUN Makassar",
	},
	AdminEditPerkara: {
		path: "/admin/edit-perkara/:perkara",
		label: "Edit Informasi Perkara | INFO PUTUS PTTUN Makassar",
	},

	// NOTE: Public Route
	PublicHome: {
		path: "/",
		label: "Informasi Perkara Banding PTTUN Makassar",
	},
	PublicValidateTokenHome: {
		path: "/validate-token",
		label: "Informasi Perkara Banding PTTUN Makassar",
	},
	PublicPerkara: {
		path: "/info-perkara-banding",
		label: "Perkara Banding | INFO PUTUS PTTUN Makassar",
	},

	// NOTE: Others Route
	Login: { path: "/login", lable: "Login Page | INFO PUTUS PTTUN Makassar" },
	Error: { path: "/error", label: "Error Page | INFO PUTUS PTTUN Makassar" },
	Forbidden: {
		path: "/forbidden",
		label: "Forbidden Page | INFO PUTUS PTTUN Makassar",
	},
};

export default AppRoutes;
