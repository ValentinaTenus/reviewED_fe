import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { closeModal } from "../store/modalSlice";
import { RootState } from "../store/store";

const Modal: React.FC = () => {
	const dispatch = useDispatch();
	const isOpen = useSelector((state: RootState) => state.modal.isOpen);

	if (!isOpen) return null;

	const handleClose = () => {
		dispatch(closeModal());
	};

	return (
		<div className="modal-overlay" onClick={handleClose}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<button className="modal-close" onClick={handleClose}>
					&times;
				</button>
				<h2>Modal</h2>
			</div>
		</div>
	);
};

export default Modal;
