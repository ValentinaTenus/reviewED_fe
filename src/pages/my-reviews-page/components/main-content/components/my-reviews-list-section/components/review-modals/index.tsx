import React from "react";

import { ShareModal } from "~/common/components";
import { MyReview, MyReviewCategory } from "~/common/types/my-reviews";

import { ContactModal, DeleteReviewModal, EditReviewModal } from "../";

type ReviewModalsProps = {
	category: MyReviewCategory;
	closeModal: () => void;
	currentModal: string;
	openModal: (currentModal: string, entityId: number) => void;
	review: MyReview;
};

const ReviewModals: React.FC<ReviewModalsProps> = ({
	category,
	closeModal,
	currentModal,
	openModal,
	review,
}) => {
	return (
		<>
			{currentModal === "editModal" && (
				<EditReviewModal
					category={category}
					closeModal={closeModal}
					openModal={openModal}
					review={review}
				/>
			)}

			{currentModal === "deleteModal" && (
				<DeleteReviewModal
					category={category}
					closeModal={closeModal}
					reviewId={review.id}
				/>
			)}

			{currentModal === "shareModal" && (
				<ShareModal
					isOpen
					onClose={closeModal}
					reviewId={review.id}
					reviewType={category}
				/>
			)}

			{currentModal === "contactModal" && (
				<ContactModal closeModal={closeModal} />
			)}
		</>
	);
};

export { ReviewModals };
