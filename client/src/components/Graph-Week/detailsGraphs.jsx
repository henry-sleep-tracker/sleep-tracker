import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Generalidades:</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Durante una noche de descanso nuestro sueño pasa por distintas fases
            en las que tienen lugar diversos procesos. En esta grafica puedes
            observar las fases del sueño, de la noche indicada.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography> awake 🟠</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Indica los momentos del sueño en los que despertó, por lo general
            son lapsos de solo minutos.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>light 🟡</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            El sueño ligero sirve como punto de entrada al sueño por las noches,
            cuando tu cuerpo desconecta y se relaja. Esta fase comienza
            normalmente a los pocos minutos de quedarse dormido. Durante la
            primera parte del sueño ligero, es posible que constantemente te
            despiertes y te vuelvas a dormir. Puede que estés un poco consciente
            y tiendas a despertarte con facilidad. La respiración y la
            frecuencia cardíaca normalmente disminuyen ligeramente durante esta
            fase. El sueño ligero favorece la recuperación física y mental.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary aria-controls="panel4d-content" id="panel1d-header">
          <Typography>deep 🟣</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            El sueño profundo suele darse durante las primeras horas de sueño.
            Cuando te despiertas despejado por la mañana, es probable que hayas
            experimentado un sueño profundo durante períodos ininterrumpidos
            durante la noche anterior. Durante el sueño profundo es más difícil
            despertarse, pues el cuerpo responde menos a los estímulos externos.
            La respiración se vuelve más lenta y los músculos se relajan,
            mientras que la frecuencia cardíaca se suele normalizar. Con el paso
            de los años, los adultos pueden apreciar una disminución normal del
            sueño profundo, aunque los patrones de sueño varían según la
            persona. El sueño profundo fomenta la recuperación física y los
            aspectos de la memoria y el aprendizaje. Asimismo, se ha demostrado
            que esta fase sirve de ayuda al sistema inmunológico.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>rem 🟢</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            La primera fase de sueño REM suele darse una vez finalizada una fase
            inicial de sueño profundo. Generalmente, se experimenta la fase REM
            durante más tiempo en los ciclos de sueño que tienen lugar en la
            segunda mitad de la noche. Durante esta fase final del sueño, la
            actividad del cerebro aumenta. Los sueños se producen principalmente
            durante la fase REM y los ojos se mueven rápidamente en distintas
            direcciones. La frecuencia cardíaca aumenta y la respiración se
            vuelve más irregular. En principio, los músculos de cuello para
            abajo están inactivos para evitar reproducir las acciones de los
            sueños. Se ha demostrado que la fase REM desempeña un papel
            importante en la regulación del estado de ánimo, el aprendizaje y la
            memoria
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export function CustomizedAccordions2() {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Generalidades: </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          En esta grafica se observa La eficiencia del sueño la cual se calcula en base al tiempo dormido y el tiempo que la persona pasa en la cama, de esta manera se obtiene estimación de la calidad y características del sueño.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Porcentajes % </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Una menor eficiencia del sueño se relaciona con patrones de sueño más largos y mayor latencia del sueño. Es decir que más tiempo la persona necesita para conciliar el sueño menos eficiente es el sueño
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export function CustomizedAccordions3() {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography> Generalidades: </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            En esta grafica puedes observar las horas de sueño diarias que has tenido en el lapso de tiempo que eliges. 
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Horas de sueño</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Dormir le da al cuerpo y al cerebro tiempo para recuperarse del estrés del día. Después de una buena noche de sueño, usted se desempeña mejor y es mejor para tomar decisiones. Dormir lo ayuda a sentirse más alerta, optimista y a tener una mejor relación con las personas. Dormir también ayuda al cuerpo a combatir enfermedades. Las horas que debe dormir un adulto para un optimo rendiemiento oscilan entre las 7-8 horas diarias.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
