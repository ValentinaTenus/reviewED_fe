import clsx from "clsx";
import React, { useEffect, useState } from "react";

import styles from "./styles.module.scss";

type AvatarGroupProps = {
	avatars: string[];
	className?: string;
};

const MAX_AVATARS_DISPLAY = 4;
const ZERO_INDEX = 0;
const INDEX_ONE = 1;
const NUMBER_FOR_SORTING = 0.5;

const AvatarGroup: React.FC<AvatarGroupProps> = ({ avatars, className }) => {
	const [randomAvatars, setRandomAvatars] = useState<(null | string)[]>([]);

	useEffect(() => {
		const shuffleArray = (array: (null | string)[]) => {
			return array.sort(() => NUMBER_FOR_SORTING - Math.random());
		};

		const processedAvatars = avatars.map((avatar) =>
			avatar && avatar.startsWith("http") && !avatar.includes("127.0.0.1")
				? avatar
				: null,
		);

		const shuffledAvatars = shuffleArray(processedAvatars).slice(
			ZERO_INDEX,
			MAX_AVATARS_DISPLAY,
		);
		setRandomAvatars(shuffledAvatars);
	}, [avatars]);

	return (
		<div className={clsx(styles["avatar-group"], className)}>
			<div className={styles["avatar-group__images"]}>
				{randomAvatars.map((avatar, index) =>
					avatar ? (
						<img
							alt={`Avatar ${index + INDEX_ONE}`}
							className={clsx(
								styles["avatar-group__image"],
								styles[`avatar-group__image--${index}`],
							)}
							key={index}
							src={avatar}
						/>
					) : (
						<div
							className={clsx(
								styles["avatar-group__image"],
								styles["avatar-group__fallback"],
							)}
							key={index}
						/>
					),
				)}
			</div>
		</div>
	);
};

export { AvatarGroup };
