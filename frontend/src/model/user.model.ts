import { Role } from "./role.model";

export type User = {
    username: string;
    roles: Role[];
}