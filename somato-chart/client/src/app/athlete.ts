export interface Athlete {
  name: string;
  endo: number;
  mezo: number;
  ecto: number;
  seriesSymbol: "circle" | "triangle" | "square";
  seriesColor: "blue" | "orange" | "purple";
  _id?: string;
}
