const AppRoutes = {
	//NOTE: Admin Route
	AdminDashboard: {
		path: "/admin/dashboard",
		label: "Dashboard Admin | INPERBA PTTUN Makassar",
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
		label: "Perkara Banding | INPERBA PTTUN Makassar",
	},

	// NOTE: Others Route
	Login: { path: "/login", lable: "Login Page | INPERBA PTTUN Makassar" },
	Error: { path: "/error", label: "Error Page | INPERBA PTTUN Makassar" },
	Forbidden: {
		path: "/forbidden",
		label: "Forbidden Page | INPERBA PTTUN Makassar",
	},
};

export default AppRoutes;
