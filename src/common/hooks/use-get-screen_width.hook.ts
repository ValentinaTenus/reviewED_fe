import { useEffect, useState } from "react";

export const useGetScreenWidth = () => {
	const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

	useEffect(() => {
		window.addEventListener("resize", () => setScreenWidth(window.innerWidth));

		return () =>
			window.removeEventListener("resize", () =>
				setScreenWidth(window.innerWidth),
			);
	}, []);
	return screenWidth;
};
