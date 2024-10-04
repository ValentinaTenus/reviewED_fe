import React, { useState } from "react";

import { Button, Footer, Header } from "~/common/components/index";
import { PrivacyPolicyModal } from "~/common/components/privacy-policy-modal";
import { ButtonVariant } from "~/common/enums";

import { MainContent } from "./components/index";
import styles from "./styles.module.scss";

const HomePage: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className={styles["home_page"]}>
			<Header />
			<Button
				onClick={() => {
					setIsOpen(true);
				}}
				variant={ButtonVariant.PRIMARY}
			>
				Click
			</Button>
			{isOpen && <PrivacyPolicyModal isOpen onClose={() => setIsOpen(false)} />}
			<MainContent />
			<Footer />
		</div>
	);
};

export { HomePage };
