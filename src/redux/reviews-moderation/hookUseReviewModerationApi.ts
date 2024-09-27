import { GetModerationReviewsRequest } from "~/common/types";

import {
	useGetReviewsModerationByFilterQuery,
	useGetReviewsModerationByIdQuery,
} from "./reviews-moderation-api";

type Params = {
	id: string;
	ordering: GetModerationReviewsRequest["ordering"];
	status: GetModerationReviewsRequest["status"];
	type: GetModerationReviewsRequest["type"];
};
const useReviewModerationApi = (filters: Params) => {
	if (filters.id) {
		const {
			data: moderatorsReviewById,
			error,
			isFetching,
		} = useGetReviewsModerationByIdQuery(
			{
				id: filters.id,
				type: filters.type,
			},
			{
				refetchOnMountOrArgChange: true,
			},
		);
		return {
			error,
			isFetching,
			reviews: moderatorsReviewById ? [moderatorsReviewById] : undefined,
		};
	} else {
		const {
			data: filteredModeratorsReviews,
			error,
			isFetching,
		} = useGetReviewsModerationByFilterQuery(
			{
				id: filters.id,
				ordering: filters.ordering,
				status: filters.status,
				type: filters.type,
			},
			{
				refetchOnMountOrArgChange: true,
			},
		);
		return { error, isFetching, reviews: filteredModeratorsReviews?.results };
	}
};
export default useReviewModerationApi;
