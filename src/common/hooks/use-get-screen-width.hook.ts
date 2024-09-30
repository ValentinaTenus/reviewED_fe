import { useEffect, useState } from "react";

const DEFAULT_SCREEN_WIDTH = 0;

const useGetScreenWidth = () => {
	const [screenWidth, setScreenWidth] = useState<number>(DEFAULT_SCREEN_WIDTH);

	const updateScreenWidth = () => {
		const screenWidth = window.innerWidth;
		setScreenWidth(screenWidth);
	};
	useEffect(() => {
		updateScreenWidth();
		window.addEventListener("resize", updateScreenWidth);

		return () => window.removeEventListener("resize", updateScreenWidth);
	}, []);
	return screenWidth;
};

export { useGetScreenWidth };
