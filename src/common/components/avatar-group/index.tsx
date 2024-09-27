import clsx from "clsx";
import React, { useEffect, useState } from "react";

import User1 from "~/assets/images/user1.png";
import User2 from "~/assets/images/user2.png";
import User3 from "~/assets/images/user3.png";
import User4 from "~/assets/images/user4.png";

import styles from "./styles.module.scss";

type AvatarGroupProps = {
	avatars: string[];
	className?: string;
};

const DEFAULT_AVATARS = [User1, User2, User3, User4];
const ZERO = 0;
const MAX_AVATARS_DISPLAY = 4;

const AvatarGroup: React.FC<AvatarGroupProps> = ({ avatars }) => {
	const [randomAvatars, setRandomAvatars] = useState<string[]>([]);

	useEffect(() => {
		const shuffleArray = (array: string[]) => {
			return array
				.map((value) => ({ sort: Math.random(), value }))
				.sort((a, b) => a.sort - b.sort)
				.map(({ value }) => value);
		};

		const processedAvatars = avatars.map((avatar) =>
			avatar && avatar.startsWith("http") && !avatar.includes("127.0.0.1")
				? avatar
				: DEFAULT_AVATARS[Math.floor(Math.random() * DEFAULT_AVATARS.length)],
		);

		const shuffledAvatars = shuffleArray(processedAvatars).slice(
			ZERO,
			MAX_AVATARS_DISPLAY,
		);
		setRandomAvatars(shuffledAvatars);
	}, [avatars]);

	return (
		<div className={clsx(styles["avatar-group"])}>
			<div className={styles["avatar-group__images"]}>
				{randomAvatars.map((avatar, index) => (
					<img
						alt={`User avatar ${index}`}
						className={clsx(styles["avatar-group__image"], {
							[styles[`avatar-group__image--${index++}`]]: true,
						})}
						key={index}
						src={avatar}
					/>
				))}
			</div>
		</div>
	);
};

export default AvatarGroup;
