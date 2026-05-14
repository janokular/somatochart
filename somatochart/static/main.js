function loadChartData() {
  fetch("/athletes")
    .then((response) => response.json())
    .then((athletes) => {
      const chart = Highcharts.chart("chart", {
        chart: {
          type: "scatter",
          width: 750,
          height: 750,
          plotBackgroundImage: "static/images/background.svg",
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

      document.getElementById("exportBtn").addEventListener("click", () => {
        chart.exportChart({
          type: "image/png",
          filename: "somatochart",
        });
      });
    });
}

document.addEventListener("DOMContentLoaded", function () {
  loadChartData();

  const fileInput = document.getElementById("csvFile");
  const importBtn = document.getElementById("importBtn");
  const clearBtn = document.getElementById("clearBtn");

  importBtn.addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.addEventListener("change", () => {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("file", file);

    fetch("/athletes", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then(() => loadChartData());
  });

  clearBtn.addEventListener("click", () => {
    fetch("/athletes", {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => loadChartData());
  });
});
