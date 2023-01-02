/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Popup from "reactjs-popup";
import { message } from "react-message-popup";

// Styles
import "./Record.css";
import "reactjs-popup/dist/index.css";

// Import Components
import Nav from "../Home/Nav";

// Hooks Imports
import { useState, useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Actions Imports
import {
  getCoffeeSizes,
  getActivities,
  getDrinks,
  createNewRecord,
  createNewActivity,
  getLastIdActivity,
  createNewCoffeeSize,
  getLastIdCoffeSize,
  createNewDrink,
  getLastIdDrink,
} from "../../actions/newRecord";

import { logInUser } from "../../actions/index";

// Import images
import check from "../../images/check-mark-button_2705.png";
import memo from "../../images/memo2.png";
import personBed from "../../images/person-in-bed.png";
import runingShoe from "../../images/running-shoe.png";
import menRuning from "../../images/man-running.png";
import coffeeMain from "../../images/coffe2.png";
import coffeeImg from "../../images/coffee.png";
import drinkMain from "../../images/tropical-drink-Main.png";
import drinkImg from "../../images/tropical-drink.png";
import calendar from "../../images/calendar.png";
import time from "../../images/time.png";

// Temporal Constants
const email = "usertester@gmail.com"; // --> Cambiar por correo que estas usando
const password = "Abcde123*"; // --> Cambiar por tu password

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

  /******************** Redux States Section *********************/

  const coffeeSizesRedux = useSelector(state => state.record.coffeeSizes);
  const activitiesRedux = useSelector(state => state.record.activities);
  const drinksRedux = useSelector(state => state.record.drinks);
  const recordStatus = useSelector(state => state.record.statusNewRecord);
  const activityStat = useSelector(state => state.record.statusNewActivity);
  const lastIdActivity = useSelector(state => state.record.lastIdActivity);
  const coffeeStat = useSelector(state => state.record.statusNewCoffeeSize);
  const lastIdCoffee = useSelector(state => state.record.lastIdCoffeeSize);
  const drinkStat = useSelector(state => state.record.statusNewDrink);
  const lastIdDrink = useSelector(state => state.record.lastIdDrink);
  const userId = useSelector(state => state.users.currentUser.id);
  const nameUser = useSelector(state => state.users.currentUser.names);

  /******************** Local States Section *********************/

  //! ================== Main Local States ================= !//

  const [record, setRecord] = useState({
    dateMeal: "",
    timeMeal: "",
    description: "",
    sleepTime: "",
    napTime: [],
    timeActivity: [],
    coffeeCups: [],
    drinks: [],
    coffee: [],
    drink: [],
    activity: [],
    userId: "",
  });

  //! ================== Activity States ================= !//

  const [activityStatus, setActivityStatus] = useState(false);
  const [newActivity, setNewActivity] = useState(false);
  const [activity, setActivity] = useState([]);
  const [addActivity, setAddActivity] = useState({
    id: 0,
    activity: "",
  });

  //! ================== Coffee States ================= !//

  const [coffeeStatus, setCoffeeStatus] = useState(false);
  const [newCoffeeSize, setNewCoffeeSize] = useState(false);
  const [coffee, setCoffee] = useState([]);
  const [addCoffeSize, setAddCoffeSize] = useState({
    id: 0,
    size: "",
  });

  //! ================== Drinks States ================= !//

  const [drinkStatus, setDrinkStatus] = useState(false);
  const [newDrink, setNewDrink] = useState(false);
  const [drink, setDrink] = useState([]);
  const [addNewDrink, setAddNewDrink] = useState({
    id: 0,
    drink: "",
  });

  /******************** Handlers Section *********************/

  //! ================== Main Handlers ================= !//

  const handlerOnChange = e => {
    setRecord({ ...record, [e.target.name]: e.target.value });
  };

  const handlerOnSubmit = e => {
    e.preventDefault();

    if (record.sleepTime === "0") {
      return message.warning("Ingresa tiempo de sueño", 2500);
    }

    const floorTimeActivity = record.timeActivity.map(e => Math.floor(e));
    const floorCoffeeCups = record.coffeeCups.map(e => Math.floor(e));
    const floorDrinks = record.drinks.map(e => Math.floor(e));
    setRecord((record.timeActivity = floorTimeActivity));
    setRecord((record.coffeeCups = floorCoffeeCups));
    setRecord((record.drinks = floorDrinks));
    setRecord((record.userId = userId));
    dispatch(createNewRecord(record));
    setRecord({
      dateMeal: "",
      timeMeal: "",
      description: "",
      sleepTime: "",
      napTime: [],
      timeActivity: [],
      coffeeCups: [],
      drinks: [],
      coffee: [],
      drink: [],
      activity: [],
      userId: "",
    });
    setActivity([]);
    setCoffee([]);
    setDrink([]);
    setActivityStatus(false);
    setCoffeeStatus(false);
    setDrinkStatus(false);

    /* timeRef.current.value = "0";
      activityRef.current.value = "default";

      cups.current.value = "0";
      sizeCup.current.value = "default";

      drinks.current.value = "0";
      typeDrink.current.value = "default"; */
    message.success(`${nameUser} tu registro se creo correctamente!!`);
  };

  const handlerOnClear = e => {
    e.preventDefault();
    setRecord({
      dateMeal: "",
      timeMeal: "",
      description: "",
      sleepTime: "",
      napTime: [],
      timeActivity: [],
      coffeeCups: [],
      drinks: [],
      coffee: [],
      drink: [],
      activity: [],
      userId: "",
    });

    setActivity([]);
    setCoffee([]);
    setDrink([]);
    setActivityStatus(false);
    setCoffeeStatus(false);
    setDrinkStatus(false);

    /*  timeRef.current.value = 0;
    activityRef.current.value = "default";

    cups.current.value = 0;
    sizeCup.current.value = "default";

    drinks.current.value = 0;
    typeDrink.current.value = "default"; */
  };

  //! ================== Activity Handlers ================= !//
  const handlerAddActivity = e => {
    e.preventDefault();

    const duplicated = activitiesRedux.filter(
      e => e.activity === addActivity.activity
    );

    if (duplicated.length > 0) {
      return message.error(
        `La actividad ${addActivity.activity} no puede duplicarse`,
        2500
      );
    }

    setAddActivity((addActivity.id = lastIdActivity));

    dispatch(createNewActivity(addActivity));

    if (activityStat === null) {
      message.success("Actividad creada exitosamente", 2500);
      setAddActivity({
        id: 0,
        activity: "",
      });

      setNewActivity(false);
      setActivityStatus(false);
      activityRef.current.value = "default";
    }
  };

  const handlerOnChangeActivity = e => {
    e.preventDefault();
    setAddActivity({
      ...addActivity,
      [e.target.name]: e.target.value.toLowerCase(),
    });
  };

  const handlerSetActivity = e => {
    e.preventDefault();
    if (e.target.value !== "default") setActivityStatus(true);
    if (e.target.value === "default") setActivityStatus(false);
    if (e.target.value === "add_activity") {
      timeRef.current.value = "0";
      setNewActivity(true);
    } else {
      setNewActivity(false);
    }
  };

  const handlerActivity = e => {
    e.preventDefault();
    const timeSelected = parseInt(timeRef.current.value) + Math.random();
    const activitySelected = parseInt(activityRef.current.value);
    const timeSelectedText = timeRef.current.value;
    const nameActivity =
      activityRef.current[activityRef.current.value].innerText;

    if (!timeSelected || !activitySelected || timeSelected < 1) {
      return message.warning("Ingresa los minutos", 2500);
    }

    setRecord({
      ...record,
      timeActivity: [...record.timeActivity, timeSelected],
      activity: [...record.activity, activitySelected],
    });

    setActivity([...activity, `${timeSelectedText} min. de ${nameActivity}`]);
    activityRef.current.value = "default";
    timeRef.current.value = "0";
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

    setActivityStatus(false);
  };

  //! ================== Coffee Handlers ================= !//

  const handlerAddSizeCoffee = e => {
    e.preventDefault();

    const duplicated = coffeeSizesRedux.filter(
      e => e.size === addCoffeSize.size
    );

    if (duplicated.length > 0) {
      return message.error(
        `La medida ${addCoffeSize.size} no puede duplicarse`,
        2500
      );
    }

    setAddCoffeSize((addCoffeSize.id = lastIdCoffee));
    dispatch(createNewCoffeeSize(addCoffeSize));

    if (coffeeStat === null) {
      message.success("Nueva porcion creada exitosamente", 2500);
      setAddCoffeSize({
        id: 0,
        size: "",
      });

      setNewCoffeeSize(false);
      setCoffeeStatus(false);
      sizeCup.current.value = "default";
    }
  };

  const handlerOnChangeCoffeSize = e => {
    e.preventDefault();
    setAddCoffeSize({
      ...addCoffeSize,
      [e.target.name]: e.target.value.toLowerCase(),
    });
  };

  const handlerSetCoffee = e => {
    e.preventDefault();
    if (e.target.value !== "default") setCoffeeStatus(true);
    if (e.target.value === "default") setCoffeeStatus(false);
    if (e.target.value === "add_coffee_size") {
      cups.current.value = "0";
      setNewCoffeeSize(true);
    } else {
      setNewCoffeeSize(false);
    }
  };

  const handlerCoffee = e => {
    e.preventDefault();
    const quantityCoffee = parseInt(cups.current.value) + Math.random();
    const cup = parseInt(sizeCup.current.value);
    const coffees = cups.current.value;
    const sizeCoffee = sizeCup.current[sizeCup.current.value].innerText;

    if (!quantityCoffee || !cup || quantityCoffee < 1) {
      return message.warning("Ingresa el numero de tazas", 2500);
    }

    setRecord({
      ...record,
      coffeeCups: [...record.coffeeCups, quantityCoffee],
      coffee: [...record.coffee, cup],
    });

    setCoffee([...coffee, `${coffees} tazas de ${sizeCoffee}`]);
    sizeCup.current.value = "default";
    cups.current.value = "0";
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

    setCoffeeStatus(false);
  };

  //! ================== Drinks Handlers ================= !//

  const handlerAddDrink = e => {
    e.preventDefault();

    const duplicated = drinksRedux.filter(e => e.drink === addNewDrink.drink);

    if (duplicated.length > 0) {
      return message.error(
        `La bebida ${addNewDrink.drink} no puede duplicarse`,
        2500
      );
    }

    setAddNewDrink((addNewDrink.id = lastIdDrink));
    dispatch(createNewDrink(addNewDrink));

    if (drinkStat === null) {
      message.success("Nueva bebida creada exitosamente", 2500);
      setAddNewDrink({
        id: 0,
        drink: "",
      });

      setNewDrink(false);
      setDrinkStatus(false);
      typeDrink.current.value = "default";
    }
  };

  const handlerOnChangeDrink = e => {
    e.preventDefault();
    setAddNewDrink({
      ...addNewDrink,
      [e.target.name]: e.target.value.toLowerCase(),
    });
  };

  const handlerSetDrink = e => {
    e.preventDefault();
    if (e.target.value !== "default") setDrinkStatus(true);
    if (e.target.value === "default") setDrinkStatus(false);
    if (e.target.value === "add_drink") {
      drinks.current.value = "0";
      setNewDrink(true);
    } else {
      setNewDrink(false);
    }
  };

  const handlerDrinks = e => {
    e.preventDefault();
    const quantityDrinks = parseInt(drinks.current.value) + Math.random();
    const typeDrinks = parseInt(typeDrink.current.value);
    const drinkss = drinks.current.value;
    const typeDrinkss = typeDrink.current[typeDrink.current.value].innerText;

    if (!quantityDrinks || !typeDrinks || quantityDrinks < 1) {
      return message.warning("Ingresa el numero de bebidas", 2500);
    }

    setRecord({
      ...record,
      drinks: [...record.drinks, quantityDrinks],
      drink: [...record.drink, typeDrinks],
    });

    setDrink([...drink, `${drinkss} bebidas de ${typeDrinkss}`]);
    typeDrink.current.value = "default";
    drinks.current.value = "0";
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

    setDrinkStatus(false);
  };

  // Mount/Unmount Component
  useEffect(() => {
    dispatch(logInUser(email, password));
    dispatch(getCoffeeSizes());
    dispatch(getActivities());
    dispatch(getDrinks());
    dispatch(getLastIdActivity());
    dispatch(getLastIdCoffeSize());
    dispatch(getLastIdDrink());
    if (recordStatus) {
      message.error(`Error: al intentar crear el registro`, 2500);
    } /*  else {
      message.success(`${nameUser} tu registro se creo correctamente!!`);
    } */
  }, [newActivity, newCoffeeSize, newDrink, recordStatus]);

  const PopupActivity = () => (
    <Popup
      trigger={<img src={menRuning} alt="" className="popup_ico" />}
      contentStyle={{ width: "40%" }}
    >
      <div className="activity_container">
        <div className="actity_head_container">
          <img src={runingShoe} alt="" className="runing_shoe" />
          <h4>Actividad Fisica</h4>
        </div>
        <div className="add_quantity">
          <label>Tiempo (min.)</label>
          <input
            className="input_number"
            type="number"
            step="1"
            min="0"
            name="timeActivity"
            ref={timeRef}
            defaultValue="0"
          />
          <span className="sync">sincronizar</span>
          <label>Actividad</label>
          <select ref={activityRef} onChange={handlerSetActivity}>
            <option value="default">Selecciona...</option>
            {activitiesRedux.map((e, i) => {
              return (
                <option
                  key={i}
                  value={e.id}
                  disabled={record.activity.includes(e.id) ? true : false}
                >
                  {e.activity}
                </option>
              );
            })}
            <option value="add_activity">Agregar Actividad</option>
          </select>
          <span
            className="add_button"
            hidden={activityStatus && newActivity === false ? false : true}
            onClick={handlerActivity}
          >
            Agregar
          </span>
        </div>
        <div className="div_map_container">
          {activity.map((e, i) => {
            return (
              <div className="div_map" key={i} onClick={eraseActivity} id={i}>
                {e}
              </div>
            );
          })}
        </div>
        <div className="add_item">
          <div className="new_item" hidden={newActivity ? false : true}>
            <label>Nueva Actividad</label>
            <input
              type="text"
              placeholder="Ingresa actividad..."
              name="activity"
              value={addActivity.activity}
              onChange={handlerOnChangeActivity}
            />
            <span className="add_button" onClick={handlerAddActivity}>
              Agregar
            </span>
          </div>
        </div>
      </div>
    </Popup>
  );
  const PopupCoffee = () => (
    <Popup
      trigger={<img src={coffeeMain} alt="" className="popup_ico" />}
      contentStyle={{ width: "35%" }}
    >
      <div className="coffee_container">
        <div className="coffee_head_container">
          <img src={coffeeImg} alt="" className="coffee_ico" />
          <h4>Consumo de Cafe</h4>
        </div>
        <div className="add_quantity">
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
          <select ref={sizeCup} onChange={handlerSetCoffee}>
            <option value="default">Selecciona...</option>
            {coffeeSizesRedux.map((e, i) => {
              return (
                <option
                  key={i}
                  value={e.id}
                  disabled={record.coffee.includes(e.id) ? true : false}
                >
                  {e.size}
                </option>
              );
            })}
            <option value="add_coffee_size">Agregar Tamaño</option>
          </select>
          <span
            className="add_button"
            hidden={coffeeStatus && newCoffeeSize === false ? false : true}
            onClick={handlerCoffee}
          >
            Agregar
          </span>
        </div>
        <div className="div_map_container">
          {coffee.map((e, i) => {
            return (
              <div className="div_map" key={i} onClick={eraseCoffee} id={i}>
                {e}
              </div>
            );
          })}
        </div>
        <div className="add_item">
          <div className="new_item" hidden={newCoffeeSize ? false : true}>
            <label>Nueva medida</label>
            <input
              type="text"
              placeholder="Ingresa medida..."
              name="size"
              value={addCoffeSize.size}
              onChange={handlerOnChangeCoffeSize}
            />
            <span className="add_button" onClick={handlerAddSizeCoffee}>
              Agregar
            </span>
          </div>
        </div>
      </div>
    </Popup>
  );
  const PopupDrink = () => (
    <Popup
      trigger={<img src={drinkMain} alt="" className="popup_ico" />}
      contentStyle={{ width: "35%" }}
    >
      <div className="drink_container">
        <div className="drink_head_container">
          <img src={drinkImg} alt="" className="drink_ico" />
          <h4>Consumo de Bebidas</h4>
        </div>
        <div className="add_quantity">
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
          <select ref={typeDrink} onChange={handlerSetDrink}>
            <option value="default">Selecciona...</option>
            {drinksRedux.map((e, i) => {
              return (
                <option
                  key={i}
                  value={e.id}
                  disabled={record.drink.includes(e.id) ? true : false}
                >
                  {e.drink}
                </option>
              );
            })}
            <option value="add_drink">Agregar Bebida</option>
          </select>
          <span
            className="add_button"
            hidden={drinkStatus && newDrink === false ? false : true}
            onClick={handlerDrinks}
          >
            Agregar
          </span>
        </div>
        <div className="div_map_container">
          {drink.map((e, i) => {
            return (
              <div className="div_map" key={i} onClick={eraseDrink} id={i}>
                {e}
              </div>
            );
          })}
        </div>
        <div className="add_item">
          <div className="new_item" hidden={newDrink ? false : true}>
            <label>Nueva Bebida</label>
            <input
              type="text"
              placeholder="Ingresa bebida..."
              name="drink"
              value={addNewDrink.drink}
              onChange={handlerOnChangeDrink}
            />
            <span className="add_button" onClick={handlerAddDrink}>
              Agregar
            </span>
          </div>
        </div>
      </div>
    </Popup>
  );

  // Render Main Elements
  return (
    <div>
      <div className="nav_bar">
        <Nav />
      </div>
      <div className="form_container">
        <form onSubmit={handlerOnSubmit}>
          <div className="main_container">
            <div className="x_container">
              <Link to="/inicio" className="link">
                <div className="x">X</div>
              </Link>
            </div>
            <div className="div_head">
              <h1>
                Nuevo Registro
                <img src={memo} alt="" className="memo" />
              </h1>
              <h5>
                Campo Requerido ( <span className="asterisk">*</span> )
              </h5>
            </div>
            <div className="general_info_container">
              <label>
                <span className="asterisk">* </span>
                <img src={calendar} alt="" className="main_ico" />
              </label>
              <input
                type="date"
                required={true}
                name="dateMeal"
                value={record.dateMeal}
                onChange={handlerOnChange}
              />
              <label>
                <span className="asterisk">* </span>
                <img src={time} alt="" className="main_ico" />
              </label>
              <input
                type="time"
                required={true}
                name="timeMeal"
                value={record.timeMeal}
                onChange={handlerOnChange}
              />
              <img
                src={check}
                alt=""
                hidden={
                  record.dateMeal !== "" && record.timeMeal !== ""
                    ? false
                    : true
                }
                className="img_ok"
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
              <img src={personBed} alt="" className="person_bed" />
              <h2>
                Tiempo de Sueño
                <img
                  src={check}
                  alt=""
                  hidden={record.sleepTime > 0 ? false : true}
                  className="img_ok"
                />
              </h2>
              {/* <img src={sync} alt="" /> */}
              <div className="sleep_section">
                <label>
                  <span className="asterisk">* </span>Tiempo
                </label>
                <input
                  className="input_number"
                  type="number"
                  step="1"
                  min="0"
                  required={true}
                  name="sleepTime"
                  value={record.sleepTime}
                  onChange={handlerOnChange}
                  placeholder="0"
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

            <div className="reg_container">
              <div className="reg_head_container">
                <h2>Registrar</h2>
              </div>
              <div className="popup_container">
                <div className="div_popup">
                  <div
                    className="div_ok"
                    hidden={activity.length > 0 ? false : true}
                  >
                    {activity.length}
                  </div>
                  {PopupActivity()}
                </div>
                <div className="div_popup">
                  <div
                    className="div_ok"
                    hidden={coffee.length > 0 ? false : true}
                  >
                    {coffee.length}
                  </div>
                  {PopupCoffee()}
                </div>
                <div className="div_popup">
                  <div
                    className="div_ok"
                    hidden={drink.length > 0 ? false : true}
                  >
                    {drink.length}
                  </div>
                  {PopupDrink()}
                </div>
              </div>
            </div>

            {/* ====================== BUTTONS SECTION ======================= */}

            <div className="button_container">
              <button className="bottom_buttons">Guardar</button>
              <button className="bottom_buttons" onClick={handlerOnClear}>
                Limpiar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Record;
