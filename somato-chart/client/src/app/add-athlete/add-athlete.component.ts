import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { AthleteFormComponent } from "../athlete-form/athlete-form.component";
import { AthleteService } from "../athlete.service";
import { Athlete } from "../athlete";

@Component({
  selector: "app-add-athlete",
  standalone: true,
  imports: [AthleteFormComponent, MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Add a New Athlete</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <app-athlete-form
          (formSubmitted)="addAthlete($event)"
        ></app-athlete-form>
      </mat-card-content>
    </mat-card>
  `,
  styles: ``,
})
export class AddAthleteComponent {
  constructor(private router: Router, private athleteService: AthleteService) {}

  addAthlete(athlete: Athlete) {
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
