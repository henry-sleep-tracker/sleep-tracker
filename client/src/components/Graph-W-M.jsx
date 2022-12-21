import { Chart } from "react-google-charts";
import { porcentage, semana, total } from "./GraphW";
import React from "react";

const GraphWM = ()=> {






const options1 = {
    title: `Porcentaje de porcentaje de sueño semanal ${semana[0]} - ${semana[semana.length-1]}`
}

const option2 = {
    title: `Horas de descanso semanal ${semana[0]} - ${semana[semana.length-1]} `
}


return(
<div>

    <h2>{options1.title}</h2>
    <hr />

    <div>

        <Chart
        options={options1}
        chartType='Bar'
        data={porcentage}
        width='100%'
        />
    </div>

<hr />
<h2>{option2.title}</h2>
    <div>
<Chart
data={total}
chartType='LineChart'

/>

    </div>



</div>


)



}

export default GraphWM;