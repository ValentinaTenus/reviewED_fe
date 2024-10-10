import React from "react";

import Image from "~/assets/images/review_profile_pic.png";
import { Icon, StarRating } from "~/common/components";
import { IconName } from "~/common/enums";

import styles from "./styles.module.scss";

type ReviewHeaderProperties = {
	date: string;
	name: string;
	rating: number;
	role: string;
};

const ReviewHeader: React.FC<ReviewHeaderProperties> = ({
	date,
	name,
	rating,
	role,
}) => {
	return (
		<div className={styles["review__header"]}>
			<aside className={styles["review__user-block"]}>
				<img alt="" className={styles["review__user-picture"]} src={Image} />
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
					Верифіковано через LinkedIn
				</p>
			</section>
			<section className={styles["review__rating-block"]}>
				<p className={styles["review__date"]}>{date}</p>
				<StarRating averageRating={rating} isNumberShown={false} />
			</section>
		</div>
	);
};

export { ReviewHeader };
