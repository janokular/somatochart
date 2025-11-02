document.addEventListener("DOMContentLoaded", function () {
  Highcharts.chart("chart", {
    chart: {
      type: "scatter",
      width: 750,
      height: 750,
      plotBackgroundImage: "static/assets/chart-background.svg",
      backgroundColor: "#ffffff",
    },
    title: {
      text: "SomatoChart",
      style: {
        color: "#ffffff",
      },
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
          symbolStroke: "#000000",
          menuItems: ["downloadPNG", "downloadJPEG", "downloadSVG"],
        },
      },
      chartOptions: {
        chart: {
          plotBackgroundImage: "static/assets/chart-background.jpg",
          backgroundColor: "#ffffff",
        },
      },
    },
    series: [
      {
        type: "scatter",
        animation: false,
        data: [
          { x: 1.3, y: 2.3, symbol: "circle", color: "blue", name: "test_1" },
          { x: -2.5, y: -4.5, symbol: "circle", color: "blue", name: "test_2" },
          { x: 2.2, y: 3, symbol: "circle", color: "blue", name: "test_3" },
        ],
      },
    ],
  });
});
