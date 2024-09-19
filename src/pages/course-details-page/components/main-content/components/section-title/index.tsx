import React from "react";

import styles from "./styles.module.scss";

type SectionFileProperties = {
	icon: string;
	title: string;
};
const SectionTitle: React.FC<SectionFileProperties> = ({ icon, title }) => {
	return <div className={styles["main_content"]}>
    <img src={icon}/>
    {title}</div>;
};

export { SectionTitle };
