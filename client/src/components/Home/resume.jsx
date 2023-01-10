import { Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";
const Collection = () => {
 
  const record = useSelector((state) => state?.record.recordsUser)
   
  let caffeine = []
  let drink = []
  let activity = []
  let mealtime = []
  let cafe 
  let drinks
  let meal
  let activities 
  let title 

  if(record.length)
  
  {
    title = record[0].dateMeal
    for (let i = 0; i < record.length; i++) {
   if(record[i].coffees !== "sin registro") caffeine.push(record[i].coffees + ' ');
   if(record[i].drinks !== "sin registro") drink.push(record[i].drinks + ' ');
   if(record[i].activities !== "sin registro") activity.push(record[i].activities + ' ')
  }
  mealtime.push(record[record.length -1].timeMeal)
  
  if (!caffeine) {
    cafe = "no hay registro";
  } else{
   cafe = caffeine.flat() 
  }

  if (!drink) {
    drinks = "no hay registro";
  } else {
    drinks = drink.flat()
  }

  if (!mealtime) {
    meal = "no hay registro";
  } else {
    meal = mealtime[0]
  }
  if (!activity) {
    activities = "no hay registro";
  } else {
    activities = activity.flat()
  }
} else {

   cafe = 'No hay registros'
  drinks = 'No hay registros'
   meal = 'No hay registros'
  activities  = 'No hay registros'
  title = ' No hay registros del dia seleccionado'
}

  const dataTable = [['Registro de consumo', 'Especificaciones del respectivo consumo', ],
  ['Cafe', `${cafe.length?cafe: 'No hay registro'}`, ], ['Bebidas Alcoholicas', `${drinks.length? drinks : 'No hay registro'}`, ], ['Horario de merienda', `${meal.length?meal: 'No hay registro'}`, ], ['Ejercicio', `${activities.length? activities: 'No hay registro'}`]]


  const optionT = {
    title: ' Consumo diario:',
    allowHtml: true,

  }

  const formatters = [
    {
      type: "ColorFormat",

      column: 1,
      ranges: [
        [null, null, "black", 'rgba(0, 122, 244, 0.533)'],
      ],
    },
    {
      type: "ColorFormat",
      column: 0,
      ranges: [
        [null, null, "black", 'rgba(0, 122, 244, 0.533)'],
      ],
    },

  ];

  return (
    <Card
      className="titleresume"
      variant='outlined'
    >
      <CardContent>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction='column'
          spacing={1}
          flex={4}
          p={2}
        >
          <Grid
            item
          >

            <Typography
              variant='h4'
            >
              Registro de consumo del: 
             <p>{ title}</p> 
            </Typography>
          </Grid>
          
          <Grid
            item
          >

            <Chart
              chartType='Table'
              options={optionT}
              data={dataTable}
              formatters={formatters}
            />
          </Grid>
        </Grid>

      </CardContent>
    </Card>

  );
};

export default Collection;
