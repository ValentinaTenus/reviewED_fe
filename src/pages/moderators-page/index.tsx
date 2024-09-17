import React from "react";

import { Footer, Header } from "~/common/components/index";

import { MainModeratorsPage } from "./componets/index";

const ModeratorsPage: React.FC = () => {
	return (
		<div>
			<Header />
			<MainModeratorsPage />
			<Footer />
		</div>
	);
};

export { ModeratorsPage };
