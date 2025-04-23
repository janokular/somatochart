import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { AthleteFormComponent } from "../athlete-form/athlete-form.component";
import { AthleteService } from "../athlete.service";
import { Athlete } from "../athlete";

@Component({
  selector: "app-add-athlete",
  templateUrl: "add-athlete.component.html",
  styleUrls: [],
  standalone: true,
  imports: [AthleteFormComponent, MatCardModule],
})
export class AddAthleteComponent {
  constructor(private router: Router, private athleteService: AthleteService) {}

  addAthlete(athlete: Athlete): void {
    this.athleteService.createAthlete(athlete).subscribe({
      next: () => {
        this.router.navigate(["/"]);
      },
      error: (error) => {
        alert("Failed to create athlete");
        console.error(error);
      },
    });
    this.athleteService.getAthletes();
  }
}
