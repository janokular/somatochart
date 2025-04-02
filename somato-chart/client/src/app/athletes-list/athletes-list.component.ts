import {
  Component,
  effect,
  OnInit,
  signal,
  WritableSignal,
} from "@angular/core";
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
  athletes$: WritableSignal<Athlete[]> = signal([]);
  displayedColumns: string[] = [
    "col-name",
    "col-endo",
    "col-mezo",
    "col-ecto",
    "col-action",
  ];
  somatoChart: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      type: "scatter",
      width: 750,
      height: 750,
      plotBackgroundImage: "assets/chart-background.svg",
      backgroundColor: "#faf9fd",
      animation: false,
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
    series: [
      {
        type: "scatter",
        data: [],
      },
    ],
  };

  constructor(private athletesService: AthleteService) {
    this.fetchChartData();
  }

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

  private fetchChartData() {
    effect(() => {
      const series = this.chartOptions
        .series?.[0] as Highcharts.SeriesScatterOptions;
      if (series) {
        series.data = this.athletes$().map((athlete) => ({
          x: athlete.xAxisCoordinate,
          y: athlete.yAxisCoordinate,
          name: athlete.name,
          marker: {
            symbol: athlete.seriesSymbol,
            fillColor: athlete.seriesColor,
          },
        }));
        this.chartOptions = { ...this.chartOptions };
      }
    });
  }
}
