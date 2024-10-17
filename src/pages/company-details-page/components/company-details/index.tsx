import React, { useEffect, useRef, useState } from "react";

import { BreadCrumb, Spinner } from "~/common/components";
import { AppRoute, SpinnerVariant } from "~/common/enums/index";
import { BreadCrumbType } from "~/common/types";
import { NotFound } from "~/pages/home-page/components/main-content/components/search-block/components";
import { useGetCompanyByIdQuery } from "~/redux/companies/companies-api";
import { useGetCoursesByFilterQuery } from "~/redux/courses/courses-api";
import { useGetReviewsByCompanyIdQuery } from "~/redux/reviews/reviews-companies-api";

import {
	About,
	Contacts,
	Courses,
	Menu,
	Reviews,
	TitleLogo,
} from "./components/index";
import styles from "./styles.module.scss";

const BreadCrumbPaths = [
	{
		label: "Головна сторінка",
		path: AppRoute.ROOT,
	},
	{
		label: "Компанії",
		path: AppRoute.ALL_COMPANIES,
	},
];

type Properties = {
	companyId: string;
};

const CompanyDetails: React.FC<Properties> = ({ companyId }) => {
	const [breadcrumbs, setBreadcrumbs] = useState<BreadCrumbType[]>([]);
	const {
		data: company,
		error,
		isFetching,
	} = useGetCompanyByIdQuery(companyId);

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

	useEffect(() => {
		const companyNameBreadcrumb = {
			label: company?.name ?? "",
		};
		setBreadcrumbs([...BreadCrumbPaths, companyNameBreadcrumb]);
	}, [companyId, company]);

	const contactsRef = useRef(null);
	const aboutRef = useRef(null);
	const coursesRef = useRef(null);
	const reviewsRef = useRef(null);

	const { data: reviews } = useGetReviewsByCompanyIdQuery(companyId);

	if (error && !company) {
		return <NotFound />;
	}

	if (isFetching) {
		return (
			<div className={styles["company-details_spinner"]}>
				<Spinner variant={SpinnerVariant.MEDIUM} />
			</div>
		);
	}

	if (company && coursesResponse?.results) {
		return (
			<div className={styles["company-details_container"]}>
				<BreadCrumb items={breadcrumbs} />
				<div className={styles["company-details"]}>
					<div className={styles["company-details_title"]}>
						<TitleLogo company={company} />
						<Menu
							aboutRef={aboutRef}
							contactsRef={contactsRef}
							coursesRef={coursesRef}
							reviewsRef={reviewsRef}
						/>
					</div>
					<Contacts company={company} ref={contactsRef} />
					<About company={company} ref={aboutRef} />
					<Courses
						company={company}
						courses={coursesResponse.results}
						ref={coursesRef}
					/>
					<Reviews company={company} ref={reviewsRef} reviews={reviews} />
				</div>
			</div>
		);
	}
};

export { CompanyDetails };
