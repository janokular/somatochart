import * as mongodb from "mongodb";

export interface Athlete {
  name: string;
  endo: number;
  mezo: number;
  ecto: number;
  seriesSymbol: "circle" | "triangle" | "square";
  seriesColor: "blue" | "orange" | "purple";
  xAxisCoordinate: number;
  yAxisCoordinate: number;
  _id?: mongodb.ObjectId;
}
