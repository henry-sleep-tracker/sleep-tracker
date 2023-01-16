import { Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Collection = () => {
  const records = useSelector((state) => state?.record.recordsUser);


  let consumos = [];
  let Exercise = [];
  let Coffe = [];
  let Drinks = [];
  let timeEx;
  let typeEx;
  let cups;
  let size;
  let countD;
  let typeD;

  if (!records.message)  {

  for (let i = 0; i < records.length; i++) {
    if (records[i].timeActivity.length >= 1) {
      timeEx = records[i].timeActivity.flat();
      typeEx = records[i].nameActivity.flat();

      for (let i = 0; i < timeEx.length; i++) {
        Exercise.push(` ${timeEx[i]} min de ${typeEx[i]} `);
      }
    }

    if (records[i].coffeeConsumption.length >= 1) {
      cups = records[i].coffeeConsumption.flat();
      size = records[i].coffeSize.flat();

      for (let i = 0; i < cups.length; i++) {
        cups[i] > 1
          ? Coffe.push(` ${cups[i]} tazas de ${size[i]} `)
          : Coffe.push(` ${cups[i]} taza de ${size[i]} `);
      }
    }

    if (records[i].drinkConsumption.length >= 1) {
      countD = records[i].drinkConsumption.flat();
      typeD = records[i].typeDrink.flat();

      for (let i = 0; i < countD.length; i++) {
        countD[i] > 1
          ? Drinks.push(` ${countD[i]} ${typeD[i]}s `)
          : Drinks.push(` ${countD[i]} ${typeD[i]} `);
      }
    }

    let consumo = {
      userId: records[0].userId,
      Exercise: Exercise,
      Cafe: Coffe,
      Bebidas: Drinks,
      Merienda:
        records[records.length - 1].timeMeal.slice(0, -3) +
        " " +
        records[records.length - 1].description,
      Date: records[0].dateMeal,
    };
    console.log('consumooo', consumo);
     consumos.push(consumo);
  }
}


  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData(
      "Cafe", `${consumos[0]?.Cafe ? consumos[0].Cafe : "No hay registro"}`
    ),
    createData(
      "Bebidas alcoholicas", 
      `${
        consumos[0]?.Bebidas
          ? consumos[0].Bebidas
          : "No hay registro"
      }`
    ),
    createData(
      "Horario de merienda", 
      `${
        consumos[0]?.Merienda
          ? consumos[0].Merienda
          : "No hay registro"
      }`
    ),
    createData(
      "Ejercicio",
      `${
        consumos[0]?.Exercise
          ? consumos[0].Exercise
          : "No hay registro"
      }`
    ),
  ];

  return (
    <Card className="titleresume" variant="outlined">
      <CardContent>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction="column"
          spacing={1}
          flex={4}
          p={2}
        >
          <Grid item>
            <Typography variant="h4">
              Registro de consumo del:
              <p>
                {consumos[0]?.Date
                  ? consumos[0].Date
                  : "No hay registro de ese día"}
              </p>
            </Typography>
          </Grid>
          <Grid item>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 350 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Registro</StyledTableCell>
                    <StyledTableCell align="right">Detalles</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.calories}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Collection;
