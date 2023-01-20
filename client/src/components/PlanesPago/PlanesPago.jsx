import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../actions/index";
import { USER_ID } from "../../actions/constants";
import "./PlanesPago.css";
import style from "./PlanesPago.module.css";

const Pricing = () => {
  const userId = window.localStorage.getItem(USER_ID);
  const currentUser = useSelector((state) => state?.users.currentUser);
  const dispatch = useDispatch();
  const [prices, setPrices] = useState([]);
  const planExpirationDate = useSelector(
    (state) => state?.users.planExpirationDate
  );

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

  const priceProps = [
    {
      description1: "Registro de actividad fisica",
      description2: "Registro de consumos diarios( alimentos y bebidas)",
      description3: "Información de sueño conseguido diario y semanal",
      description4: "Exporta tu información completa en formato PDF",
    },
  ];

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
          {!currentUser.plan?.name
            ? prices.map((price, index) => (
                <div className="col" key={`basico-${index}`}>
                  <div className="card text-center" key={`basico-${index}`}>
                    <div
                      className="card-header bg-dark text-white"
                      key={`basico-${index}`}
                    >
                      <h4 className="fw-normal" key={`basico-${index}`}>
                        {price.nickname}
                      </h4>
                    </div>
                    <div className="card-body" key={`basico-${index}`}>
                      <h1 className="card-title" key={`basico-${index}`}>
                        ${price.unit_amount / 100}
                        <small
                          className="text-muted fw-light"
                          key={`basico-${index}`}
                        >
                          /{price.recurring.interval}
                        </small>
                      </h1>
                      <ul className="py-3" key={`basico-${index}`}>
                        <li key={`basico-${index}`}>
                          Registro de actividad fisica
                        </li>
                        <li key={`basico-${index}`}>
                          Registro de consumos diarios( alimentos y bebidas)
                        </li>
                        <li key={`basico-${index}`}>
                          Información de sueño conseguido diario y semanal
                        </li>
                        <li key={`basico-${index}`}>
                          Exporta tu información completa en formato PDF
                        </li>
                      </ul>
                      <button
                        key={`basico-${index}`}
                        className={style.buttonPay}
                        onClick={() => createSession(currentUser, price.id)}
                      >
                        Comprar
                      </button>
                    </div>
                  </div>
                </div>
              ))
            : currentUser.plan?.name === "Basico"
            ? prices.slice(0).map((price, index) => (
                <div className="col" key={`estandar-${index}`}>
                  <div className="card text-center" key={`estandar1-${index}`}>
                    <div
                      className="card-header bg-dark text-white"
                      key={`estandar2-${index}`}
                    >
                      <h4 className="fw-normal" key={`estandar3-${index}`}>
                        {price.nickname}
                      </h4>
                    </div>
                    <div className="card-body" key={`estandar4-${index}`}>
                      <h1 className="card-title" key={`estandar5-${index}`}>
                        ${price.unit_amount / 100}
                        <small
                          className="text-muted fw-light"
                          key={`estandar6-${index}`}
                        >
                          /{price.recurring.interval}
                        </small>
                      </h1>
                      <ul className="py-3" key={`estandar-${index}`}>
                        <li key={`estandar7-${index}`}>
                          Registro de actividad fisica
                        </li>
                        <li key={`estandar8-${index}`}>
                          Registro de consumos diarios( alimentos y bebidas)
                        </li>
                        <li key={`estandar9-${index}`}>
                          Información de sueño conseguido diario y semanal
                        </li>
                        <li key={`estandar10-${index}`}>
                          Exporta tu información completa en formato PDF
                        </li>
                      </ul>
                      <button
                        key={`estandar11-${index}`}
                        className={style.buttonPay}
                        onClick={() => createSession(currentUser, price.id)}
                      >
                        Comprar
                      </button>
                    </div>
                  </div>
                </div>
              ))
            : currentUser.plan?.name === "Estandar"
            ? prices.slice(1).map((price, index) => (
                <div className="col" key={`premium-${index}`}>
                  <div className="card text-center" key={`premium-${index}`}>
                    <div
                      className="card-header bg-dark text-white"
                      key={`premium-${index}`}
                    >
                      <h4 className="fw-normal" key={`premium-${index}`}>
                        {price.nickname}
                      </h4>
                    </div>
                    <div className="card-body" key={`premium-${index}`}>
                      <h1 className="card-title" key={`premium-${index}`}>
                        ${price.unit_amount / 100}
                        <small
                          className="text-muted fw-light"
                          key={`premium-${index}`}
                        >
                          /{price.recurring.interval}
                        </small>
                      </h1>
                      <ul className="py-3" key={`premium-${index}`}>
                        <li key={`premium-${index}`}>
                          Registro de actividad fisica
                        </li>
                        <li key={`premium-${index}`}>
                          Registro de consumos diarios( alimentos y bebidas)
                        </li>
                        <li key={`premium-${index}`}>
                          Información de sueño conseguido diario y semanal
                        </li>
                        <li key={`premium-${index}`}>
                          Exporta tu información completa en formato PDF
                        </li>
                      </ul>
                      <button
                        key={`premium-${index}`}
                        className={style.buttonPay}
                        onClick={() => createSession(currentUser, price.id)}
                      >
                        Comprar
                      </button>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
      </main>
    </div>
  );
};

export default Pricing;
