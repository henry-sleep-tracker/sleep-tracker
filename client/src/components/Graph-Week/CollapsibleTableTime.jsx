import * as React from 'react';
// import PropTypes from 'prop-types';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import InfoIcon from '@mui/icons-material/Info';
import PercentIcon from '@mui/icons-material/Percent';
import Box from '@mui/material/Box';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

function createData(name, description) {
  return {
    name,
    description,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>

              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>{row.description}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData(
    <Typography
      variant='h5'
    >
      {<InfoIcon />}
      _ Acerca de la grafica de horas de sueño
    </Typography>
    ,

    <Typography
      variant='h6'
    >
      - En esta grafica puedes observar las horas de sueño diarias que has tenido en el lapso de tiempo que eliges.
    </Typography>
    ,

  ),
  createData(
    <Typography
      variant='h5'
    >
      {<HourglassBottomIcon />}
      _ Horas de sueño
    </Typography>,

    <Typography
      variant='h6'
    >
      - Dormir le da al cuerpo y al cerebro tiempo para recuperarse del estrés del día. Después de una buena noche de sueño, usted se desempeña mejor y es mejor para tomar decisiones. Dormir lo ayuda a sentirse más alerta, optimista y a tener una mejor relación con las personas. Dormir también ayuda al cuerpo a combatir enfermedades. Las horas que debe dormir un adulto para un optimo rendiemiento oscilan entre las 7-8 horas diarias.
    </Typography>
  ),

];

export default function CollapsibleTable() {
  return (
    <TableContainer
      component={Paper}
      sx={{ width: { md: '700px', xs: '350px' }, }}
    >
      <Table aria-label="collapsible table">
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}