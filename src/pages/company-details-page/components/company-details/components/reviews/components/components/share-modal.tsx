import React, { useCallback } from "react";

import { Button, Icon } from "~/common/components/index";
import { Modal } from "~/common/components/modal";
import { ButtonVariant, IconName } from "~/common/enums/index";
import { Review } from "~/common/types";
import globalStyles from "~/pages/company-details-page/components/company-details/styles.module.scss";
import { useGetShareableLinkQuery } from "~/redux/reviews/reviews-api";

import styles from "./styles.module.scss";

const ShareModal: React.FC<{
	isOpen: boolean;
	onClose: () => void;
	review: Review;
}> = ({ isOpen, onClose, review }) => {
	const FACEBOOK_SHARE_URL = import.meta.env.VITE_FACEBOOK_SHARE_URL;
	const LINKEDIN_SHARE_URL = import.meta.env.VITE_LINKEDIN_SHARE_URL;
	const X_SHARE_URL = import.meta.env.VITE_X_SHARE_URL;

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
		review_type: "company",
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
						<span className={globalStyles["body-r"]} id="linkText">
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
							href={generateShareLink(
								"linkedin",
								shareableLinkData?.shareable_link,
							)}
							rel="noopener noreferrer"
							target="_blank"
						>
							<Icon className={styles["icon"]} name={IconName.LINKEDIN} />
							Поділитися
						</a>
					</Button>
					<Button variant={ButtonVariant.SHARE_FACEBOOK}>
						<a
							className={styles["button"]}
							href={generateShareLink(
								"facebook",
								shareableLinkData?.shareable_link,
							)}
							rel="noopener noreferrer"
							target="_blank"
						>
							<Icon className={styles["icon"]} name={IconName.FACEBOOK} />
							Поділитися
						</a>
					</Button>
					<Button variant={ButtonVariant.SHARE_TWITTER}>
						<a
							className={styles["button"]}
							href={generateShareLink("x", shareableLinkData?.shareable_link)}
							rel="noopener noreferrer"
							target="_blank"
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
