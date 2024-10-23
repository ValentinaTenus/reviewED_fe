import { yupResolver } from "@hookform/resolvers/yup";
import {
	type Control,
	type DefaultValues,
	type FieldErrors,
	type FieldValues,
	useForm,
	type UseFormGetValues,
	type UseFormHandleSubmit,
	type UseFormProps,
	type UseFormRegister,
	type UseFormReset,
	type UseFormSetValue,
	type UseFormStateReturn,
	type UseFormWatch,
	type ValidationMode,
} from "react-hook-form";
import { AnyObjectSchema } from "yup";

type Parameters<T extends FieldValues = FieldValues> = {
	defaultValues: DefaultValues<T>;
	mode?: keyof ValidationMode;
	validationSchema?: AnyObjectSchema;
};

type ReturnValue<T extends FieldValues = FieldValues> = {
	control: Control<T, null>;
	errors: FieldErrors<T>;
	formState: UseFormStateReturn<T>;
	getValues: UseFormGetValues<T>;
	handleSubmit: UseFormHandleSubmit<T>;
	isValid: boolean;
	register: UseFormRegister<T>;
	reset: UseFormReset<T>;
	setValue: UseFormSetValue<T>;
	watch: UseFormWatch<T>;
};

const useAppForm = <T extends FieldValues = FieldValues>({
	defaultValues,
	mode = "onSubmit",
	validationSchema,
}: Parameters<T>): ReturnValue<T> => {
	let parameters: UseFormProps<T> = {
		defaultValues,
		mode,
	};

	if (validationSchema) {
		parameters = {
			...parameters,
			resolver: yupResolver(validationSchema),
		};
	}

	const {
		control,
		formState: { errors, isValid },
		formState,
		getValues,
		handleSubmit,
		register,
		reset,
		setValue,
		watch,
	} = useForm<T>(parameters);

	return {
		control,
		errors,
		formState,
		getValues,
		handleSubmit,
		isValid,
		register,
		reset,
		setValue,
		watch,
	};
};

export { useAppForm };
