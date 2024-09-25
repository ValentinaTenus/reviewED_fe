const authApiPath = {
	LINKEDIN_CALLBACK:
		"https://reviewed-api.azurewebsites.net/api/v1/auth/linkedin/callback",
	LOGIN: "https://reviewed-api.azurewebsites.net/api/v1/auth/linkedin/login",
	LOGOUT: "https://reviewed-api.azurewebsites.net/api/v1/auth/logout",
	REFRESH_TOKEN: "/auth/linkedin/refresh",
} as const;

export { authApiPath };
