import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import styles from "./styles.module.scss";

const AuthSuccess: React.FC = () => {
	const { code } = useParams();

	useEffect(() => {
		if (code) {
			// console.log(code, "code");
		}
	}, [code]);

	return <div className={styles["auth_page"]} />;
};

export { AuthSuccess };
