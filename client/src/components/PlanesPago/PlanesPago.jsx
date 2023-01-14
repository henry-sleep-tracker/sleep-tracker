import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../actions/index";

const Pricing = () => {
  const USER_ID = "USER_ID";
  const userId = window.localStorage.getItem(USER_ID);
  const currentUser = useSelector((state) => state?.users.currentUser);
  const dispatch = useDispatch();
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    fetchPrices();
    if (currentUser === "") {
      dispatch(getUserById(userId));
    }
  }, [dispatch, currentUser, userId]);

  const fetchPrices = async () => {
    const { data: response } = await axios.get(
      `${process.env.REACT_APP_DEFAULT_URL}/plans/prices`
    );
    let allPlans = response.data;
    if (currentUser.hasUsedFreePlan === true) {
      allPlans = allPlans.filter((plan) => plan.unit_amount !== 0);
    }
    setPrices(allPlans);
  };

  const createSession = async (currentUser, priceId) => {
    const email = currentUser.email;

    const { data: response } = await axios.post(
      `${process.env.REACT_APP_DEFAULT_URL}/plans/session`,
      { priceId, email }
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
      <main key={Math.random()}>
        <div className="row row-col-1 row-cols-md-3">
          {prices.map((price, index) => (
            <div className="col" key={`prices-${index}`}>
              <div className="card text-center">
                <div className="card-header bg-dark text-white">
                  <h4 className="fw-normal">{price.nickname}</h4>
                </div>
                <div className="card-body">
                  <h1 className="card-title">
                    ${price.unit_amount / 100}
                    <small className="text-muted fw-light">
                      /{price.recurring.interval}
                    </small>
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
                    onClick={() => createSession(currentUser, price.id)}
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
