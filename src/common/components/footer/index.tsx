import React, { useEffect, useState } from "react";

import Logo from "~/assets/images/logo.svg?react";
import {
	CompaniesLinksDesktop,
	CompaniesLinksSmartphones,
	CompaniesLinksTablets,
	CoursesLinksDesktop,
	CoursesLinksSmartphones,
	CoursesLinksTablets,
	OthersFooterLinks,
	OthersFooterLinksMobile,
	ScreenBreakpoints,
	SocialLinks,
} from "~/common/constants/index";
import { FooterNavigationLink } from "~/common/types/index";

import {
	NavigationBlock,
	SocialMediaLinks,
	TechContactsBlock,
} from "./components/index";
import styles from "./styles.module.scss";

const Footer: React.FC = () => {
	const [companiesLinks, setCompaniesLinks] = useState<FooterNavigationLink[]>(
		CompaniesLinksDesktop,
	);
	const [coursesLinks, setCoursesLinks] =
		useState<FooterNavigationLink[]>(CoursesLinksDesktop);
	const [othersLinks, setOthersLinks] =
		useState<FooterNavigationLink[]>(OthersFooterLinks);

	const updateVisibleItems = () => {
		const screenWidth = window.innerWidth;

		if (screenWidth <= ScreenBreakpoints.SMALL_MOBILE) {
			setOthersLinks(OthersFooterLinksMobile);
		} else if (screenWidth <= ScreenBreakpoints.TABLET) {
			setCompaniesLinks(CompaniesLinksSmartphones);
			setCoursesLinks(CoursesLinksSmartphones);
			setOthersLinks(OthersFooterLinks);
		} else if (screenWidth <= ScreenBreakpoints.DESKTOP) {
			setCompaniesLinks(CompaniesLinksTablets);
			setCoursesLinks(CoursesLinksTablets);
		} else {
			setCompaniesLinks(CompaniesLinksDesktop);
			setCoursesLinks(CoursesLinksDesktop);
		}
	};

	useEffect(() => {
		updateVisibleItems();
		window.addEventListener("resize", updateVisibleItems);

		return () => window.removeEventListener("resize", updateVisibleItems);
	}, []);

	return (
		<div className={styles["footer__container"]}>
			<div className={styles["footer_content__container"]}>
				<div className={styles["footer_content"]}>
					<div className={styles["footer_content__logo_container"]}>
						<Logo className={styles["footer_content__logo"]} />
						<TechContactsBlock />
					</div>

					<NavigationBlock
						className={styles["footer_content__courses"]}
						header="Курси"
						links={coursesLinks}
					/>
					<NavigationBlock
						className={styles["footer_content__companies"]}
						header="Компанії"
						links={companiesLinks}
					/>

					<div className={styles["footer_content__social_media"]}>
						<SocialMediaLinks header="Ми в соц.мережах" links={SocialLinks} />
						<NavigationBlock
							classNameLink={styles["footer_content__small_link"]}
							header="Інше"
							links={othersLinks}
						/>
					</div>
				</div>
				<p className={styles["footer__link"]}>
					© 2024 ReviewED. Всі права захищені
				</p>
			</div>
		</div>
	);
};

export { Footer };
