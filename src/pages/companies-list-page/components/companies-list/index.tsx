import React, { useCallback, useEffect, useState } from "react";

import { Pagination } from "~/common/components/index";
import { ViewStyle } from "~/common/enums/index";
import { Category, Company } from "~/common/types/index";
import { useGetCategoriesQuery } from "~/redux/categories/categories-api";
import { useGetCompaniesByFilterQuery } from "~/redux/companies/companies-api";

import { FilteredCompaniesList, FilterSection } from "./components/index";
import styles from "./styles.module.scss";
import { ScreenBreakpoints } from "~/common/constants";

const DEFAULT_SCREEN_WIDTH = 0;
const ALL_CATEGORIES_ID = 0;
const DEFAULT_PAGE_NUMBER = 0;
const DEFAULT_COMPANIES_PER_PAGE = 10;
const DEFAULT_CURRENT_PAGE = 1;

enum TableCompaniesPerPage {
	DESKTOP = 12,
	TABLET = 12,
	MOBILE = 10
};

enum ListCompaniesPerPage {
	DESKTOP = 10,
	TABLET = 5,
	MOBILE = 5
};

const CompaniesContent: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [sortBy, setSortBy] = useState<string>("");
	const [selectedCategoryId, setSelectedCategoryId] =
		useState<number>(ALL_CATEGORIES_ID);

	const [screenWidth, setScreenWidth] = useState<number>(DEFAULT_SCREEN_WIDTH);

	const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);
	const [companiesPerPage, setCompaniesPerPage] = useState(DEFAULT_COMPANIES_PER_PAGE);

	const [viewStyle, setViewStyle] = useState(ViewStyle.TABLE);

	const { data: categories } = useGetCategoriesQuery(undefined);
	const { data: getCompaniesResponse, refetch } = useGetCompaniesByFilterQuery(
		{
			category_by_id:
				selectedCategoryId === ALL_CATEGORIES_ID
					? undefined
					: selectedCategoryId,
			name: searchTerm,
			page: currentPage,
			sort: sortBy,
		},
		{
			refetchOnMountOrArgChange: true,
		},
	);

  const [companies, setCompanies] = useState<Company[]>([]);
	const [pageCount, setPageCount] = useState(0);

	const handleViewChange = useCallback((newViewStyle: ViewStyle) => {
    setViewStyle(newViewStyle);
    setCurrentPage(DEFAULT_CURRENT_PAGE); 
  }, []);

	const updateCompaniesPerPageAndPageCount = useCallback(() => {
    let companiesPerPage;

    if (viewStyle === ViewStyle.TABLE) {
      companiesPerPage =
        screenWidth >= ScreenBreakpoints.TABLET
          ? TableCompaniesPerPage.DESKTOP
          : TableCompaniesPerPage.MOBILE;
    } else {
      companiesPerPage =
        screenWidth >= ScreenBreakpoints.DESKTOP
          ? ListCompaniesPerPage.DESKTOP
          : ListCompaniesPerPage.TABLET;
    }
      
			console.log(companiesPerPage, 'companiesPerPage')
    setCompaniesPerPage(companiesPerPage);

    if (getCompaniesResponse?.count) {
      setPageCount(Math.ceil(getCompaniesResponse.count / companiesPerPage));
    }
  }, [viewStyle, screenWidth, getCompaniesResponse?.count]);

	// const handleViewChange = useCallback((newViewStyle: ViewStyle) => {
	// 	setViewStyle(newViewStyle);

	// 	if (newViewStyle === ViewStyle.TABLE) {
	// 		if(screenWidth === ScreenBreakpoints.DESKTOP || screenWidth === ScreenBreakpoints.TABLET){
	// 			setCompaniesPerPage(TableCompaniesPerPage.DESKTOP);
	// 			setPageCount((getCompaniesResponse?.count || DEFAULT_PAGE_NUMBER) / TableCompaniesPerPage.DESKTOP);
	// 		} else {
	// 			setCompaniesPerPage(TableCompaniesPerPage.MOBILE);
	// 			setPageCount((getCompaniesResponse?.count || DEFAULT_PAGE_NUMBER) / TableCompaniesPerPage.MOBILE);
	// 		}
  //   } else {
	// 		if(screenWidth === ScreenBreakpoints.DESKTOP){
	// 			setPageCount((getCompaniesResponse?.count || DEFAULT_PAGE_NUMBER) / ListCompaniesPerPage.DESKTOP);
	// 		} else {
	// 			setCompaniesPerPage(ListCompaniesPerPage.TABLET);
	// 			setPageCount((getCompaniesResponse?.count || DEFAULT_PAGE_NUMBER) / ListCompaniesPerPage.TABLET);
	// 		}
  //   }
  //   setCurrentPage(DEFAULT_CURRENT_PAGE);
	// }, []);

  // useEffect(() => {
  //   if (getCompaniesResponse?.results) {
  //     let itemsToDisplay = getCompaniesResponse.results;

  //     if (viewStyle === ViewStyle.TABLE && screenWidth === ScreenBreakpoints.DESKTOP ) {
	// 			itemsToDisplay = getCompaniesResponse.results;
  //     } else if (viewStyle === ViewStyle.LIST && itemsToDisplay.length <= LIST_COMPANIES_PER_PAGE) {
       
  //     }

  //     setCompanies(itemsToDisplay);
  //   }
  // }, [getCompaniesResponse, viewStyle]);

	// const howManyPages = Math.ceil(
	// 	(getCompaniesResponse?.count || DEFAULT_PAGE_NUMBER) / companiesPerPage,
	// );

	const allCategories: Category[] = categories
		? [{ id: 0, name: "All", subcategories: [] }, ...categories]
		: [];

	const handleChangeSearchTerm = useCallback((newSearchTerm: string) => {
		setSearchTerm(newSearchTerm);
	}, []);

	const handleChangeSortBy = useCallback((newSortBy: number | string) => {
		setSortBy(newSortBy.toString());
	}, []);

	const handleChooseCategory = useCallback((chosenCategoryId: number) => {
		setSelectedCategoryId(chosenCategoryId);
	}, []);

	const updateScreenWidth = () => {
		const screenWidth = window.innerWidth;
		setScreenWidth(screenWidth);
	};
	

	useEffect(() => {
    updateCompaniesPerPageAndPageCount();
  }, [getCompaniesResponse, viewStyle, screenWidth, updateCompaniesPerPageAndPageCount]);

	useEffect(() => {
		refetch();
	}, [currentPage, refetch]);

	useEffect(() => {
		updateScreenWidth();
		window.addEventListener("resize", updateScreenWidth);

		return () => window.removeEventListener("resize", updateScreenWidth);
	}, []);

	return (
		<div className={styles["companies_list__container"]}>
			{categories && (
				<FilterSection
					categories={allCategories}
					onChangeSearchTerm={handleChangeSearchTerm}
					onChangeSortBy={handleChangeSortBy}
					onChooseCategory={handleChooseCategory}
					screenWidth={screenWidth}
					selectedCategoryId={selectedCategoryId}
				/>
			)}
			{getCompaniesResponse?.results && (
				<FilteredCompaniesList
					companies={getCompaniesResponse.results}
					onChangeSortBy={handleChangeSortBy}
					onChangeViewStyle={handleViewChange}
					viewStyle={viewStyle}
				/>
			)}
			<Pagination pages={pageCount} setCurrentPage={setCurrentPage} />
		</div>
	);
};

export { CompaniesContent };
