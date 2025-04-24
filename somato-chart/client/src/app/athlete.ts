export interface Athlete {
  name: string;
  endo: number;
  mezo: number;
  ecto: number;
  x: number;
  y: number;
  symbol: "circle" | "triangle" | "square";
  fillColor: "blue" | "orange" | "purple";
  isVisible: boolean;
  _id?: string;
}
