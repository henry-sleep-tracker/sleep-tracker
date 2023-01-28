import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const rows = [
  {
    name: "🟠 Despierto",
    items: [
      "Indica los momentos del sueño en los que despertaste. Usualmente pueden ser entre 10-30 despertares por noche, pero son tan cortos, que es probable que no recuerdes que despertaste.",
    ],
  },
  {
    name: "🟡 Sueño ligero",
    items: [
      "Durante el sueño ligero, tu cuerpo se desconecta y se relaja.",
      "Esta fase es muy importante porque favorece la recuperación física y mental.",
    ],
  },
  {
    name: "🟣 Sueño profundo",
    items: [
      "Durante el sueño profundo es más difícil despertarse, pues el cuerpo responde menos a los estímulos externos.",
      "Fomenta la recuperación física y los aspectos de la memoria, el aprendizaje y ayuda al sistema inmunológico.",
    ],
  },
  {
    name: "🟢 R.E.M",
    items: [
      "La primera fase de sueño REM suele darse una vez finalizada la fase inicial de sueño profundo.",
      "Desempeña un papel importante en la regulación del estado de ánimo, el aprendizaje y la memoria.",
    ],
  },
];

export default function CollapsibleTable() {
  return (
    <div>
      {rows.map((row, ind) => (
        <Card sx={{ minWidth: 275, marginBottom: 3 }}>
          <CardContent>
            <Typography
              key={`title${ind}`}
              sx={{ fontSize: 16, fontWeight: "medium", padding: 0.5 }}
            >
              {row.name}
            </Typography>
            {row.items?.map((item, i) => (
              <Typography
                key={`detail${i}`}
                sx={{ fontSize: 14, color: "grey" }}
              >
                {item}
              </Typography>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
