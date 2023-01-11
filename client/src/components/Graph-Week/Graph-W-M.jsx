import React from "react";
import ResponsiveAppBar from "../Home/Nav";
import RangeCalendar from "../Calendario/RangeCalendar";
import { CustomizedAccordions2, CustomizedAccordions3 } from "./detailsGraphs";
import DualGraph from "./DualGraph";
import GraphEff from "./Graph-efficiency";
import GraphTime from "./Graph-Time";
import GraphRecord from "./Graph-Records";

const GraphWM = () => {


  return (
    <div>
      <div className="graficas0">
        <br />
        <br />
        <div>
          <RangeCalendar />
        </div>
        <div>
          <DualGraph />
        </div>

        <div className="grafica2">
          {/* <h4>{options1.title}</h4> */}

          <GraphEff />

          <div className="descgraph">
            <CustomizedAccordions2 />
          </div>
        </div>
        <hr />

        <div className="gafica3">
          <GraphTime />
          <div className="descgraph">
            <CustomizedAccordions3 />
          </div>
        </div>
      </div>
      <GraphRecord/>
    </div>
  );
};

export default GraphWM;
