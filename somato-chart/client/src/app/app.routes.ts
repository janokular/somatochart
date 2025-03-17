import { Routes } from "@angular/router";
import { AthletesListComponent } from "./athletes-list/athletes-list.component";

export const routes: Routes = [
  { path: "", component: AthletesListComponent, title: "Athletes List" },
];
