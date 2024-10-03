import React, { useCallback, useState } from "react";

import { useAgreePolicyMutation } from "~/redux/user/user-api";

import styles from "./styles.module.scss";

const PrivacyPolicy: React.FC = () => {
	const [isPolicyAgreed, setIsPolicyAgreed] = useState(false);
	const [agreePolicy] = useAgreePolicyMutation();

	const handleCheckboxChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setIsPolicyAgreed(e.target.checked);
			if (e.target.checked) {
				agreePolicy({ consent: true });
			}
		},
		[agreePolicy],
	);

	return (
		<div>
			<div className={styles["privacy_policy__form"]}>
				<label className={styles["privacy_policy__form-label"]}>
					<input
						checked={isPolicyAgreed}
						className={styles["auth__policy_checkbox"]}
						onChange={handleCheckboxChange}
						type="checkbox"
					/>
					Я погоджуюсь з політикою конфіденційності
				</label>
			</div>
		</div>
	);
};

export { PrivacyPolicy };
