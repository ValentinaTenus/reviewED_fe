import React from "react";

import { CategoriesSection } from "./components/categories-list";
import { DescriptionSection } from "./components/description-section";
import { Header } from "./components/header";
import { PricingBar } from "./components/pricing-bar";
import { SkillsList } from "./components/skills-list";
import { TargetGroupSection } from "./components/target-group-section";
import styles from "./styles.module.scss";

const MainContent: React.FC = () => {
	return (
		<div className={styles["main_content_wrapper"]}>
			<div className={styles["main_content"]}>
				<Header />
				<PricingBar />
				<TargetGroupSection />
				<DescriptionSection />
				<SkillsList />
				<CategoriesSection />
			</div>
		</div>
	);
};

export { MainContent };
