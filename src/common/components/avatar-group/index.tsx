import clsx from "clsx";
import React from "react";

import styles from "./styles.module.scss";

type AvatarGroupProps = {
	avatars: string[];
	className?: string;
};

const MAX_AVATARS_DISPLAY = 4;
const INDEX_ZERO = 0;

const AvatarGroup: React.FC<AvatarGroupProps> = ({ avatars, className }) => {
	const displayedAvatars = avatars.slice(INDEX_ZERO, MAX_AVATARS_DISPLAY);

	return (
		<div className={clsx(styles["avatar-group"], className)}>
			<div className={styles["avatar-group__images"]}>
				{displayedAvatars.map(
					(avatar, index) =>
						avatar && (
							<img
								alt=""
								className={clsx(styles["avatar-group__image"], {
									[styles[`avatar-group__image--${index}`]]: true,
								})}
								key={index}
								src={avatar}
							/>
						),
				)}
			</div>
		</div>
	);
};

export { AvatarGroup };
