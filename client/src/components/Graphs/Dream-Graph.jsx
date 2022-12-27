import { Chart } from "react-google-charts";
import React from "react";

const Graph = (prueba) => {
 let data = prueba.prueba;

  return (
    <div>
      <Chart chartType="Bar" data={data} />
    </div>
  );
};

export default Graph;
