import React from "react";
import { Link } from "react-router-dom";

import { Icon } from "~/common/components/index";
import { type FooterNavigationIconLink } from "~/common/types/index";

import styles from "./styles.module.scss";

type NavigationBlockProperties = {
	header: string;
	links: FooterNavigationIconLink[];
};

const SocialMediaLinks: React.FC<NavigationBlockProperties> = ({
	header,
	links,
}) => {
	return (
		<div className={styles["footer_content__contacts"]}>
			<p className={styles["footer_content__contacts_title"]}>{header}</p>
			<div className={styles["footer_content__contacts_data"]}>
				{links.map((link, index) => (
					<Link
						className={styles["footer_content__contact_link"]}
						key={index}
						to={link.href}
					>
						<Icon
							className={styles["footer_content__contact_icon"]}
							name={link.label}
						/>
					</Link>
				))}
			</div>
		</div>
	);
};

export { SocialMediaLinks };
