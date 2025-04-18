import * as mongodb from "mongodb";

export interface Athlete {
  name: string;
  endo: number;
  mezo: number;
  ecto: number;
  x: number;
  y: number;
  symbol: "circle" | "triangle" | "square";
  fillColor: "blue" | "orange" | "purple";
  _id?: mongodb.ObjectId;
}
