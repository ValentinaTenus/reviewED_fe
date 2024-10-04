import React, { useState } from "react";

import { Footer, Header } from "~/common/components/index";
import { PrivacyPolicyModal } from "~/common/components/privacy-policy-modal";

import { MainContent } from "./components/index";
import styles from "./styles.module.scss";

const HomePage: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className={styles["home_page"]}>
			<Header />
			{isOpen && <PrivacyPolicyModal isOpen onClose={() => setIsOpen(false)} />}
			<MainContent />
			<Footer />
		</div>
	);
};

export { HomePage };
