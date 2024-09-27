import clsx from "clsx";
import React, { useEffect, useState } from "react";

import user1 from "../../../assets/images/user1.png";
import user2 from "../../../assets/images/user2.png";
import user3 from "../../../assets/images/user3.png";
import user4 from "../../../assets/images/user4.png";
import styles from "./styles.module.scss";

type AvatarGroupProps = {
	avatars: string[];
	className?: string;
};

const defaultAvatars = [user1, user2, user3, user4];

const ZERO = 0;
const MAX_AVATARS_DISPLAY = 4;

const AvatarGroup: React.FC<AvatarGroupProps> = ({ avatars }) => {
	const [randomAvatars, setRandomAvatars] = useState<string[]>([]);

	useEffect(() => {
		// Функція для перемішування масиву зображень
		const shuffleArray = (array: string[]) => {
			return array
				.map((value) => ({ sort: Math.random(), value }))
				.sort((a, b) => a.sort - b.sort)
				.map(({ value }) => value);
		};

		const shuffledAvatars = shuffleArray(avatars).slice(
			ZERO,
			MAX_AVATARS_DISPLAY,
		);
		setRandomAvatars(shuffledAvatars);
	}, [avatars]);

	return (
		<div className={styles["avatar-group"]}>
			<div className={styles["avatar-group__images"]}>
				{randomAvatars.map((avatar, index) => (
					<img
						alt={`User avatar ${index++}`}
						className={clsx(styles["avatar-group__image"], {
							[styles[`avatar-group__image--${index++}`]]: true,
						})}
						key={index}
						src={avatar || defaultAvatars[index]}
					/>
				))}
			</div>
		</div>
	);
};

export default AvatarGroup;
