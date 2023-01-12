import * as React from 'react';
// import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
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
      Generalidades
    </Typography>,
    <Box>

      <Typography
        variant='h6'
      >
        - Durante una noche de descanso nuestro sueño pasa por distintas fases en las que tienen lugar diversos procesos.
      </Typography>
      <Typography
        variant='h6'
      >
        - En esta grafica puedes observar las fases del sueño de la noche indicada.
      </Typography>
    </Box>
  ),
  createData(
    <Typography
      variant='h5'
    >
      🟢 R.E.M
    </Typography>,
    <Box>

      <Typography
        variant='h6'
      >
        - La primera fase de sueño REM suele darse una vez finalizada una fase
        inicial de sueño profundo. Durante esta fase final del sueño la
        actividad del cerebro aumenta, se producen los sueños, los ojos se mueven rápidamente en distintas
        direcciones, la frecuencia cardíaca aumenta y la respiración se
        vuelve más irregular.
      </Typography>
      <Typography
        variant='h6'
      >
        - La fase REM desempeña un papel
        importante en la regulación del estado de ánimo, el aprendizaje y la
        memoria.
      </Typography>
      <Typography
        variant='h6'
      >
        - Durante esta fase final del sueño la
        actividad del cerebro aumenta, se producen los sueños, los ojos se mueven rápidamente en distintas
        direcciones, la frecuencia cardíaca aumenta y la respiración se
        vuelve más irregular.
      </Typography>
      <Typography
        variant='h6'
      >
        - La fase REM desempeña un papel
        importante en la regulación del estado de ánimo, el aprendizaje y la
        memoria.
      </Typography>
    </Box>
  ),
  createData(
    <Typography
      variant='h5'
    >
      🟣 Sueño profundo
    </Typography>,
    <Box>
      <Typography
        variant='h6'
      >
        - El sueño profundo suele darse durante las primeras horas de sueño.
        Durante el sueño profundo es más difícil despertarse, pues el cuerpo responde menos a los estímulos externos.
        La respiración se vuelve más lenta y los músculos se relajan,
        mientras que la frecuencia cardíaca se suele normalizar. Con el paso
        de los años, los adultos pueden apreciar una disminución normal del
        sueño profundo. El sueño profundo fomenta la recuperación física y los
        aspectos de la memoria, el aprendizaje y ayuda al sistema inmunológico.
      </Typography>
      <Typography
        variant='h6'
      >
        - Durante el sueño profundo es más difícil despertarse, pues el cuerpo responde menos a los estímulos externos.
        La respiración se vuelve más lenta y los músculos se relajan,
        mientras que la frecuencia cardíaca se suele normalizar. Con el paso
        de los años, los adultos pueden apreciar una disminución normal del
        sueño profundo.
      </Typography>
      <Typography
        variant='h6'
      >
        - La respiración se vuelve más lenta y los músculos se relajan,
        mientras que la frecuencia cardíaca se suele normalizar. Con el paso
        de los años, los adultos pueden apreciar una disminución normal del
        sueño profundo.
      </Typography>
      <Typography
        variant='h6'
      >
        - Con el paso de los años, los adultos pueden apreciar una disminución normal del
        sueño profundo.
      </Typography>
      <Typography
        variant='h6'
      >
        - El sueño profundo fomenta la recuperación física y los
        aspectos de la memoria, el aprendizaje y ayuda al sistema inmunológico.
      </Typography>
    </Box>
  ),
  createData(
    <Typography
      variant='h5'
    >
      🟡 Sueño ligero
    </Typography>,
    <Box>

      <Typography
        variant='h6'
      >
        - El sueño ligero sirve como punto de entrada al sueño por las noches, cuando tu cuerpo desconecta y se relaja. Esta fase comienza normalmente a los pocos minutos de quedarse dormido, favorece la recuperación física y mental. Durante la primera parte del sueño ligero, es posible que constantemente te despiertes y te vuelvas a dormir, la respiración y la frecuencia cardíaca normalmente disminuyen ligeramente durante esta fase.
      </Typography>
      <Typography
        variant='h6'
      >
        - Esta fase comienza normalmente a los pocos minutos de quedarse dormido, favorece la recuperación física y mental. Durante la primera parte del sueño ligero, es posible que constantemente te despiertes y te vuelvas a dormir, la respiración y la frecuencia cardíaca normalmente disminuyen ligeramente durante esta fase.
      </Typography>
      <Typography
        variant='h6'
      >
        - Durante la primera parte del sueño ligero, es posible que constantemente te despiertes y te vuelvas a dormir, la respiración y la frecuencia cardíaca normalmente disminuyen ligeramente durante esta fase.
      </Typography>
    </Box>
  ),
  createData(
    <Typography
      variant='h5'
    >
      🟠 Despierto
    </Typography>,

    <Typography
      variant='h6'
    >
      - Indica los momentos del sueño en los que despertó, por lo general son lapsos de solo minutos.
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