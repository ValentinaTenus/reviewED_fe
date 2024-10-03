type SetModerationReviewsStatusRequest = {
	id: string;
	status: "approved" | "rejected";
	type: "company" | "course";
};

type GetModerationReviewsResponse = {
	count: number;
	next: null | string;
	previous: null | string;
	results: ModerationReviews[];
};

type GetModerationReviewsRequest = {
	limit?: number;
	offset?: number;
	ordering?: "-time_added" | "time_added";
	status?: "approved" | "pending" | "rejected";
	type?: "company" | "course";
};

type ModerationReviews = {
	author_email: string;
	author_profile_link: string;
	avg_rating: number;
	id: number;
	logo: string;
	rating: number;
	related_entity_name: string;
	status: string;
	text: string;
	time_added: string;
	type: "company_review" | "course_review";
};

export type {
	GetModerationReviewsRequest,
	GetModerationReviewsResponse,
	ModerationReviews,
	SetModerationReviewsStatusRequest,
};
