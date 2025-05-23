import {
  Component,
  effect,
  Input,
  OnInit,
  WritableSignal,
} from "@angular/core";
import { Athlete } from "../athlete";
import { MatCardModule } from "@angular/material/card";
import { HighchartsChartModule } from "highcharts-angular";
import Highcharts from "highcharts";
import "highcharts/modules/accessibility";
import "highcharts/modules/exporting";
import "highcharts/modules/offline-exporting";

@Component({
  selector: "app-athletes-chart",
  templateUrl: "athletes-chart.component.html",
  styleUrls: [],
  standalone: true,
  imports: [MatCardModule, HighchartsChartModule],
})
export class AthletesChartComponent implements OnInit {
  @Input() athletes!: WritableSignal<Athlete[]>;

  somatoChart: typeof Highcharts = Highcharts;
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
    credits: {
      enabled: false,
    },
    tooltip: {
      formatter: function () {
        return (
          "<b>" + this.name + "</b><br/>x: " + this.x + "<br/>y: " + this.y
        );
      },
    },
    colors: ["transparent"],
    exporting: {
      buttons: {
        contextButton: {
          symbolStroke: "#44474e",
          menuItems: ["downloadPNG", "downloadJPEG", "downloadSVG"],
          theme: {
            fill: "#faf9fd",
          },
        },
      },
      chartOptions: {
        chart: {
          plotBackgroundImage: "assets/chart-background.jpg",
          backgroundColor: "#ffffff",
        },
      },
    },
    series: [
      {
        type: "scatter",
        data: [],
      },
    ],
  };

  constructor() {
    effect(() => {
      this.updateChartData(this.athletes());
    });
  }

  ngOnInit(): void {
    Highcharts.setOptions({
      global: {
        buttonTheme: {
          states: {
            hover: {
              fill: "transparent",
            },
            select: {
              fill: "transparent",
            },
          },
        },
      },
    });
  }

  private updateChartData(athletes: Athlete[]): void {
    const chartData = athletes
      .filter((athlete) => athlete.isVisible)
      .map((athlete) => ({
        x: athlete.x,
        y: athlete.y,
        name: athlete.name,
        marker: {
          symbol: athlete.symbol,
          fillColor: athlete.color,
          lineColor: athlete.color,
        },
      }));

    console.log("chartData:", chartData);

    this.chartOptions.series = [
      {
        type: "scatter",
        data: chartData,
      },
    ];

    this.chartOptions = { ...this.chartOptions };
  }
}
