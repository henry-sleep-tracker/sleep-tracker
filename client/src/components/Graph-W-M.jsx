import { Chart } from "react-google-charts";

const GraphWM = ()=> {

let User =  [{
    
    "sleep": [
        {
            "dateOfSleep": "2022-12-14",
            "duration": 25020000,
            "efficiency": 57,}
            
    ],
    "summary": {
        "stages": {
            "deep": 76,
            "light": 204,
            "rem": 96,
            "wake": 41
        },
        "totalMinutesAsleep": 476,
        "totalSleepRecords": 1,
        "totalTimeInBed": 417
    }
    
},
{
    
    "sleep": [
        {
            "dateOfSleep": "2022-12-15",
            "duration": 25020000,
            "efficiency": 75,}
            
    ],
    "summary": {
        "stages": {
            "deep": 76,
            "light": 204,
            "rem": 96,
            "wake": 41
        },
        "totalMinutesAsleep": 306,
        "totalSleepRecords": 1,
        "totalTimeInBed": 417
    }
    
},
{
    
    "sleep": [
        {
            "dateOfSleep": "2022-12-16",
            "duration": 25020000,
            "efficiency": 97,}
            
    ],
    "summary": {
        "stages": {
            "deep": 76,
            "light": 204,
            "rem": 96,
            "wake": 41
        },
        "totalMinutesAsleep": 476,
        "totalSleepRecords": 1,
        "totalTimeInBed": 417
    }
    
},
{
    
    "sleep": [
        {
            "dateOfSleep": "2022-12-17",
            "duration": 25020000,
            "efficiency": 87,}
            
    ],
    "summary": {
        "stages": {
            "deep": 76,
            "light": 204,
            "rem": 96,
            "wake": 41
        },
        "totalMinutesAsleep": 496,
        "totalSleepRecords": 1,
        "totalTimeInBed": 417
    }
    
},
{
    
    "sleep": [
        {
            "dateOfSleep": "2022-12-18",
            "duration": 25020000,
            "efficiency": 100,}
            
    ],
    "summary": {
        "stages": {
            "deep": 76,
            "light": 204,
            "rem": 96,
            "wake": 41
        },
        "totalMinutesAsleep": 476,
        "totalSleepRecords": 1,
        "totalTimeInBed": 417
    }
    
},
{
    
    "sleep": [
        {
            "dateOfSleep": "2022-12-19",
            "duration": 25020000,
            "efficiency": 75,}
            
    ],
    "summary": {
        "stages": {
            "deep": 76,
            "light": 204,
            "rem": 96,
            "wake": 41
        },
        "totalMinutesAsleep": 376,
        "totalSleepRecords": 1,
        "totalTimeInBed": 417
    }
    
},
{
    
    "sleep": [
        {
            "dateOfSleep": "2022-12-20",
            "duration": 25020000,
            "efficiency": 57,}
            
    ],
    "summary": {
        "stages": {
            "deep": 76,
            "light": 204,
            "rem": 96,
            "wake": 41
        },
        "totalMinutesAsleep": 596,
        "totalSleepRecords": 1,
        "totalTimeInBed": 417
    }
    
},
]


let porcentage = [['dia','% porcentaje ']]
let total = [['dia', 'horas de descanso']]
let sumary = []
let sleep = []
let fechas = []
let dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
let semana = []

for (let i = 0; i < User.length; i++) { 

   sleep.push(User[i].sleep) // el array de sueño del objeto usuario 
    sumary.push(User[i].summary.totalMinutesAsleep)
   semana.push(User[i].sleep[0].dateOfSleep)
}


for (let a = 0; a < sleep.length; a++) {  
   fechas.push(new Date(sleep[a][0].dateOfSleep).getDay()) // el objeto dataofsleep del array sueño del objeto usuario, en formato de fecha numero
};

for (let b = 0; b < fechas.length; b++) {

       fechas[b] = dias[fechas[b]] // el objeto dataofsleep del array sueño del objeto usuario, en formato de fecha dia        
}

for (let c = 0; c < sleep.length; c++) {
   porcentage.push( [fechas[c],sleep[c][0].efficiency])  
   total.push([fechas[c] , sumary[c]/60  ])
}


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