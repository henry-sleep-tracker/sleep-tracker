import React from "react";
import Collection from "./resume";
import Graph from "../Graphs/TestGraph";
import ResponsiveAppBar from "./Nav";
import "./home.css";
import Calc from "./calc";
import Swipeable from "./tips";
import { Grid } from "@mui/material";

const Home = () => {
  let user = {
    name: "Juan",
    sueño: [1, 3, 2, 4, 5, 1, 3, 2, 1, 5, 3, 4],
    consumo: {
      cafeina: "",
      alcohol: "2 cervezas, 3 mojitos",
      comida: "19:00",
      ejercicio: { tiempo: "30 minutos", tipo: "caminata" },
    },
  };
  let consumed = user.consumo;
  const dream = user.sueño;

  let prueba = [["horas de sueño", "profundidad de sueño"]];
  for (let i = 0; i < dream.length; i++) {
    prueba.push([i + 1, dream[i]]);
  }

  const greet = () => {
    var text = "";
    var now = new Date();
    var time = now.getHours();
    if (time >= 5 && time < 13) {
      text = "Buenos días! ☀️ ";
    } else if (time >= 13 && time < 21) {
      text = "Buenas tardes! 🌎";
    } else {
      text = "Buenas noches! 🌙 ";
    }
    return text;
  };

  return (
    <div className="Home">
      <div>
        <ResponsiveAppBar />
        <p className="saludo">
          ¡Hola {user.name} {greet()}
        </p>
      </div>
      <br />
      <Grid className="containerHome">
        <div className="graphHome">
          <Graph />
        </div>
        <div className="calc">
          <Calc />
        </div>
        <div className="swipeableHome">
          <Swipeable className="swipeable" />
        </div>
        <div className="Collection">
          <Collection arg={consumed} />
        </div>
      </Grid>
    </div>
  );
};

export default Home;
