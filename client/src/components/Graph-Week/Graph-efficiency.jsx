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
        uv: d.efficiency,
      };
    }),
  ];

  return (
    <div>
      <BarChart width={530} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="uv" fill="#2196f3" />
      </BarChart>
    </div>
  );
}
