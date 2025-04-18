import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.css"],
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatIconModule],
})
export class AppComponent {
  title = "client";
}
