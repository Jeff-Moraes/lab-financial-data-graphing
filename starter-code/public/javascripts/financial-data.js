const getStockData = (from, to, currency = "EUR") => {
  let http = "";
  if (from && to) {
    http = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${from}&end=${to}&currency=${currency}`;
  } else {
    http = `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}`;
  }

  axios
    .get(http)
    .then((response) => {
      const responseKeys = Object.keys(response.data.bpi);
      const responseValues = Object.values(response.data.bpi);

      document.getElementById("max").innerText = Math.max(...responseValues);
      document.getElementById("min").innerText = Math.min(...responseValues);

      drawCanvas(responseKeys, responseValues);
    })
    .catch((err) => {
      console.log(err);
    });
};

const drawCanvas = (labels, data) => {
  const ctx = document.getElementById("myChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          label: "Stocks chart",
          data: data,
        },
      ],
    },
  });
};

let from = document.getElementById("from").value;
let to = document.getElementById("to").value;
let currency = document.getElementById("currency").value;

const callEverything = () => {
  from = document.getElementById("from").value;
  to = document.getElementById("to").value;
  currency = document.getElementById("currency").value;
  getStockData(from, to, currency);
};

const select = document.querySelectorAll("select");
select.forEach((selec) => {
  selec.addEventListener("change", callEverything);
});

const inputs = document.querySelectorAll("input");
inputs.forEach((input) => {
  input.addEventListener("change", callEverything);
});

getStockData(from, to);
