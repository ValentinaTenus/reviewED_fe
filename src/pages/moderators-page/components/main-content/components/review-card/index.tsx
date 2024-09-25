import React from "react";

import { ModerationReviews } from "~/common/types/review/index";

type ReviewModeratorsCardProps = {
	review: ModerationReviews;
};

const ReviewModeratorsCard: React.FC<ReviewModeratorsCardProps> = ({
	review,
}) => {
	return <div>email: {review.email}</div>;
};

export { ReviewModeratorsCard };
