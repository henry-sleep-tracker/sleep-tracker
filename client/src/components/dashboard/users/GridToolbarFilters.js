import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const GridToolbarFilters = ({filters, setFilters}) => {

  const [ nationalities, setNationalities ] = useState([]);

  useEffect(() => {
    const getNationalities = async () => {
      await fetch(`${process.env.REACT_APP_DEFAULT_URL}/users/nationalities`)
        .then((r) => r.json())
        .then( r => setNationalities(r) );
    };
    getNationalities();
  }, []);

	return (
		<Box>
			<FormControl variant="standard" sx={{ ml: 5, mr: 2, minWidth: 125 }}>
				<InputLabel id="nationality">Nacionalidad</InputLabel>
				<Select
					labelId="nationality"
					id="nationality"
					value={filters.nationality}
					onChange={(event) => setFilters( filters => ({...filters, nationality: event.target.value}) )}
					label="nationality"
					>
					<MenuItem value=''>Todos</MenuItem>
          { nationalities.map( nationality => (
            <MenuItem value={nationality}>{nationality}</MenuItem>
          ))}
				</Select>
			</FormControl>

			<FormControl variant="standard" sx={{ mr: 2, minWidth: 125 }}>
				<InputLabel id="plan">Suscripcion</InputLabel>
				<Select
					labelId="plan"
					id="plan"
					value={filters.plan}
					onChange={(event) => setFilters( filters => ({...filters, plan: event.target.value}) )}
					label="plan"
					>
					<MenuItem value=''>Todos</MenuItem>
					<MenuItem value='Basico'>Basico</MenuItem>
					<MenuItem value='Estandar'>Estandar</MenuItem>
					<MenuItem value='Premium'>Premium</MenuItem>
				</Select>
			</FormControl>
		</Box>
 );
};

export default GridToolbarFilters;