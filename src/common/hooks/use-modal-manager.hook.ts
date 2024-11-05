import { useState } from "react";

export const useModalManager = () => {
	const [currentModal, setCurrentModal] = useState<null | string>(null);
	const [id, setId] = useState<null | number>(null);

	const openModal = (modalName: string, id?: number) => {
		if (id) {
			setId(() => id);
		}
		setCurrentModal(() => modalName);
	};

	const closeModal = () => {
		setCurrentModal(null);
		setId(null);
	};

	return { closeModal, currentModal, id, openModal };
};
