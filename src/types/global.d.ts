export interface ApiError {
	status: number;
	error: string;
}

export interface ApiResponse {
	status: number;
	message: string;
	data?: unknown;
}

export interface TableHeaderComponent {
	name: string;
	slug: string;
}
