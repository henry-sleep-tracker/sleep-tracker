import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Pricing = () => {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    const { data: response } = await axios.get(
      "http://localhost:3001/subs/prices"
    );
    console.log(response);
    setPrices(response.data);
  };

  const createSession = async (priceId) => {
    const { data: response } = await axios.post(
      "http://localhost:3001/subs/session",
      {
        priceId,
      }
    );

    window.location.href = response.url; // obtener la url y redirigil al usuario a la url
  };

 

  return (
    <div className="container">
      <header>
        <div className="text-center w-75 mx-auto">
          <h1>Planes</h1>
          <p className="fs-5 text-muted">
            Te damos los mejores beneficios para que tengas una mejor calidad de
            sueño con nuestros planes
          </p>
        </div>
      </header>
      <main>
        <div className="row row-col-1 row-cols-md-3">
          <div className="col">
            <div className="card text-center">
              <div className="card-header bg-dark text-white">
                <h4 className="fw-normal">Gratis</h4>
              </div>
              <div className="card-body">
                <h1 className="card-title">
                  $0<small className="text-muted fw-light">/month</small>
                </h1>
                <ul className="py-3">
                  <li>Registro de actividad fisica</li>
                  <li>Registro de consumos diarios( alimentos y bebidas)</li>
                  <li>Información de sueño conseguido diario y semanal</li>
                  <li className="text-danger">Exporta tu información completa en formato PDF</li>
              
                </ul>
                <Link to={"/private/dashboard/*"}>
                <button
                  className="btn btn-lg text-white btn-success w-100"
                  variant="outline-success"
                >
                  Prueba gratis
                </button>
                </Link>
              </div>
            </div>
          </div>
          {prices.map((price) => (
            <div className="col">
              <div className="card text-center">
                <div className="card-header bg-dark text-white">
                  <h4 className="fw-normal">{price.nickname}</h4>
                </div>
                <div className="card-body">
                  <h1 className="card-title">${price.unit_amount / 100}<small className="text-muted fw-light">/{price.recurring.interval}</small>
                  </h1>
                  <ul className="py-3">
                  <li>Registro de actividad fisica</li>
                  <li>Registro de consumos diarios( alimentos y bebidas)</li>
                  <li>Información de sueño conseguido diario y semanal</li>
                  <li>Exporta tu información completa en formato PDF</li>
                </ul>
                  <button
                    className="btn btn-lg text-white btn-success w-100"
                    variant="outline-success"
                    onClick={() => createSession(price.id)}
                  >
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};


export default Pricing;