import React from "react";

import { Footer, Header } from "~/common/components/index";

import { MainModeratorsContent } from "./componets/index";

const ModeratorsPage: React.FC = () => {
	return (
		<div>
			<Header />
			<MainModeratorsContent />
			<Footer />
		</div>
	);
};

export { ModeratorsPage };
