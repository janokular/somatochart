import { Component } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.css"],
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class AppComponent {
  title = "client";
}
