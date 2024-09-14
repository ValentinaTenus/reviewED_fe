import React, { useCallback, useState } from "react";

import { type Company, type Course } from "~/common/types/index";

import { NotFound, SearchElement } from "./components/index";
import styles from "./styles.module.scss";

const LENGTH_ZERO = 0;

const SearchBlock: React.FC = () => {
	const [searchResult, setSearchResult] = useState<Company[] | Course[]>([]);
	const [hasSearched, setHasSearched] = useState(false);

	const handleSearch = useCallback((searchResult: Company[] | Course[]) => {
		setSearchResult(searchResult);
		setHasSearched(true);
	}, []);

	return (
		<div className={styles["search_block"]}>
			<SearchElement onSearch={handleSearch} />
			{searchResult.length === LENGTH_ZERO && hasSearched && <NotFound />}
		</div>
	);
};

export { SearchBlock };
