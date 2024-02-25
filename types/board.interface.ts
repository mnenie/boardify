import type { IUser } from "./user.interface";

export interface IBoard{
    id: string;
    name: string;
    users: IUser[];
}