import clsx from "clsx";
import React from "react";

import UserAvatar from "~/assets/images/user.svg?react";

import styles from "./styles.module.scss";

type AvatarGroupProps = {
	avatars: string[];
	className?: string;
};

const MAX_AVATARS_DISPLAY = 4;
const INDEX_ZERO = 0;

const AvatarGroup: React.FC<AvatarGroupProps> = ({ avatars, className }) => {
	const displayedAvatars = avatars
		.map((avatar) =>
			avatar.startsWith("http://127.0.0.1:8000/") ? UserAvatar : avatar,
		)
		.slice(INDEX_ZERO, MAX_AVATARS_DISPLAY);

	return (
		<div className={clsx(styles["avatar-group"], className)}>
			<div className={styles["avatar-group__images"]}>
				{displayedAvatars.map((avatar, index) =>
					typeof avatar === "string" ? (
						<img
							alt="User avatar"
							className={clsx(styles["avatar-group__image"], {
								[styles[`avatar-group__image--${index}`]]: true,
							})}
							key={index}
							src={avatar}
						/>
					) : (
						<div
							className={clsx(
								styles["avatar-group__image"],
								styles[`avatar-group__image--${index}`],
								styles[`avatar-group__image-default`],
							)}
							key={index}
						>
							<UserAvatar
								className={styles["avatar-group__image-default-svg"]}
							/>
						</div>
					),
				)}
			</div>
		</div>
	);
};

export { AvatarGroup };
