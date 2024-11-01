import React, { useState } from "react";

import { Icon, ShareModal } from "~/common/components/index";
import { IconName } from "~/common/enums/index";

import styles from "./styles.module.scss";

type Properties = {
	handleClickEdit?: (reviewId: number) => void;
	likesCount: number;
	reviewId: number;
	reviewType: "company" | "course";
	showEditIcon?: boolean;
};

const ActionIconsPanel: React.FC<Properties> = ({
	handleClickEdit,
	likesCount,
	reviewId,
	reviewType,
	showEditIcon = false,
}) => {
	const [isShareModalOpen, setIsShareModalOpen] = useState(false);

	const handleOpenShareModal = () => {
		setIsShareModalOpen(true);
	};

	const handleCloseShareModal = () => {
		setIsShareModalOpen(false);
	};

	return (
		<div className={styles["action-icons"]}>
			<div
				className={styles["action-icons__left"]}
				onClick={
					handleClickEdit
						? () => handleClickEdit(reviewId as number)
						: undefined
				}
			>
				{showEditIcon && (
					<div>
						<Icon name={IconName.EDIT} /> <span>Редагувати</span>
					</div>
				)}
			</div>
			<div className={styles["action-icons__right"]}>
				<div onClick={handleOpenShareModal}>
					<Icon name={IconName.SHARE} /> <span>Поділитися</span>
				</div>
				<div>
					<Icon className="like-icon" name={IconName.LIKEOUTLINE} />
					<span className={styles["like-count"]}>{likesCount}</span>
				</div>
			</div>

			<ShareModal
				isOpen={isShareModalOpen}
				onClose={handleCloseShareModal}
				reviewId={reviewId}
				reviewType={reviewType}
			/>
		</div>
	);
};

export { ActionIconsPanel };
