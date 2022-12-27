/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./Record.css";

// Hooks Imports
import { useState, useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions Imports
import {
  getCoffeeSizes,
  getActivities,
  getDrinks,
} from "../../actions/newRecord";

//> Starts Component
const Record = props => {
  const dispatch = useDispatch();

  // useRef Hook
  const timeRef = useRef();
  const activityRef = useRef();
  const cups = useRef();
  const sizeCup = useRef();
  const drinks = useRef();
  const typeDrink = useRef();

  // Suscribes Global State
  const coffeeSizesRedux = useSelector(state => state.record.coffeeSizes);
  const activitiesRedux = useSelector(state => state.record.activities);
  const drinksRedux = useSelector(state => state.record.drinks);

  // Local States
  const [activity, setActivity] = useState([]);
  const [coffee, setCoffee] = useState([]);
  const [drink, setDrink] = useState([]);
  const [record, setRecord] = useState({
    dateMeal: "",
    timeMeal: "",
    description: "",
    sleepTime: "0",
    napTime: [],
    timeActivity: [],
    coffeeCups: [],
    drinks: [],
    coffee: [],
    drink: [],
    activity: [],
  });

  // Handlers
  const handlerOnChange = e => {
    setRecord({ ...record, [e.target.name]: e.target.value });
  };

  const handlerActivity = e => {
    e.preventDefault();
    const timeSelected = parseInt(timeRef.current.value);
    const activitySelected = parseInt(activityRef.current.value);
    const timeSelectedText = timeRef.current.value;
    const nameActivity =
      activityRef.current[activityRef.current.value].innerText;

    if (!timeSelected || !activitySelected) {
      return alert("Sin datos por registrar");
    }

    setRecord({
      ...record,
      timeActivity: [...record.timeActivity, timeSelected],
      activity: [...record.activity, activitySelected],
    });

    setActivity([...activity, `${timeSelectedText} min. de ${nameActivity}`]);
  };

  const eraseActivity = e => {
    e.preventDefault();
    const activityToErase = e.target.innerText;
    const activityFilter = activity.filter(e => e !== activityToErase);
    const indexToErase = e.target.id;
    setActivity(activityFilter);

    const valueToRemoveTA = record.timeActivity[indexToErase];
    const valueToRemoveA = record.activity[indexToErase];
    const timeActivity = record.timeActivity.filter(e => e !== valueToRemoveTA);
    const activity2 = record.activity.filter(e => e !== valueToRemoveA);
    setRecord({
      ...record,
      timeActivity: timeActivity,
      activity: activity2,
    });

    timeRef.current.value = 0;
    activityRef.current.value = "default";
  };

  const handlerCoffee = e => {
    e.preventDefault();
    const quantityCoffee = parseInt(cups.current.value);
    const cup = parseInt(sizeCup.current.value);
    const coffees = cups.current.value;
    const sizeCoffee = sizeCup.current[sizeCup.current.value].innerText;

    if (!quantityCoffee || !cup) {
      return alert("Sin datos por registrar");
    }

    setRecord({
      ...record,
      coffeeCups: [...record.coffeeCups, quantityCoffee],
      coffee: [...record.coffee, cup],
    });

    setCoffee([...coffee, `${coffees} tazas de ${sizeCoffee}`]);
  };

  const eraseCoffee = e => {
    e.preventDefault();
    const coffeeToErase = e.target.innerText;
    const coffeeFilter = coffee.filter(e => e !== coffeeToErase);
    const indexToErase = e.target.id;
    setCoffee(coffeeFilter);

    const valueToRemoveC = record.coffeeCups[indexToErase];
    const valueToRemoveCS = record.coffee[indexToErase];
    const coffees = record.coffeeCups.filter(e => e !== valueToRemoveC);
    const sizeCoffees = record.coffee.filter(e => e !== valueToRemoveCS);
    setRecord({
      ...record,
      coffeeCups: coffees,
      coffee: sizeCoffees,
    });

    cups.current.value = 0;
    sizeCup.current.value = "default";
  };

  const handlerDrinks = e => {
    e.preventDefault();
    const quantityDrinks = parseInt(drinks.current.value);
    const typeDrinks = parseInt(typeDrink.current.value);
    const drinkss = drinks.current.value;
    const typeDrinkss = typeDrink.current[typeDrink.current.value].innerText;

    if (!quantityDrinks || !typeDrinks) {
      return alert("Sin datos por registrar");
    }

    setRecord({
      ...record,
      drinks: [...record.drinks, quantityDrinks],
      drink: [...record.drink, typeDrinks],
    });

    setDrink([...drink, `${drinkss} bebidas de ${typeDrinkss}`]);
  };

  const eraseDrink = e => {
    e.preventDefault();
    const drinkToErase = e.target.innerText;
    const drinkFilter = drink.filter(e => e !== drinkToErase);
    const indexToErase = e.target.id;
    setDrink(drinkFilter);

    const valueToRemoveD = record.drinks[indexToErase];
    const valueToRemoveDT = record.drink[indexToErase];
    const drinks2 = record.drinks.filter(e => e !== valueToRemoveD);
    const typeDrinks = record.drink.filter(e => e !== valueToRemoveDT);
    setRecord({
      ...record,
      drinks: drinks2,
      drink: typeDrinks,
    });

    drinks.current.value = 0;
    typeDrink.current.value = "default";
  };

  // Mount/Unmount Component
  useEffect(() => {
    dispatch(getCoffeeSizes());
    dispatch(getActivities());
    dispatch(getDrinks());
  }, []);

  // Renders Elements
  return (
    <div>
      <div className="form_container">
        <form>
          <div className="main_container">
            <h1>Nuevo Registro</h1>
            <div className="general_info_container">
              <label>Dia</label>
              <input
                type="date"
                required={true}
                name="dateMeal"
                value={record.dateMeal}
                onChange={handlerOnChange}
              />
              <label>Hora</label>
              <input
                type="time"
                required={true}
                name="timeMeal"
                value={record.timeMeal}
                onChange={handlerOnChange}
              />
              <h4>Descripcion alimento</h4>
              <textarea
                name="description"
                id=""
                cols="70"
                rows="5"
                placeholder="Ingresa breve descripcion"
                value={record.description}
                onChange={handlerOnChange}
              ></textarea>
            </div>

            <div className="sleep_container">
              <h3>Tiempo de Sueño</h3>
              <div className="sleep_section">
                <label>Tiempo</label>
                <input
                  className="input_number"
                  type="number"
                  step="1"
                  min="0"
                  required={true}
                  name="sleepTime"
                  value={record.sleepTime}
                  onChange={handlerOnChange}
                />
                <span>min.</span>
                <span className="sync">sincronizar</span>
              </div>
              {/* <label>Siesta</label>
              <input className="input_number" type="number" step="1" min="0" />
              <span>min.</span>
              <button className="add_button">Agregar</button> */}
            </div>
            <br />

            <div className="activity_container">
              <h3>Actividad Fisica</h3>
              <div className="activity_section">
                <label>Tiempo</label>
                <input
                  className="input_number"
                  type="number"
                  step="1"
                  min="0"
                  name="timeActivity"
                  ref={timeRef}
                  defaultValue="0"
                />
                <span>min.</span>
                <span className="sync">sincronizar</span>
              </div>
              <br />
              <label>Tipo de Actividad</label>
              <select ref={activityRef}>
                <option value="default">Selecciona...</option>
                {activitiesRedux.map((e, i) => {
                  return (
                    <option key={i} value={e.id}>
                      {e.activity}
                    </option>
                  );
                })}
                <option value="add_activity">Agregar Actividad</option>
              </select>
              <span className="add_button" onClick={handlerActivity}>
                Agregar
              </span>
              <div className="div_map_container">
                {activity.map((e, i) => {
                  return (
                    <div
                      className="div_map"
                      key={i}
                      onClick={eraseActivity}
                      id={i}
                    >
                      {e}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="coffee_container">
              <h3>Cafe</h3>
              <label>Cantidad</label>
              <input
                className="input_number"
                type="number"
                step="1"
                min="0"
                name="coffeeCups"
                ref={cups}
                defaultValue="0"
              />
              <label>Tamaño Taza</label>
              <select ref={sizeCup}>
                <option value="default">Selecciona...</option>
                {coffeeSizesRedux.map((e, i) => {
                  return (
                    <option key={i} value={e.id}>
                      {e.size}
                    </option>
                  );
                })}
                <option value="default">Agregar Tamaño</option>
              </select>
              <span className="add_button" onClick={handlerCoffee}>
                Agregar
              </span>
              <div className="div_map_container">
                {coffee.map((e, i) => {
                  return (
                    <div
                      className="div_map"
                      key={i}
                      onClick={eraseCoffee}
                      id={i}
                    >
                      {e}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="drink_container">
              <h3>Bebidas</h3>
              <label>Cantidad</label>
              <input
                className="input_number"
                type="number"
                step="1"
                min="0"
                name="drinks"
                ref={drinks}
                defaultValue="0"
              />
              <label>Tipo de bebida</label>
              <select ref={typeDrink}>
                <option value="default">Selecciona...</option>
                {drinksRedux.map((e, i) => {
                  return (
                    <option key={i} value={e.id}>
                      {e.drink}
                    </option>
                  );
                })}
                <option value="default">Agregar Bebida</option>
              </select>
              <span className="add_button" onClick={handlerDrinks}>
                Agregar
              </span>
              <div className="div_map_container">
                {drink.map((e, i) => {
                  return (
                    <div
                      className="div_map"
                      key={i}
                      onClick={eraseDrink}
                      id={i}
                    >
                      {e}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="button_container">
              <button className="bottom_buttons">Guardar</button>
              <button className="bottom_buttons">Limpiar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Record;
