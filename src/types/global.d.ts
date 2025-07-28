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
	key: string;
	label: string;
}
