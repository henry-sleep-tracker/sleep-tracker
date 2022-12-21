import { User } from "./UserDB"

export let porcentage = [['dia','% porcentaje ']]
export let total = [['dia', 'horas de descanso']]
let sumary = []
let sleep = []
let fechas = []
let dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
export let semana = []

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
