import clsx from "clsx";
import React from "react";

import styles from "./styles.module.scss";

type Properties = {
	checked?: boolean;
	className?: string;
	label: string;
	name: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox: React.FC<Properties> = ({
	checked,
	className,
	label,
	name,
	onChange,
}: Properties) => {
	return (
		<label className={clsx(styles["container"], className)}>
			<div className={styles.checkmark_container}>
				<input
					checked={checked}
					className={styles["checkbox"]}
					name={name}
					onChange={onChange}
					type="checkbox"
				/>
				<svg
					className={styles["checkmark"]}
					fill="none"
					height="100%"
					viewBox="0 0 10 8"
					width="100%"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M10 1.18333L8.825 0L3.33333 5.49167L1.18333 3.35L0 4.525L3.33333 7.85L10 1.18333Z"
						fill="currentColor"
					/>
				</svg>
			</div>
			<span className={styles.text}>{label}</span>
		</label>
	);
};

export { Checkbox };
