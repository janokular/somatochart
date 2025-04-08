import { Component, effect } from "@angular/core";
import { AthleteService } from "../athlete.service";
import { MatCardModule } from "@angular/material/card";
import { HighchartsChartModule } from "highcharts-angular";
import Highcharts from "highcharts";

@Component({
  selector: "app-athletes-chart",
  templateUrl: "athletes-chart.component.html",
  styleUrls: ["athletes-chart.component.css"],
  standalone: true,
  imports: [MatCardModule, HighchartsChartModule],
})
export class AthletesChartComponent {
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

  private fetchChartData(): void {
    effect(() => {
      const chartData = this.athletesService.athletes$().map((athlete) => ({
        x: athlete.x,
        y: athlete.y,
        name: athlete.name,
        marker: {
          symbol: athlete.symbol,
          fillColor: athlete.fillColor,
        },
      }));

      console.log("chartData:", chartData);

      this.chartOptions.series = [{
        type:"scatter",
        data: chartData,
      }];

      this.chartOptions = { ...this.chartOptions };
    });
  }
}
