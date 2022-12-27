import { Chart } from "react-google-charts";
import { porcentage, semana, total } from "./GraphW";
import React from "react";
import Graph from "../Graphs/TestGraph";
import ResponsiveAppBar from "../Home/Nav";
import './graficas.css'

const GraphWM = ()=> {

const options1 = {
    title: `Porcentaje de eficiencia de descanso semanal ${semana[0]} - ${semana[semana.length-1]}`,
    colors: ['#2196f3' ]

}

const option2 = {
    title: `Horas de descanso semanal ${semana[0]} - ${semana[semana.length-1]} `,

   
    vAxis: {

        ticks: [
            { v: 12, f: "12 hrs" },
            { v: 10, f: "10 hrs" },
            { v: 8, f: "8 hrs" },
            { v: 6, f: "6 hrs" },
            { v: 4, f: "4 hrs" },
            { v: 2, f: "2 hrs" },
          ],
      },
      colors: ['#2196f3' ]


}



return(

<div>
  
<ResponsiveAppBar/>
 <div className="graficas0"> 
<br /><br />

    <div className="gafica1" > 
        <Graph/> 
        <div className="descgraph" >
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit dolorem sit libero necessitatibus recusandae eius voluptatibus incidunt ipsam asperiores vel magni totam dolor, reprehenderit deserunt unde maxime dolores earum animi?
</div>
        </div>
        <hr />





    <div className="grafica2"> 
        <h4>{options1.title}</h4>

        <Chart
        options={options1}
        chartType='Bar'
        data={porcentage}
        height='400px'
   
        
        />  <div className="descgraph">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit dolorem sit libero necessitatibus recusandae eius voluptatibus incidunt ipsam asperiores vel magni totam dolor, reprehenderit deserunt unde maxime dolores earum animi?
</div>
    </div>
    <hr />
  

    <div className="gafica3" >
<Chart
data={total}
chartType='BarChart'
options={option2}
height='400px'


/>
 <div className="descgraph">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit dolorem sit libero necessitatibus recusandae eius voluptatibus incidunt ipsam asperiores vel magni totam dolor, reprehenderit deserunt unde maxime dolores earum animi?
</div>
    </div>
   



</div>
</div>


)



}

export default GraphWM;