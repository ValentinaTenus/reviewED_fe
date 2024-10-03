import React, { useCallback } from "react";
import { Link } from "react-router-dom";

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
					return `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`;
				case "linkedin":
					return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedLink}`;
				case "x":
					return `https://twitter.com/intent/tweet?url=${encodedLink}`;
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
						<Link
							className={styles["button"]}
							target="_blank"
							to={generateShareLink(
								"linkedin",
								shareableLinkData?.shareable_link,
							)}
						>
							<Icon className={styles["icon"]} name={IconName.LINKEDIN} />
							Поділитися
						</Link>
					</Button>
					<Button variant={ButtonVariant.SHARE_FACEBOOK}>
						<Link
							className={styles["button"]}
							target="_blank"
							to={generateShareLink(
								"facebook",
								shareableLinkData?.shareable_link,
							)}
						>
							<Icon className={styles["icon"]} name={IconName.FACEBOOK} />
							Поділитися
						</Link>
					</Button>
					<Button variant={ButtonVariant.SHARE_TWITTER}>
						<Link
							className={styles["button"]}
							target="_blank"
							to={generateShareLink("x", shareableLinkData?.shareable_link)}
						>
							<Icon className={styles["icon"]} name={IconName.XRP} />
							Поділитися
						</Link>
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export { ShareModal };
