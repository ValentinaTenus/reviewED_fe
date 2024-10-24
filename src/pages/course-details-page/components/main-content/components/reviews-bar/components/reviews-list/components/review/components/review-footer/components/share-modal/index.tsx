import React, { useCallback } from "react";

import { Button, Icon } from "~/common/components/index";
import { Modal } from "~/common/components/modal";
import { ButtonVariant, IconName } from "~/common/enums/index";
import { Review } from "~/common/types";
import { useGetShareableLinkQuery } from "~/redux/reviews/reviews-api";

import styles from "./styles.module.scss";

const ShareModal: React.FC<{
	isOpen: boolean;
	onClose: () => void;
	review: Review;
}> = ({ isOpen, onClose, review }) => {
	const FACEBOOK_SHARE_URL = import.meta.env.VITE_FACEBOOK_SHARE_URL;
	const LINKEDIN_SHARE_URL = import.meta.env.VITE_LINKEDIN_SHARE_URL;
	const X_SHARE_URL = import.meta.env.VITE_X_UPLOAD_URL;

	const handleCloseReviewModal = useCallback(() => {
		onClose();
	}, [onClose]);

	const handleCopy = useCallback(() => {
		const linkText = document.getElementById("linkText")?.innerText;
		if (linkText) {
			navigator.clipboard.writeText(linkText);
		}
	}, []);

	const { data: shareableLinkData } = useGetShareableLinkQuery({
		id: review.id,
		review_type: "course",
	});

	const generateShareLink = (
		platform: string,
		shareableLink: string | undefined,
	) => {
		if (shareableLink) {
			const encodedLink = encodeURIComponent(shareableLink);
			switch (platform) {
				case "facebook":
					return `${FACEBOOK_SHARE_URL}${encodedLink}`;
				case "linkedin":
					return `${LINKEDIN_SHARE_URL}${encodedLink}`;
				case "x":
					return `${X_SHARE_URL}${encodedLink}`;
				default:
					return "";
			}
		}
		return "";
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={handleCloseReviewModal}
			title="Поділитися відгуком"
		>
			<div className={styles["modal_content"]}>
				<div className={styles["modal_link"]}>
					<div>
						<Icon className={styles["copy-icon"]} name={IconName.COPY} />
						<span className={styles["link-text"]} id="linkText">
							{shareableLinkData?.shareable_link}
						</span>
					</div>
					<span className={styles["copy-span"]} onClick={handleCopy}>
						Copy
					</span>
				</div>
				<div className={styles["modal_buttons"]}>
					<Button variant={ButtonVariant.SHARE_LINKEDIN}>
						<a
							className={styles["button"]}
							target="_blank"
							href={generateShareLink(
								"facebook",
								shareableLinkData?.shareable_link,
							)}
						>
							<Icon className={styles["icon"]} name={IconName.LINKEDIN} />
							Поділитися
						</a>
					</Button>
					<Button variant={ButtonVariant.SHARE_FACEBOOK}>
						<a
							className={styles["button"]}
							target="_blank"
							href={`https://www.facebook.com/sharer/sharer.php?u=${shareableLinkData?.shareable_link}`}
						>
							<Icon className={styles["icon"]} name={IconName.FACEBOOK} />
							Поділитися
						</a>
					</Button>
					<Button variant={ButtonVariant.SHARE_TWITTER}>
						<a
							className={styles["button"]}
							target="_blank"
							href={generateShareLink("x", shareableLinkData?.shareable_link)}
						>
							<Icon className={styles["icon"]} name={IconName.XRP} />
							Поділитися
						</a>
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export { ShareModal };
