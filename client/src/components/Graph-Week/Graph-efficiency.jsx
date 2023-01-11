import { Card, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Legend,
  Bar,
} from "recharts";



export default function GraphEff() {
  const effective = useSelector((state) => state.range);

  const data = [
    ...effective.map((d) => {
      return {
        name: d.date,
        uv: d.efficiency,
      };
    }),
  ];

  const [windowWidth, setwindowWidth] = useState(window.innerWidth)

  const handleResize = () => {
    setwindowWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
  }, [])


  return (
    <Card
      variant="outlined"
    >
      <CardContent>
        <BarChart
          width={windowWidth - 150}
          height={250}
          data={data}
        // margin={{ top: 10, left: 40, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
          />
          <XAxis
            dataKey="name"
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="uv"
            fill="#2196f3"
          />
        </BarChart>
      </CardContent>
    </Card>
  );
}





