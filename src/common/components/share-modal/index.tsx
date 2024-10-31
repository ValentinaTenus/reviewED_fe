import React, { useCallback, useRef } from "react";

import { Button, Icon } from "~/common/components/index";
import { Modal } from "~/common/components/modal";
import { shareUrls } from "~/common/constants/share-urls";
import { ButtonVariant, IconName } from "~/common/enums/index";
import { useGetShareableLinkQuery } from "~/redux/reviews/reviews-api";

import styles from "./styles.module.scss";

const sharePlatforms = [
	{
		icon: IconName.LINKEDIN,
		name: "linkedin",
		variant: ButtonVariant.SHARE_LINKEDIN,
	},
	{
		icon: IconName.FACEBOOK,
		name: "facebook",
		variant: ButtonVariant.SHARE_FACEBOOK,
	},
	{ icon: IconName.XRP, name: "x", variant: ButtonVariant.SHARE_TWITTER },
];

type ShareModalProps = {
	isOpen: boolean;
	onClose: () => void;
	reviewId: number;
	reviewType: "company" | "course";
};

const ShareModal: React.FC<ShareModalProps> = ({
	isOpen,
	onClose,
	reviewId,
	reviewType,
}) => {
	const linkTextRef = useRef<HTMLSpanElement>(null);

	const handleCloseReviewModal = useCallback(() => {
		onClose();
	}, [onClose]);

	const handleCopy = useCallback(() => {
		if (linkTextRef.current) {
			navigator.clipboard.writeText(linkTextRef.current.innerText);
		}
	}, []);

	const { data: shareableLinkData } = useGetShareableLinkQuery({
		id: reviewId,
		review_type: reviewType,
	});

	const generateShareLink = (
		platform: keyof typeof shareUrls,
		shareableLink: string | undefined,
	) => {
		if (shareableLink) {
			const encodedLink = encodeURIComponent(shareableLink);
			return shareUrls[platform] + encodedLink;
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
					{sharePlatforms.map(({ icon, name, variant }) => (
						<Button key={name} variant={variant}>
							<a
								className={styles["button"]}
								href={generateShareLink(
									name as keyof typeof shareUrls,
									shareableLinkData?.shareable_link,
								)}
								rel="noreferrer"
								target="_blank"
							>
								<Icon className={styles.icon} name={icon} />
								Поділитися
							</a>
						</Button>
					))}
				</div>
			</div>
		</Modal>
	);
};

export { ShareModal };
