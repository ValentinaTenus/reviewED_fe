import { forwardRef } from "react";

import styles from "./styles.module.scss";

const Header = forwardRef<HTMLDivElement, { title: string }>(
	({ title }, ref) => {
		return (
			<div className={styles["header"]} ref={ref}>
				{title}
			</div>
		);
	},
);
Header.displayName = "Header";

export { Header };
