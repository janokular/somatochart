import { Component, OnInit, WritableSignal } from "@angular/core";
import { Athlete } from "../athlete";
import { AthleteService } from "../athlete.service";
import { RouterModule } from "@angular/router";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: "app-athletes-list",
  standalone: true,
  imports: [RouterModule, MatTableModule, MatButtonModule, MatCardModule],
  styles: [
    `
      table {
        width: 100%;

        button:first-of-type {
          margin-right: 1rem;
        }
      }
    `,
  ],
  template: `
    <mat-card>
      <mat-card-content>
        <table mat-table [dataSource]="athletes$()">
          <ng-container matColumnDef="col-name">
            <th mat-header-cell *matHeaderCellDef>Name</th>
            <td mat-cell *matCellDef="let element">{{ element.name }}</td>
          </ng-container>
          <ng-container matColumnDef="col-endo">
            <th mat-header-cell *matHeaderCellDef>Endomorphy</th>
            <td mat-cell *matCellDef="let element">{{ element.endo }}</td>
          </ng-container>
          <ng-container matColumnDef="col-mezo">
            <th mat-header-cell *matHeaderCellDef>Mezomorphy</th>
            <td mat-cell *matCellDef="let element">{{ element.mezo }}</td>
          </ng-container>
          <ng-container matColumnDef="col-ecto">
            <th mat-header-cell *matHeaderCellDef>Ectomorphy</th>
            <td mat-cell *matCellDef="let element">{{ element.ecto }}</td>
          </ng-container>
          <ng-container matColumnDef="col-action">
            <th mat-header-cell *matHeaderCellDef>Action</th>
            <td mat-cell *matCellDef="let element">
              <button mat-raised-button [routerLink]="['edit/', element._id]">
                Edit
              </button>
              <button
                mat-raised-button
                color="warn"
                (click)="deleteAthlete(element._id || '')"
              >
                Delete
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary" [routerLink]="['new']">
          Add a New Athlete
        </button>
      </mat-card-actions>
    </mat-card>
  `,
})
export class AthletesListComponent implements OnInit {
  athletes$ = {} as WritableSignal<Athlete[]>;
  displayedColumns: string[] = [
    "col-name",
    "col-endo",
    "col-mezo",
    "col-ecto",
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
