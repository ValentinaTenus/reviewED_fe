export type QuestionAndAnswerProperties = {
	answer: string;
	question: string;
};

export type DropdownKey = "Верифікація" | "Відгуки" | "Загальні";
export const toggleButtonGroupData: DropdownKey[] = [
	"Загальні",
	"Верифікація",
	"Відгуки",
];

export const dropdownData: Record<DropdownKey, QuestionAndAnswerProperties[]> =
	{
		Верифікація: [
			{
				answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
		  Autem rerum delectus dolorum deleniti non fugiat doloribus excepturi aliquid 
		  quaerat nemo quam soluta, at fugit repellat iste pariatur magni, beatae illo?`,
				question: "Verification question?",
			},
			{
				answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
		Autem rerum delectus dolorum deleniti non fugiat doloribus excepturi aliquid 
		quaerat nemo quam soluta, at fugit repellat iste pariatur magni, beatae illo?`,
				question: "Lorem ipsum dolor sit amet?",
			},
			{
				answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
		Autem rerum delectus dolorum deleniti non fugiat doloribus excepturi aliquid 
		quaerat nemo quam soluta, at fugit repellat iste pariatur magni, beatae illo?`,
				question: "Lorem ipsum dolor sit amet?",
			},
			{
				answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
		Autem rerum delectus dolorum deleniti non fugiat doloribus excepturi aliquid 
		quaerat nemo quam soluta, at fugit repellat iste pariatur magni, beatae illo?`,
				question:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit? adipisicing elit",
			},
			{
				answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
		Autem rerum delectus dolorum deleniti non fugiat doloribus excepturi aliquid 
		quaerat nemo quam soluta, at fugit repellat iste pariatur magni, beatae illo?`,
				question: "Lorem ipsum dolor sit amet?",
			},
			{
				answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
		Autem rerum delectus dolorum deleniti non fugiat doloribus excepturi aliquid 
		quaerat nemo quam soluta, at fugit repellat iste pariatur magni, beatae illo?`,
				question: "Lorem ipsum dolor sit amet?",
			},
			{
				answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
		Autem rerum delectus dolorum deleniti non fugiat doloribus excepturi aliquid 
		quaerat nemo quam soluta, at fugit repellat iste pariatur magni, beatae illo?`,
				question: "Lorem ipsum dolor sit amet?",
			},
			{
				answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
		Autem rerum delectus dolorum deleniti non fugiat doloribus excepturi aliquid 
		quaerat nemo quam soluta, at fugit repellat iste pariatur magni, beatae illo?`,
				question: "Lorem ipsum dolor sit amet?",
			},
		],
		Відгуки: [
			{
				answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
		  Autem rerum delectus dolorum deleniti non fugiat doloribus excepturi aliquid 
		  quaerat nemo quam soluta, at fugit repellat iste pariatur magni, beatae illo?`,
				question: "Reviews question?",
			},
			{
				answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
		Autem rerum delectus dolorum deleniti non fugiat doloribus excepturi aliquid 
		quaerat nemo quam soluta, at fugit repellat iste pariatur magni, beatae illo?`,
				question: "Lorem ipsum dolor sit amet?",
			},
			{
				answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
		Autem rerum delectus dolorum deleniti non fugiat doloribus excepturi aliquid 
		quaerat nemo quam soluta, at fugit repellat iste pariatur magni, beatae illo?`,
				question: "Lorem ipsum dolor sit amet?",
			},
			{
				answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
		Autem rerum delectus dolorum deleniti non fugiat doloribus excepturi aliquid 
		quaerat nemo quam soluta, at fugit repellat iste pariatur magni, beatae illo?`,
				question:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit? adipisicing elit",
			},
			{
				answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
		Autem rerum delectus dolorum deleniti non fugiat doloribus excepturi aliquid 
		quaerat nemo quam soluta, at fugit repellat iste pariatur magni, beatae illo?`,
				question: "Lorem ipsum dolor sit amet?",
			},
			{
				answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
		Autem rerum delectus dolorum deleniti non fugiat doloribus excepturi aliquid 
		quaerat nemo quam soluta, at fugit repellat iste pariatur magni, beatae illo?`,
				question: "Lorem ipsum dolor sit amet?",
			},
			{
				answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
		Autem rerum delectus dolorum deleniti non fugiat doloribus excepturi aliquid 
		quaerat nemo quam soluta, at fugit repellat iste pariatur magni, beatae illo?`,
				question: "Lorem ipsum dolor sit amet?",
			},
			{
				answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
		Autem rerum delectus dolorum deleniti non fugiat doloribus excepturi aliquid 
		quaerat nemo quam soluta, at fugit repellat iste pariatur magni, beatae illo?`,
				question: "Lorem ipsum dolor sit amet?",
			},
		],
		Загальні: [
			{
				answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Autem rerum delectus dolorum deleniti non fugiat doloribus excepturi aliquid 
      quaerat nemo quam soluta, at fugit repellat iste pariatur magni, beatae illo?`,
				question: "Common question?",
			},
			{
				answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
    Autem rerum delectus dolorum deleniti non fugiat doloribus excepturi aliquid 
    quaerat nemo quam soluta, at fugit repellat iste pariatur magni, beatae illo?`,
				question: "Lorem ipsum dolor sit amet?",
			},
			{
				answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
    Autem rerum delectus dolorum deleniti non fugiat doloribus excepturi aliquid 
    quaerat nemo quam soluta, at fugit repellat iste pariatur magni, beatae illo?`,
				question: "Lorem ipsum dolor sit amet?",
			},
			{
				answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
    Autem rerum delectus dolorum deleniti non fugiat doloribus excepturi aliquid 
    quaerat nemo quam soluta, at fugit repellat iste pariatur magni, beatae illo?`,
				question:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit? adipisicing elit",
			},
			{
				answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
    Autem rerum delectus dolorum deleniti non fugiat doloribus excepturi aliquid 
    quaerat nemo quam soluta, at fugit repellat iste pariatur magni, beatae illo?`,
				question: "Lorem ipsum dolor sit amet?",
			},
			{
				answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
    Autem rerum delectus dolorum deleniti non fugiat doloribus excepturi aliquid 
    quaerat nemo quam soluta, at fugit repellat iste pariatur magni, beatae illo?`,
				question: "Lorem ipsum dolor sit amet?",
			},
			{
				answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
    Autem rerum delectus dolorum deleniti non fugiat doloribus excepturi aliquid 
    quaerat nemo quam soluta, at fugit repellat iste pariatur magni, beatae illo?`,
				question: "Lorem ipsum dolor sit amet?",
			},
			{
				answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
    Autem rerum delectus dolorum deleniti non fugiat doloribus excepturi aliquid 
    quaerat nemo quam soluta, at fugit repellat iste pariatur magni, beatae illo?`,
				question: "Lorem ipsum dolor sit amet?",
			},
		],
	};
