import { type User } from "./user.type";

type UserWithStaff = {
	is_staff: boolean;
} & User;

export { type UserWithStaff };
