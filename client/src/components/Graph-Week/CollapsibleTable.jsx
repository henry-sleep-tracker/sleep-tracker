import React from "react";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

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
      "El sueño ligero sirve como punto de entrada al sueño por las noches, es cuando tu cuerpo se desconecta y se relaja.",
      "Esta fase comienza normalmente a los pocos minutos de quedarse dormido y es muy importante porque favorece la recuperación física y mental.",
    ],
  },
  {
    name: "🟣 Sueño profundo",
    items: [
      "El sueño profundo suele darse durante las primeras horas de sueño. Durante el sueño profundo es más difícil despertarse, pues el cuerpo responde menos a los estímulos externos.",
      "Esta etapa del sueño fomenta la recuperación física y los aspectos de la memoria, el aprendizaje y ayuda al sistema inmunológico.",
    ],
  },
  {
    name: "🟢 R.E.M",
    items: [
      "La primera fase de sueño REM suele darse una vez finalizada la fase inicial de sueño profundo.",
      "La fase REM desempeña un papel importante en la regulación del estado de ánimo, el aprendizaje y la memoria.",
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
            <Typography sx={{ fontSize: 18, padding: 0 }}>
              {row.name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {row.items?.map((item, i) => (
              <Typography key={`detail${i}`} sx={{ fontSize: 16 }}>
                {item}
              </Typography>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
