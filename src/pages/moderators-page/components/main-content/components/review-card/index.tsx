import clsx from "clsx";
import React, { useState } from "react";

import DefaultCompanyImage from "~/assets/images/default-company-image.png";
import { Button, StarRating } from "~/common/components";
import {
	ButtonSize,
	ButtonType,
	ButtonVariant,
	RatingSize,
	StarRatingVariant,
} from "~/common/enums";
import { ModerationReviews } from "~/common/types/review/index";

import style from "./styles.module.scss";

type ReviewModeratorsCardProps = {
	review: ModerationReviews;
};

const ReviewModeratorsCard: React.FC<ReviewModeratorsCardProps> = ({
	review,
}) => {
	const [isTruncated, setIsTruncated] = useState(true);
	const status = {
		pending: true,
		published: false,
		removed: false,
	};

	const handleTruncatedText = () => setIsTruncated(!isTruncated);

	return (
		<div>
			{review.author_email}
			<div className={style.card}>
				<div
					className={clsx(style["card__state"], {
						[style["card__state--pending"]]: status.pending,
						[style["card__state--published"]]: status.published,
						[style["card__state--removed"]]: status.removed,
					})}
				>
					{status.pending && "В очікуванні"}
					{status.published && "Опубліковано"}
					{status.removed && "Вилучено з публікації"}
				</div>
				<div className={style.info}>
					<p className={style["info__UID-text"]}>
						UID відгуку:{" "}
						<span className={style["info__UID-number"]}>{381264}</span>
					</p>
					<div className={style["info__links"]}>
						<p className={style["info__link-text"]}>
							Профіль Linkedin:
							<a className={style["info__link"]} href="#">
								{" "}
								www.linkedin.com/in/example-example-24a713279
							</a>
						</p>
						<p className={style["info__link-text"]}>
							email:
							<a className={style["info__link"]} href="#">
								{" "}
								example_example@gmail.com
							</a>
						</p>
					</div>
				</div>
				<div className={clsx(style["card__title"], style["title"])}>
					<img
						alt="logo"
						className={style["title__img"]}
						src={DefaultCompanyImage}
					/>
					<h4 className={style["title__text"]}>
						QA тестування. Тестувальник ПЗ
					</h4>
					<div className={style["title__stars"]}>
						<StarRating
							averageRating={3.5}
							variant={StarRatingVariant.SMALL_CARD}
						/>
					</div>
				</div>
				<div className={clsx(style["content"], style["card__content"])}>
					<div className={style["content__info"]}>
						<div className={style["content__date"]}>
							01/ 09/ 2024,{" "}
							<span className={style["content__time"]}>15 : 33</span>
						</div>
						<StarRating
							averageRating={4.5}
							size={RatingSize.MEDIUM}
							variant={StarRatingVariant.SMALL_CARD}
						/>
					</div>
					<p
						className={clsx(style["content__text"], {
							[style["content__text--truncated"]]: isTruncated,
						})}
					>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat,
						nihil. Nobis, distinctio. Vero autem itaque voluptate aliquam optio
						iure excepturi esse vitae at repellendus aut atque, eveniet sit.
						Nulla temporibus sit maxime dignissimos, aliquam accusamus iste ab
						dolores quae nemo consequuntur alias tempora possimus omnis maiores
						inventore quo asperiores soluta adipisci ea debitis illo! Incidunt
						reiciendis, pariatur quas, voluptate reprehenderit asperiores
						corporis consequuntur ab magni repudiandae fugit. Pariatur facere
						explicabo praesentium sunt omnis est deserunt beatae? Unde
						blanditiis, corrupti omnis pariatur laborum praesentium numquam
						molestiae sed accusamus, saepe aut. Veritatis doloremque commodi ut
						adipisci velit consequuntur aliquid vero earum aperiam?Lorem ipsum
						dolor sit, amet consectetur adipisicing elit. Itaque, quasi
						accusantium? Odit consequatur a itaque consequuntur ex facere
						distinctio velit ratione tenetur architecto expedita doloremque
						delectus aperiam aliquam iusto quod sit repellendus, adipisci quo.
						Expedita corporis at amet nulla provident, dolorum voluptatum iure
						quo quae itaque maxime sapiente maiores eius, pariatur fuga ipsum
						repellat beatae est delectus autem! Fugit vero accusamus quasi sed
						dignissimos nostrum! Libero, sit. A quas alias, voluptatibus eaque
						molestiae minima, facilis culpa cumque maiores, quibusdam animi
						exercitationem odit? Commodi asperiores consequuntur aliquam. Vel in
						possimus, quibusdam optio adipisci autem assumenda corrupti aliquam
						rerum delectus necessitatibus eum.
					</p>
					<button
						className={style["content__text_button"]}
						onClick={handleTruncatedText}
					>
						{!isTruncated ? "Приховати" : "Показати повністю"}
					</button>
				</div>
				<div className={style["card__buttons"]}>
					{(status.pending || status.removed) && (
						<Button
							className={style["button_fixed"]}
							isFullWidth
							size={ButtonSize.SMALL}
							type={ButtonType.BUTTON}
							variant={ButtonVariant.PRIMARY}
						>
							Опубліковати
						</Button>
					)}
					{(status.published || status.pending) && (
						<Button
							className={style["button_fixed"]}
							isFullWidth
							size={ButtonSize.SMALL}
							type={ButtonType.BUTTON}
							variant={ButtonVariant.OUTLINED}
						>
							Зняти з публікації
						</Button>
					)}
				</div>

				<div className="card__buttons" />
			</div>
		</div>
	);
};

export { ReviewModeratorsCard };
