import { Component, OnInit, WritableSignal } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { AthleteFormComponent } from "../athlete-form/athlete-form.component";
import { Athlete } from "../athlete";
import { AthleteService } from "../athlete.service";

@Component({
  selector: "app-edit-athlete",
  templateUrl: "edit-athlete.component.html",
  styleUrls: [],
  standalone: true,
  imports: [AthleteFormComponent, MatCardModule],
})
export class EditAthleteComponent implements OnInit {
  athlete = {} as WritableSignal<Athlete>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private athleteService: AthleteService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    if (!id) {
      alert("No id provided");
    }

    this.athleteService.getAthlete(id!);
    this.athlete = this.athleteService.athlete$;
  }

  editAthlete(athlete: Athlete) {
    this.athleteService
      .updateAthlete(this.athlete()._id || "", athlete)
      .subscribe({
        next: () => {
          this.router.navigate(["/"]);
        },
        error: (error) => {
          alert("Failed to update athlete");
          console.error(error);
        },
      });
  }
}
