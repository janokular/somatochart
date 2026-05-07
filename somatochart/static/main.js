function loadChartData() {
  fetch("/athletes")
    .then((res) => res.json())
    .then((athletes) => {
      const chart = Highcharts.chart("chart", {
        chart: {
          type: "scatter",
          width: 750,
          height: 750,
          plotBackgroundImage: "static/assets/chart-background.svg",
          backgroundColor: "#ffffff",
          style: {
            fontFamily: "monospace",
          },
        },
        title: {
          text: "SomatoChart",
          align: "left",
        },
        xAxis: [
          {
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
          {
            title: "",
            lineColor: "#ccc",
            lineWidth: 1,
            opposite: true,
          },
        ],
        yAxis: [
          {
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
          {
            title: "",
            lineColor: "#ccc",
            lineWidth: 1,
            opposite: true,
          },
        ],
        legend: {
          enabled: false,
        },
        credits: {
          enabled: false,
        },
        colors: ["transparent"],
        exporting: {
          enabled: true,
          buttons: {
            contextButton: {
              enabled: false,
            },
          },
          scale: 5,
        },
        series: [
          {
            type: "scatter",
            animation: false,
            enableMouseTracking: false,
            data: athletes
              .filter((a) => a.visible)
              .map((a) => ({
                _id: a._id,
                x: a.x,
                y: a.y,
                name: a.name,
                marker: {
                  symbol: a.symbol,
                  fillColor: a.color,
                  lineColor: a.color,
                },
              })),
          },
        ],
      });

      document.getElementById("downloadBtn").addEventListener("click", () => {
        chart.exportChart({
          type: "image/png",
          filename: "somatochart",
        });
      });
    });
}

document.addEventListener("DOMContentLoaded", function () {
  loadChartData();

  document.getElementById("importBtn").addEventListener("click", () => {
    const fileInput = document.getElementById("csvFile");
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("file", file);

    fetch("/import", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.text())
      .then(() => loadChartData())
      .finally(() => {
        fileInput.value = "";
      });
  });

  document.getElementById("clearBtn").addEventListener("click", () => {
    fetch("/athletes", {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => loadChartData());
  });
});
