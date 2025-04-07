import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";

@Component({
  selector: "app-root",
  template: `
    <mat-toolbar>
      <span>SomatoChart</span>
    </mat-toolbar>
    <main>
      <router-outlet />
    </main>
  `,
  styles: [
    `
      main {
        display: flex;
        justify-content: center;
        padding: 2rem 4rem;
      }
    `,
  ],
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule],
})
export class AppComponent {
  title = "client";
}
