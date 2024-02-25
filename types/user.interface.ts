import type { IBoard } from "./board.interface";

export interface IUser{
  id?: string;
  name?: string;
  email: string;
  photoUrl?: string;
  board?: IBoard
}