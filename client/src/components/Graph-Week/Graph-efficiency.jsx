import { Card, CardContent } from "@mui/material";
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

  return (
    <Card
      variant="outlined"
    >
      <CardContent>
        <BarChart
          width={530}
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





