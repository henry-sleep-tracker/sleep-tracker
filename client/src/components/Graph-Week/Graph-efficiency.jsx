import { useSelector } from "react-redux";
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
  const effective = useSelector((state) => state.session);

  const data = [
    ...effective.map((d) => {
      return {
        name: d.date,
        eficiencia: d.efficiency,
      };
    }),
  ];

  return (
    <div>
      <BarChart width={530} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis  tickFormatter={(value) => { 
          if (value) {
            const hours = value
            return `${hours}%`;
          }
        }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="eficiencia" fill="#2196f3" />
      </BarChart>
    </div>
  );
}
