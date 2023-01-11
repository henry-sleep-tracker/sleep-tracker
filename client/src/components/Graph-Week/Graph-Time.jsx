import { useSelector } from "react-redux";
import { Chart } from "react-google-charts";
import { ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@mui/material";

export default function GraphTime() {
  const effective = useSelector((state) => state.range);

  let totality = [["dia", "Horas de sueño"]];
  let sumary = [];
  let semana = [];

  for (let i = 0; i < effective.length; i++) {
    sumary.push(effective[i].duration / 1000 / 60);
    semana.push(effective[i].date);
  }

  for (let c = 0; c < sumary.length; c++) {
    totality.push([semana[c], sumary[c] / 60]);
  }

  const options1 = {
    title: `promedio de horas de descanso  ${semana[0]} - ${semana[semana.length - 1]
      }`,
    colors: ["#2196f3"],
  };

  return (
    <Card
      variant="outlined"
    >
      <CardContent>

        <ResponsiveContainer
          width={1000}
          height={500}
          // margin={{ top: 10, left: 20, bottom: 0 }}
        >
          <Chart
            data={totality}
            chartType="BarChart"
            options={options1}
            width={100}
          />
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
