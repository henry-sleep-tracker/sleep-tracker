import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import Typography from '@mui/material/Typography';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function NumberUsersPerPlan() {

  const [ numberUsersPerPlan, setNumberUsersPerPlan ] = useState(null);

  useEffect(() => {
    const fn = async () => {
      await fetch(`${process.env.REACT_APP_DEFAULT_URL}/users/numberUsersPerPlan`)
        .then((r) => r.json())
        .then( r => setNumberUsersPerPlan( r ));
    };
    fn();
  }, []);

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" align='center' gutterBottom>
        Proporcion de usuarios por Plan
      </Typography>

      { numberUsersPerPlan? (
        <ResponsiveContainer width="100%" height="100%">
        <PieChart >
          <Pie
            data={numberUsersPerPlan}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            >
            {numberUsersPerPlan.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      ):(
        <p>Cargando...</p>
      )
      }
    </React.Fragment>
  );
}
