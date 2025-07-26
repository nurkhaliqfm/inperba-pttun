export interface OAuthData {
	expires_in: number;
	access_token: string;
	name: string;
	role: string;
}

export interface SetTokenAction {
	type: "oauth/setToken";
	payload: {
		expires_in: number;
		access_token: string;
		name: string;
		role: string;
	};
}

export interface ClearTokenAction {
	type: "oauth/clearToken";
}

export type AuthActionTypes = SetTokenAction | ClearTokenAction;
