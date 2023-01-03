import { Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import { Chart } from "react-google-charts";
const Collection = (consumed) => {
  let { cafeina, alcohol, ejercicio, comida } = consumed.arg;
  let { tipo, tiempo } = ejercicio


  if (!cafeina) {
    cafeina = "no hay registro";
  }
  if (!alcohol) {
    alcohol = "no hay registro";
  }
  if (!comida) {
    comida = "no hay registro";
  }
  if (!ejercicio) {
    ejercicio = "no hay registro";
  }

  const dataTable = [['Registro', 'Cantidad / Hora / Tiempo', 'Medidas'],
  ['Consumo de cafe', `${cafeina}`, 'Tazas'], ['Consumo de Alcohol', `${alcohol}`, 'Copas'], ['Horario de merienda', `${comida}`, 'Horas'], ['Ejercicio', `${tiempo}`, `${tipo}`]]


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
    {
      type: "ColorFormat",
      column: 2,
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
              Registro del dia:
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
