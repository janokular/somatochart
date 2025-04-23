import { Injectable, signal } from "@angular/core";
import { Athlete } from "./athlete";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AthleteService {
  private url = "http://localhost:5200";
  athletes$ = signal<Athlete[]>([]);
  athlete$ = signal<Athlete>({} as Athlete);

  constructor(private httpClient: HttpClient) {}

  private refreshAthletes(): void {
    this.httpClient
      .get<Athlete[]>(`${this.url}/athletes`)
      .subscribe((athletes) => {
        this.athletes$.set(athletes);
      });
  }

  getAthletes() {
    this.refreshAthletes();
    return this.athletes$();
  }

  getAthlete(id: string) {
    this.httpClient
      .get<Athlete>(`${this.url}/athletes/${id}`)
      .subscribe((athlete) => {
        this.athlete$.set(athlete);
        return this.athlete$();
      });
  }

  createAthlete(athlete: Athlete) {
    return this.httpClient.post(`${this.url}/athletes`, athlete, {
      responseType: "text",
    });
  }

  updateAthlete(id: string, athlete: Athlete) {
    return this.httpClient.put(`${this.url}/athletes/${id}`, athlete, {
      responseType: "text",
    });
  }

  deleteAthlete(id: string) {
    return this.httpClient.delete(`${this.url}/athletes/${id}`, {
      responseType: "text",
    });
  }
}
