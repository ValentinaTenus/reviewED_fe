const INDEX_ONE = 1;
const INDEX_TWO = 2;

// transform from "2024-09-25 19:49:55" to "01/09/2024, 15:33"
const useTransformDate = (dateStr: string) => {
	const date = new Date(dateStr);
	const formattedDate = `${String(date.getDate()).padStart(INDEX_TWO, "0")}/ ${String(date.getMonth() + INDEX_ONE).padStart(INDEX_TWO, "0")}/ ${date.getFullYear()}`;
	const formattedTime = `${String(date.getHours()).padStart(INDEX_TWO, "0")} : ${String(date.getMinutes()).padStart(INDEX_TWO, "0")}`;

	return { formattedDate, formattedTime };
};
export { useTransformDate };
