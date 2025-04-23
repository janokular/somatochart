import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CoordinateService {
  calculateCoordinates(
    endo: number,
    mezo: number,
    ecto: number
  ): { x: number; y: number } {
    const factor = 100;
    const x = Math.round((ecto - endo) * factor) / factor;
    const y = Math.round((2 * mezo - (endo + ecto)) * factor) / factor;

    return { x, y };
  }
}
