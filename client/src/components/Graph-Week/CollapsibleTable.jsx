import React from "react";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

const rows = [
  {
    name: "Generalidades",
    items: [
      "- Durante una noche de descanso nuestro sueño pasa por distintas fases en las que tienen lugar diversos procesos.",
      "- En esta grafica puedes observar las fases del sueño de la noche indicada.",
    ],
  },
  {
    name: "🟢 R.E.M",
    items: [
      "- La primera fase de sueño REM suele darse una vez finalizada una fase inicial de sueño profundo.",
      "- La fase REM desempeña un papelcimportante en la regulación del estado de ánimo, el aprendizaje y la memoria.",
    ],
  },
  {
    name: "🟣 Sueño profundo",
    items: [
      "- El sueño profundo suele darse durante las primeras horas de sueño. Durante el sueño profundo es más difícil despertarse, pues el cuerpo responde menos a los estímulos externos.",
      "- El sueño profundo fomenta la recuperación física y los aspectos de la memoria, el aprendizaje y ayuda al sistema inmunológico.",
    ],
  },
  {
    name: "🟡 Sueño ligero",
    items: [
      "- El sueño ligero sirve como punto de entrada al sueño por las noches, cuando tu cuerpo desconecta y se relaja.",
      "- Esta fase comienza normalmente a los pocos minutos de quedarse dormido, favorece la recuperación física y mental.",
      "Durante la primera parte del sueño ligero, es posible que constantemente te despiertes y te vuelvas a dormir, la respiración y la frecuencia cardíaca normalmente disminuyen ligeramente durante esta fase.",
    ],
  },
  {
    name: "🟠 Despierto",
    items: [
      "- Indica los momentos del sueño en los que despertó, por lo general son lapsos de solo minutos.",
    ],
  },
];

export default function CollapsibleTable() {
  return (
    <div>
      {rows.map((row, ind) => (
        <Accordion key={`row${ind}`}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6">{row.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {row.items?.map((item, i) => (
              <Typography key={`detail${i}`}>{item}</Typography>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
