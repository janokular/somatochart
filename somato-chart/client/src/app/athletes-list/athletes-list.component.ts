import { Component, OnInit, WritableSignal } from "@angular/core";
import { Athlete } from "../athlete";
import { AthleteService } from "../athlete.service";
import { RouterModule } from "@angular/router";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { HighchartsChartModule } from "highcharts-angular";
import Highcharts from "highcharts";

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
    HighchartsChartModule,
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

  Highcharts: typeof Highcharts = Highcharts;
  updateFlag = false;

  data = [
    {
      x: 1,
      y: 2,
      name: "test1",
      marker: {
        symbol: "circle",
        fillColor: "blue",
      },
    },
    {
      x: -1,
      y: -2,
      name: "test2",
      marker: {
        symbol: "triangle",
        fillColor: "orange",
      },
    },
    {
      x: 0,
      y: 0,
      name: "test3",
      marker: {
        symbol: "square",
        fillColor: "purple",
      },
    },
  ];

  chartOptions: Highcharts.Options = {
    chart: {
      type: "scatter",
      width: 750,
      height: 750,
      plotBackgroundImage: "assets/chart-background.svg",
      backgroundColor: "#faf9fd",
    },
    title: {
      text: "Athletes by body type",
      align: "left",
    },
    xAxis: {
      title: {
        text: "ectomorphy - endomorphy",
      },
      min: -8,
      max: 8,
      gridLineWidth: 0,
      tickInterval: 1,
      tickLength: 0,
      minorTickLength: 0,
      lineColor: "#ccc",
      lineWidth: 1,
    },
    yAxis: {
      title: {
        text: "2 * mesomorphy - (endomorphy + ectomorphy)",
      },
      min: -10,
      max: 18,
      gridLineWidth: 0,
      tickInterval: 2,
      tickLength: 0,
      minorTickLength: 0,
      lineColor: "#ccc",
      lineWidth: 1,
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      scatter: {
        marker: {
          states: {
            hover: {
              enabled: true,
              lineColor: "#646464",
            },
          },
        },
        dataLabels: {
          enabled: true,
          format: "{point.name}",
        },
      },
    },
    tooltip: {
      formatter: function () {
        return (
          "<b>" + this.name + "</b><br/>x: " + this.x + "<br/>y: " + this.y
        );
      },
    },
    colors: ["#646464"],
    series: [{ type: "scatter", data: this.data }],
  };
}
