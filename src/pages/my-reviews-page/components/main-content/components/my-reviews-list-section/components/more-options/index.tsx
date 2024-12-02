import clsx from "clsx";
import React, { useCallback, useState } from "react";

import { Icon } from "~/common/components";
import { IconName } from "~/common/enums";
import { MyReviewOptions } from "~/common/types/my-reviews";

import { ActionsReviewModal } from "../actions-review-modal";
import { PopupMenu } from "../popup-menu";
import styles from "./styles.module.scss";

const MY_REVIEW_OPTIONS: MyReviewOptions[] = [
	{ iconName: IconName.EDIT, label: "редагувати", value: "edit" },
	{
		iconName: IconName.MESSAGES,
		label: "зв'язатися з модератором",
		value: "contact moderator",
	},
	{ iconName: IconName.DELETE, label: "видалити", value: "delete" },
];

const OPTION_MODAL_MAP: Record<string, string> = {
	"contact moderator": "contactModal",
	delete: "deleteModal",
	edit: "editModal",
};

const POPUP_CLOSE_DELAY = 500;
const MOBILE_BREAKPOINT = 576;

type Properties = {
	isForTablet?: boolean;
	openModal: (currentModal: string, entityId: number) => void;
	reviewId: null | number;
};

const MoreOptions: React.FC<Properties> = ({
	isForTablet = false,
	openModal,
	reviewId,
}) => {
	const [isOpenActionsModal, setIsOpenActionsModal] = useState<boolean>(false);
	const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
	const [activePopup, setActivePopup] = useState<null | number>(null);

	const handleClosePopup = useCallback(() => {
		setActivePopup(null);
		// Prevent reopening the Popup if the outside click is on the Popup open trigger
		setTimeout(() => {
			setIsOpenPopup(false);
		}, POPUP_CLOSE_DELAY);
	}, []);

	const handleOpenPopup = useCallback(() => {
		const width = window.innerWidth;

		// for mobile open ActionsModal, for desktop and tablet open PopupMenu
		if (width > MOBILE_BREAKPOINT) {
			setIsOpenPopup(true);
			setActivePopup(reviewId);
		} else {
			setIsOpenActionsModal(true);
		}
	}, [reviewId]);

	const handleSelectOption = useCallback(
		(option: string) => {
			const modalType = OPTION_MODAL_MAP[option];
			openModal(modalType, reviewId as number);

			handleClosePopup();
		},
		[handleClosePopup, openModal, reviewId],
	);

	return (
		<div
			className={clsx(styles["more-options"], {
				[styles["more-options--tablet"]]: isForTablet,
			})}
		>
			<div
				className={styles["more-options__button"]}
				onClick={!isOpenPopup ? handleOpenPopup : undefined}
			>
				<Icon name={IconName.MORE} />
			</div>

			<div className={styles["more-options__popup-menu"]}>
				<PopupMenu
					handleClosePopup={handleClosePopup}
					handleSelect={handleSelectOption}
					isOpen={activePopup === reviewId}
					options={MY_REVIEW_OPTIONS}
				/>
			</div>

			{isOpenActionsModal && (
				<ActionsReviewModal
					onSelect={handleSelectOption}
					options={MY_REVIEW_OPTIONS}
					setIsOpenActionsModal={setIsOpenActionsModal}
				/>
			)}
		</div>
	);
};

export { MoreOptions };
