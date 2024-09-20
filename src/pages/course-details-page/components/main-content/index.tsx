import React from "react";

import styles from "./styles.module.scss";
import { Header } from "./components/header";
import { PricingBar } from "./components/pricing-bar";
import { TargetGroupSection } from "./components/target-group-section";
import { DescriptionSection } from "./components/description-section";
import { SkillsList } from "./components/skills-list";
import { CategoriesSection } from "./components/categories-list";

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
