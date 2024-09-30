import React, { useCallback, useEffect } from "react";

import { type ModalHandlers, type ModalProperties } from "~/common/types/index";

const ESCAPE_KEY = "Escape";

const useModal = ({
	isOpen,
	onClose,
}: Omit<ModalProperties, "children" | "variant">): ModalHandlers => {
	const handleOutsideClick = useCallback(() => onClose(), [onClose]);

	const preventModalCloseOnClick = useCallback(
		(event: React.SyntheticEvent) => event.stopPropagation(),
		[],
	);

	const handleModalCloseOnEscapeKey = useCallback(
		(event: globalThis.KeyboardEvent) => {
			if (event.key === ESCAPE_KEY) {
				onClose();
			}
		},
		[onClose],
	);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
			window.addEventListener("keydown", handleModalCloseOnEscapeKey);

			return () => {
				document.body.style.overflow = "auto";
				window.removeEventListener("keydown", handleModalCloseOnEscapeKey);
			};
		} else {
			document.body.style.overflow = "auto";
		}
	}, [isOpen, handleModalCloseOnEscapeKey]);

	return {
		handleModalCloseOnEscapeKey,
		handleOutsideClick,
		preventModalCloseOnClick,
	};
};

export { useModal };
