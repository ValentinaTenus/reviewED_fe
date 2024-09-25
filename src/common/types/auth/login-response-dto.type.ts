import { type UserWithStaff } from "../user";

type LoginResponseDto = {
	access: string;
	refresh: string;
	user_info: UserWithStaff;
};

export { type LoginResponseDto };
