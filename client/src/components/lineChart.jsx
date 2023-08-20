import React from "react";

import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const data = {
  labels: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь"],
  datasets: [
    {
      label: "",
      backgroundColor: "rgb(255,99,132)",
      borderColor: "rgb(255,99,132)",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
  ],
};

const LineChart = () => {
  return (
    <div className="bg-white border border-sedondary">
      <Line data={data}></Line>
    </div>
  );
};

export default LineChart;
