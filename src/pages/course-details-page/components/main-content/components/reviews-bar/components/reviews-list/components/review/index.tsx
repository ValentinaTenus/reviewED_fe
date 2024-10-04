import React from "react";

import { ReviewFooter } from "./components/review-footer";
import { ReviewHeader } from "./components/review-header";
import { ReviewMain } from "./components/review-main";
import styles from "./styles.module.scss";

const Review: React.FC = () => {
	return (
		<div className={styles["review"]}>
			<ReviewHeader
				date="Yesterday"
				name="Some dude"
				rating={4}
				role="Student"
			/>
			<ReviewMain text="Курс QA тестування перевершив мої очікування. Чітко структурована програма охопила всі ключові аспекти, від основ до автоматизації. Інструктори досвідчені та доступні, завжди готові допомогти. Практичні завдання дозволили закріпити знання на реальних кейсах. Рекомендую цей курс для старту в QA! Курс QA тестування перевершив мої очікування. Чітко структурована програма охопила всі ключові аспекти, від основ до автоматизації. Інструктори досвідчені та доступні, завжди готові допомогти. Практичні завдання дозволили закріпити знання на реальних кейсах. Рекомендую цей курс для старту в QA!Курс QA тестування перевершив мої очікування. Чітко структурована програма охопила всі ключові аспекти, від основ до автоматизації. Інструктори досвідчені та доступні, завжди готові допомогти. Практичні завдання дозволили закріпити знання на реальних кейсах. Рекомендую цей курс для старту в QA!Курс QA тестування перевершив мої очікування. Чітко структурована програма охопила всі ключові аспекти, від основ до автоматизації. Інструктори досвідчені та доступні, завжди готові допомогти. Практичні завдання дозволили закріпити знання на реальних кейсах. Рекомендую цей курс для старту в QA!Курс QA тестування перевершив мої очікування. Чітко структурована програма охопила всі ключові аспекти, від основ до автоматизації. Інструктори досвідчені та доступні, завжди готові допомогти. Практичні завдання дозволили закріпити знання на реальних кейсах. Рекомендую цей курс для старту в QA!Курс QA тестування перевершив мої очікування. Чітко структурована програма охопила всі ключові аспекти, від основ до автоматизації. Інструктори досвідчені та доступні, завжди готові допомогти. Практичні завдання дозволили закріпити знання на реальних кейсах. Рекомендую цей курс для старту в QA!Курс QA тестування перевершив мої очікування. Чітко структурована програма охопила всі ключові аспекти, від основ до автоматизації. Інструктори досвідчені та доступні, завжди готові допомогти. Практичні завдання дозволили закріпити знання на реальних кейсах. Рекомендую цей курс для старту в QA!Курс QA тестування перевершив мої очікування. Чітко структурована програма охопила всі ключові аспекти, від основ до автоматизації. Інструктори досвідчені та доступні, завжди готові допомогти. Практичні завдання дозволили закріпити знання на реальних кейсах. Рекомендую цей курс для старту в QA!" />
			<ReviewFooter />
		</div>
	);
};

export { Review };
