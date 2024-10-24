import React from "react";

import Image from "~/assets/images/review_profile_pic.png";
import { Icon, StarRating } from "~/common/components";
import { IconName } from "~/common/enums";
import { useTransformDate } from "~/common/hooks";

import styles from "./styles.module.scss";

type ReviewHeaderProperties = {
	avatar?: string;
	date: string;
	name: string;
	rating: number;
	role: string;
};

const ReviewHeader: React.FC<ReviewHeaderProperties> = ({
	avatar,
	date,
	name,
	rating,
	role,
}) => {
	const { formattedDate } = useTransformDate(date);
	return (
		<div className={styles["review__header"]}>
			<aside className={styles["review__user-block"]}>
				<img
					alt="Course company logo"
					className={styles["review__user-picture"]}
					src={avatar ? avatar : Image}
				/>
				<div className={styles["review__name-block"]}>
					<p className={styles["review__user-name"]}>{name}</p>
					<p className={styles["review__user-role"]}>{role}</p>
				</div>
			</aside>
			<section className={styles["review__verification-block"]}>
				<Icon
					className={styles["review__verification-icon"]}
					name={IconName.SHIELD_TICK}
				/>
				<p className={styles["review__verification-text"]}>
					Verified Via LinkedIn
				</p>
			</section>
			<section className={styles["review__rating-block"]}>
				<p className={styles["review__date"]}>
					{formattedDate.replace(/\s+/g, "")}
				</p>
				<StarRating averageRating={rating} isNumberShown={false} />
			</section>
		</div>
	);
};

export { ReviewHeader };
