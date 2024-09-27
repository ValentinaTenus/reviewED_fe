import { type SyntheticEvent } from "react";

type ModalHandlers = {
	handleModalCloseOnEscapeKey: (event: globalThis.KeyboardEvent) => void;
	handleOutsideClick: () => void;
	preventModalCloseOnClick: (event: SyntheticEvent) => void;
};

export { type ModalHandlers };
