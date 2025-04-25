export interface Athlete {
  name: string;
  endo: number;
  mezo: number;
  ecto: number;
  x: number;
  y: number;
  symbol: "circle" | "triangle" | "square";
  fillColor: "blue" | "green" | "red";
  isVisible: boolean;
  _id?: string;
}
