import React from "react";

import { Icon } from "~/common/components/index";
import { IconName } from "~/common/enums/index";

import styles from "./styles.module.scss";

type Properties = {
	handleClickEdit?: (reviewId: number) => void;
	likesCount: number;
	reviewId?: number;
	withEditIcon?: boolean;
};

const IconsSection: React.FC<Properties> = ({
	handleClickEdit,
	likesCount,
	reviewId,
	withEditIcon = false,
}) => {
	return (
		<div className={styles["icons"]}>
			<div
				className={styles["icons__left"]}
				onClick={
					handleClickEdit
						? () => handleClickEdit(reviewId as number)
						: undefined
				}
			>
				{withEditIcon && (
					<div>
						<Icon name={IconName.EDIT} /> <span>Edit</span>
					</div>
				)}
			</div>
			<div className={styles["icons__right"]}>
				<div>
					<Icon name={IconName.SHARE} /> <span>Share</span>
				</div>
				<div>
					<Icon className="like-icon" name={IconName.LIKE} />
					<span>{likesCount}</span>
				</div>
			</div>
		</div>
	);
};

export { IconsSection };
