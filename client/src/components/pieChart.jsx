import React from "react";

import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";

const data = {
  labels: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь"],
  datasets: [
    {
      label: "",
      backgroundColor: "rgb(255,99,132)",
      borderColor: "rgb(55,99,132)",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
  ],
};
const PieChart = () => {
  return (
    <div className="bg-white border border-sedondary">
      <Pie data={data}></Pie>
    </div>
  );
};

export default PieChart;
