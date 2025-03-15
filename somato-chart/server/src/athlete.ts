import * as mongodb from "mongodb";

export interface Athlete {
  name: string;
  endo: number;
  mezo: number;
  ecto: number;
  _id?: mongodb.ObjectId;
}
