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
              })),
          },
        ],
      });

      const list = document.getElementById("list");
      list.innerHTML = athletes.length == 0 ? "" : tableHeader();
      athletes.forEach((a) => {
        const li = document.createElement("li");
        li.textContent = tableRow(a);

        // TODO: update
        const updateBtn = document.createElement("button");
        updateBtn.textContent = "Edit";
        updateBtn.addEventListener("click", () => {
          console.log(`updated ${a._id}`);
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Del";
        deleteBtn.addEventListener("click", () => {
          fetch(`/athletes/${a._id}`, { method: "DELETE" })
            .then((res) => res.json())
            .then(() => loadData());
        });

        li.appendChild(updateBtn);
        li.appendChild(deleteBtn);
        list.appendChild(li);
      });

      document.getElementById("downloadBtn").addEventListener("click", () => {
        chart.exportChart({
          type: "image/jpg",
          filename: "somatochart",
        });
      });
    });
}

const DECIMAL_PRECISION = 2;
const MAX_NAME_COL_LEN = 20;
const MAX_MARKER_COL_LEN = 14;
const MAX_VISIBILITY_COL_LEN = 6;
const COL_SEPARATOR = " | ";

function tableHeader() {
  const NAME_COL_HEADER = "NAME";
  const ENDO_COL_HEADER = "ENDO";
  const MESO_COL_HEADER = "MESO";
  const ECTO_COL_HEADER = "ECTO";
  const MARKER_COL_HEADER = "MARKER";
  const VISIBILITY_COL_HEADER = "SHOW";

  return `<li>${
    NAME_COL_HEADER +
    tableEvenSpaces(MAX_NAME_COL_LEN, NAME_COL_HEADER.length) +
    COL_SEPARATOR +
    ENDO_COL_HEADER +
    COL_SEPARATOR +
    MESO_COL_HEADER +
    COL_SEPARATOR +
    ECTO_COL_HEADER +
    COL_SEPARATOR +
    MARKER_COL_HEADER +
    tableEvenSpaces(MAX_MARKER_COL_LEN, MARKER_COL_HEADER.length) +
    COL_SEPARATOR +
    VISIBILITY_COL_HEADER
  }</li>`;
}

function tableRow(athlete) {
  const name = athlete.name;
  const endo = athlete.endo.toFixed(DECIMAL_PRECISION);
  const meso = athlete.meso.toFixed(DECIMAL_PRECISION);
  const ecto = athlete.ecto.toFixed(DECIMAL_PRECISION);
  const marker = athlete.color.concat(" ", athlete.symbol);
  const visibility = athlete.isVisible.toString();

  return `${
    name +
    tableEvenSpaces(MAX_NAME_COL_LEN, name.length) +
    COL_SEPARATOR +
    endo +
    COL_SEPARATOR +
    meso +
    COL_SEPARATOR +
    ecto +
    COL_SEPARATOR +
    marker +
    tableEvenSpaces(MAX_MARKER_COL_LEN, marker.length) +
    COL_SEPARATOR +
    visibility +
    tableEvenSpaces(MAX_VISIBILITY_COL_LEN, visibility.length)
  }`;
}

function tableEvenSpaces(maxColLen, valueLen) {
  return " ".repeat(maxColLen - valueLen);
}

document.addEventListener("DOMContentLoaded", function () {
  loadData();

  document.getElementById("addForm").addEventListener("submit", function (e) {
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

  document.getElementById("clearBtn").addEventListener("click", () => {
    fetch("/athletes", {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => loadData());
  });
});
