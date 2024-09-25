const authApiPath = {
	LINKEDIN_CALLBACK: "/auth/linkedin/callback",
	LOGIN: "https://reviewed-api.azurewebsites.net/api/v1/auth/linkedin/login",
	LOGOUT: "/auth/logout",
	REFRESH_TOKEN: "/auth/linkedin/refresh",
} as const;

export { authApiPath };
