import React from 'react';
import { PieChart, ResponsiveContainer, Pie, Tooltip, Cell } from 'recharts'
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function preventDefault(event) {
  event.preventDefault();
}

const data = [
  { name: "Basico", value: 7 },
  { name: 'Estandar', value: 3 },
  { name: 'Premium', value: 2 },
]

const COLORS = ['#ce93d8', '#5c6bc0', '#b39ddb', '#4dd0e1', '#f48fb1', '#d500f9']

export default function Deposits() {
  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Usuarios Totales
      </Typography>

      <div style={{ width: '100%', height: 400}}>
        <ResponsiveContainer>
            <PieChart>
              <Pie
                dataKey="value" 
                data={data}
                fill="#82ca9d"
                >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}     
              </Pie>
              <Tooltip />
            </PieChart>
        </ResponsiveContainer>
      </div>

      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Ver Usuarios
        </Link>
      </div>
    </>
  );
}
