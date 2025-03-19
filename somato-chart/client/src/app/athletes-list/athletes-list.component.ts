import { Component, OnInit, WritableSignal } from "@angular/core";
import { Athlete } from "../athlete";
import { AthleteService } from "../athlete.service";
import { RouterModule } from "@angular/router";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-athletes-list",
  templateUrl: "athletes-list.component.html",
  styleUrls: ["athletes-list.component.css"],
  standalone: true,
  imports: [
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
})
export class AthletesListComponent implements OnInit {
  athletes$ = {} as WritableSignal<Athlete[]>;
  displayedColumns: string[] = [
    "col-name",
    "col-endo",
    "col-mezo",
    "col-ecto",
    "col-action",
  ];

  constructor(private athletesService: AthleteService) {}

  ngOnInit() {
    this.fetchAthletes();
  }

  deleteAthlete(id: string): void {
    this.athletesService.deleteAthlete(id).subscribe({
      next: () => this.fetchAthletes(),
    });
  }

  private fetchAthletes(): void {
    this.athletes$ = this.athletesService.athletes$;
    this.athletesService.getAthletes();
  }
}
