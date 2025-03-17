import { Routes } from "@angular/router";
import { AthletesListComponent } from "./athletes-list/athletes-list.component";
import { AddAthleteComponent } from "./add-athlete/add-athlete.component";
import { EditAthleteComponent } from "./edit-athlete/edit-athlete.component";

export const routes: Routes = [
  { path: "", component: AthletesListComponent, title: "SomatoChart" },
  { path: 'new', component: AddAthleteComponent, title: "SomatoChart" },
  { path: 'edit/:id', component: EditAthleteComponent, title: "SomatoChart" },
];
