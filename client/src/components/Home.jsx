import React from "react";
import { Link } from "react-router-dom";
import Collection from "./resume";
import GraphD from "./Graph-Day";



const Home = () => {
  let user = {
    name: "Juan",
    sueño: [1, 3, 2, 4, 5, 1, 3, 2, 1, 5, 3, 4],
    consumo: {
      cafeina: "",
      alcohol: "2 cervezas, 3 mojitos",
      comida: "19:00 pm",
      ejercicio: "30 min de caminata",
    },
  };
  const consumed = user.consumo;
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
      text = "Buenos días";
    } else if (time >= 13 && time < 21) {
      text = "Buenas tardes";
    } else {
      text = "Buenas noches";
    }
    return text;
  };

  return (
    <div>
      <nav>
        <ul>
          <Link to="/perfil">
            <li>Perfil</li>
          </Link>
          <Link to="/desarrolladores">
            <li>Conoce al equipo</li>
          </Link>
          <Link to="/">
            <li>Salir</li>
          </Link>
        </ul>
      </nav>
      <div>
        <p>
          ¡Hola {user.name} {greet()}!{" "}
        </p>
      </div>
      <div>
        GRAFICA:
        <GraphD prueba={prueba} />
        <Link to='/graficas' ><p>Ver Más</p></Link>
      </div>

      <div>
        <span> Registro del dia: </span>

        <Collection arg={consumed} />
      </div>

      <Link to="/actividad">
        <input type="button" value="Nueva Actividad" />
      </Link>
      <button>
        <a href="/pdf" download={"pdf"}>
          Descargar Historial
        </a>
      </button>

    </div>
  );
};

export default Home;
