import React, { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

import { BreadCrumb, Footer, Header } from "~/common/components/index";
import { AppRoute } from "~/common/enums";

import { MainModeratorsContent } from "./components/index";
import styles from "./styles.module.scss";

const DEFAULT_CURRENT_PAGE = 1;

const ModeratorsPage: React.FC = () => {
	const dataContainerRef = useRef<HTMLDivElement>(null);
	const [searchParams] = useSearchParams();
	const currentPage = searchParams.get("page") || DEFAULT_CURRENT_PAGE;

	useEffect(() => {
		if (dataContainerRef.current) {
			dataContainerRef.current.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	}, [currentPage]);

	return (
		<div className={styles["moderators_page"]} ref={dataContainerRef}>
			<Header />
			<BreadCrumb
				className="bread_crumb__container"
				items={[
					{ label: "Головна сторінка", path: AppRoute.ROOT },
					{ label: "Модерація відгуків", path: AppRoute.MODERATORS_PAGE },
				]}
			/>
			<MainModeratorsContent />
			<Footer />
		</div>
	);
};

export { ModeratorsPage };
