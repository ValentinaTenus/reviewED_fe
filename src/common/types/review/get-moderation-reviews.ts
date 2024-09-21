type GetModerationReviews = {
	count: number;
	next: null | string;
	previous: null | string;
	results: ModerationReviews[];
};

type ModerationReviews = {
	avg_rating: number;
	email: string;
	id: number;
	logo_company: string;
	profile_link: string;
	rating: number;
	related_entity_name: string;
	status: string;
	text: string;
	time_added: string;
	type: "company_review" | "course_review";
};

export type { GetModerationReviews, ModerationReviews };
