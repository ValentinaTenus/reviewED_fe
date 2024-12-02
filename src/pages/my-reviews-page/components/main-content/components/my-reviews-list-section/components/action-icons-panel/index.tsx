import React, { useCallback } from "react";

import { Icon } from "~/common/components/index";
import { IconName } from "~/common/enums/index";

import styles from "./styles.module.scss";

type Properties = {
	likesCount: number;
	openModal: (currentModal: string, entityId: number) => void;
	reviewId: number;
	showEditIcon?: boolean;
};

const ActionIconsPanel: React.FC<Properties> = ({
	likesCount,
	openModal,
	reviewId,
	showEditIcon = false,
}) => {
	const handleOpenShareModal = useCallback(() => {
		openModal("shareModal", reviewId);
	}, [openModal, reviewId]);

	const handleOpenEditModal = useCallback(() => {
		openModal("editModal", reviewId);
	}, [openModal, reviewId]);

	return (
		<div className={styles["action-icons"]}>
			<div className={styles["action-icons__left"]}>
				{showEditIcon && (
					<div onClick={handleOpenEditModal}>
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
		</div>
	);
};

export { ActionIconsPanel };
