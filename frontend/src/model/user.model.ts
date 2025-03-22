import { Role } from "./role.model";

export type User = {
    id: string;
    username: string;
    roles: Role[];
}