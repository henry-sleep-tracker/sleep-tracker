import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Typography from '@mui/material/Typography';

export default function NewUsersLastWeek(){

  const [ newUsersLastWeek, setNewUsersLastWeek ] = useState(null);

  useEffect(() => {
    const fn = async () => {
      await fetch('http://localhost:3001/users/newUsersLastWeek')
        .then((r) => r.json())
        .then( r => setNewUsersLastWeek( r ));
    };
    fn();
  }, []);

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" align='center' gutterBottom>
        Cantidad de nuevos usuarios en la última semana
      </Typography>

      { newUsersLastWeek? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={newUsersLastWeek}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={20}
          >
            <XAxis dataKey="day" scale="point" padding={{ left: 10, right: 10 }} />
            <YAxis />
            <Tooltip />
            {/* <Legend /> */}
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="usuarios" fill="#0088FE" background={{ fill: '#eee' }} />
          </BarChart>
        </ResponsiveContainer>
      ):(
        <p>Cargando...</p>
      )
      }
    </React.Fragment>
  );
}