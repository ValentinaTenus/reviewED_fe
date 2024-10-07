import React, { useRef } from "react";

import { BreadCrumb } from "~/common/components";
import { AppRoute } from "~/common/enums";
import { useGetCompanyByIdQuery } from "~/redux/companies/companies-api";
import { useGetCoursesByFilterQuery } from "~/redux/courses/courses-api";
import { useGetReviewsByCompanyIdQuery } from "~/redux/reviews/reviews-companies-api";

import { About } from "./components/about/about";
import { Contacts } from "./components/contacts/contacts";
import { Courses } from "./components/courses/courses";
import { Menu } from "./components/menu/menu";
import { Reviews } from "./components/reviews/reviews";
import { TitleLogo } from "./components/title-logo/title-logo";
import styles from "./styles.module.scss";

const CompanyDetails: React.FC<{ companyId: string }> = ({ companyId }) => {
	const { data: company } = useGetCompanyByIdQuery(companyId);

	const filters = {
		category_by_id: [""],
		city: [""],
		company_id: companyId,
		limit: 0,
		offset: 0,
		sort: "",
		subcategory_by_id: [""],
		title: "",
	};

	const { data: coursesResponse } = useGetCoursesByFilterQuery(filters);

	const contactsRef = useRef(null);
	const aboutRef = useRef(null);
	const coursesRef = useRef(null);
	const reviewsRef = useRef(null);

	const { data: reviews } = useGetReviewsByCompanyIdQuery(companyId);

	const BreadCrumbPaths = [
		{
			label: "Головна сторінка",
			path: AppRoute.ROOT,
		},
		{
			label: "Пошук",
			path: AppRoute.ALL_COMPANIES,
		},
		{
			label: `${company?.name}`,
		},
	];

	if (company && coursesResponse?.results) {
		return (
			<div className={styles["company-details_container"]}>
				<div className={styles["breadcrumb"]}>
					<BreadCrumb items={BreadCrumbPaths} />
				</div>
				<TitleLogo company={company} />
				<Menu
					aboutRef={aboutRef}
					contactsRef={contactsRef}
					coursesRef={coursesRef}
					reviewsRef={reviewsRef}
				/>
				<Contacts company={company} ref={contactsRef} />
				<About company={company} ref={aboutRef} />
				<Courses
					company={company}
					courses={coursesResponse.results}
					ref={coursesRef}
				/>
				<Reviews company={company} ref={reviewsRef} reviews={reviews} />
			</div>
		);
	}
};

export { CompanyDetails };
