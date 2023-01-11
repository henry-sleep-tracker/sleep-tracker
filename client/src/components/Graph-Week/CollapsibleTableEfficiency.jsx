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
      _ Acerca de la grafica de eficiencia de sueño
    </Typography>
    ,

    <Typography
      variant='h6'
    >
      - En esta grafica se observa La eficiencia del sueño la cual se calcula en base al tiempo dormido y el tiempo que la persona pasa en la cama, de esta manera se obtiene estimación de la calidad y características del sueño.
    </Typography>
    ,

  ),
  createData(
    <Typography
      variant='h5'
    >
      {<PercentIcon />}
      _ Porcentajes
    </Typography>,

    <Typography
      variant='h6'
    >
      - Una menor eficiencia del sueño se relaciona con patrones de sueño más largos y mayor latencia del sueño. Es decir que más tiempo la persona necesita para conciliar el sueño menos eficiente es el sueño.
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