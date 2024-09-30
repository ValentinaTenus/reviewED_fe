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

const INDEX_ONE = 1;

const useReviewModerationApi = (filters: Params) => {
	const {
		data: moderatorsReviewById,
		error: errorById,
		isFetching: isFetchingById,
	} = useGetReviewsModerationByIdQuery(
		{
			id: filters.id,
			type: filters.type,
		},
		{
			refetchOnMountOrArgChange: true,
		},
	);
	const {
		data: filteredModeratorsReviews,
		error: errorByFilter,
		isFetching: isFetchingByFilter,
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
	if (filters.id) {
		return {
			error: errorById,
			isFetching: isFetchingById,
			reviews: moderatorsReviewById
				? {
						count: INDEX_ONE,
						next: null,
						previous: null,
						results: [moderatorsReviewById],
					}
				: undefined,
		};
	} else {
		return {
			error: errorByFilter,
			isFetching: isFetchingByFilter,
			reviews: filteredModeratorsReviews,
		};
	}
};
export default useReviewModerationApi;
