function loadData() {
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
            "fontFamily": "monospace",
          },
        },
        title: {
          text: "SomatoChart",
          align: "left",
        },
        xAxis: [{
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
        }, {
          title: "",
          lineColor: "#ccc",
          lineWidth: 1,
          opposite: true,
        }],
        yAxis: [{
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
        }, {
          title: "",
          lineColor: "#ccc",
          lineWidth: 1,
          opposite: true,
        }],
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
          chartOptions: {
            chart: {
              plotBackgroundImage: "static/assets/chart-background.jpg",
            },
          },
        },
        series: [
          {
            type: "scatter",
            animation: false,
            enableMouseTracking: false,
            data: athletes
              .filter((a) => a.isVisible)
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
              })
            ),
          },
        ],
      });

      const list = document.getElementById("list");
      list.innerHTML = "";
      athletes.forEach(a => {
        const li = document.createElement("li");
        li.textContent = `${a.name} endo: ${a.endo} meso: ${a.meso} ecto: ${a.ecto} ${a.color} ${a.symbol} ${a.isVisible}`;

        // const updateBtn = document.createElement("button");
        // updateBtn.textContent = "Update";
        // updateBtn.addEventListener("click", () => {
        //   console.log(`updated ${a._id}`);
        // });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => {
          fetch(`/athletes/${a._id}`, { method: "DELETE" })
            .then((res) => res.json())
            .then(() => loadData());
        });

        // li.appendChild(updateBtn);
        li.appendChild(deleteBtn);
        list.appendChild(li);
      });

      document
        .getElementById("downloadBtn")
        .addEventListener("click", () => {   
          chart.exportChart({
            type: 'image/jpg',
            filename: 'somatochart',
          });
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
  loadData();

  document
    .getElementById("addForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const name = e.target.name.value;
      const endo = e.target.endo.value;
      const meso = e.target.meso.value;
      const ecto = e.target.ecto.value;
      const color = e.target.color.value;
      const symbol = e.target.symbol.value;
      const isVisible = e.target.isVisible.value === "true";
      e.target.reset();

      fetch("/athletes", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          name,
          endo: Number(endo),
          meso: Number(meso),
          ecto: Number(ecto),
          color,
          symbol,
          isVisible,
        }),
      })
        .then((res) => res.json())
        .then(() => loadData());
    });

  // document
  //   .getElementById("updateForm")
  //   .addEventListener("submit", function (e) {
  //     e.preventDefault();
  //     const id = e.target.id.value;
  //     const name = e.target.name.value;
  //     const endo = e.target.endo.value;
  //     const meso = e.target.meso.value;
  //     const ecto = e.target.ecto.value;
  //     const color = e.target.color.value;
  //     const symbol = e.target.symbol.value;
  //     const isVisible = (e.target.isVisible.value === "true");
  //     e.target.reset();

  //     fetch(`/athletes/${id}`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json; charset=utf-8" },
  //       body: JSON.stringify({
  //         name,
  //         endo: Number(endo),
  //         meso: Number(meso),
  //         ecto: Number(ecto),
  //         color,
  //         symbol,
  //         isVisible,
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then(() => loadChartAndList());
  //   });
  
  document
    .getElementById("clearBtn")
    .addEventListener("click", () => {
      fetch('/athletes', {
        method: "DELETE"
      })
        .then((res) => res.json())
        .then(() => loadData());
  });
});
