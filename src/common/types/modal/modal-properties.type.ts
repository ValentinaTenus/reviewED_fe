import { type ReactNode } from "react";

import { type ModalVariant } from "~/common/enums/index";

type ModalProperties = {
	children: ReactNode;
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	variant: ModalVariant;
};

export { type ModalProperties };
