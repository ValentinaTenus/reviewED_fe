import React from "react";

import styles from "./styles.module.scss";
import { StarRating } from "~/common/components";
import Image from "~/assets/images/review_profile_pic.png";
import { Icon } from "~/common/components";
import { IconName } from "~/common/enums";
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
				<img src={Image} alt="" className={styles["review__user-picture"]} />
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
				<p className={styles["review__date"]}>{date}</p>
				<StarRating averageRating={rating} isNumberShown={false} />
			</section>
		</div>
	);
};

export { ReviewHeader };
