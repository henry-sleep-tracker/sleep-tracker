/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Popup from "reactjs-popup";
import { message } from "react-message-popup";

// Styles
import "./Record.css";
import "./Loading";
import "reactjs-popup/dist/index.css";

// Import Components

import Saving from "./Saving";

// Hooks Imports
import { useState, useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Actions Imports
import {
  getRecordByIdDate,
  getActivitiesByUser,
  getCoffeeSizesByUser,
  getDrinksByUser,
  createNewRecord,
  createNewActivity,
  createNewCoffeeSize,
  createNewDrink,
  setStatusNewRecord,
} from "../../actions/records";

import { getSleepStage } from "../../actions/getUserHealthData";

import { setDay } from "../../actions/loading";

// Import images
import checkImg from "../../images/check-mark-button_2705.png";
import memo from "../../images/memo2.png";
import personBed from "../../images/person-in-bed.png";
import runingShoe from "../../images/running-shoe.png";
import menRuning from "../../images/man-running.png";
import coffeeMain from "../../images/coffe2.png";
import coffeeImg from "../../images/coffee.png";
import drinkMain from "../../images/tropical-drink-Main.png";
import drinkImg from "../../images/tropical-drink.png";
import calendar from "../../images/calendar.png";
import timeIco from "../../images/time.png";

// Import helpers
import { date_maker } from "../../helpers/date_maker";
import { time_maker } from "../../helpers/time_maker";
import { time_convert } from "../../helpers/time_convert";
import { formatingDate } from "../../helpers/date_formating";
import { timeToMinutes } from "../../helpers/time_to_minutes";
import { dateStringToDate } from "../../helpers/string_to_date";
import Loading from "./Loading";

//>======================>//
//> Starts Component
//>======================>//

const Record = (props) => {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  let sleepTimeMinutes = "";
  let sleepTime12Format = "";
  let check = "";

  /******************** Set Timeouts Section *********************/

  //! ============ TimeOut for check Sync Sleep Record ========== !//
  setTimeout(() => {
    if (check.length >= 1) {
      if (check[0].dateMeal === currentDay.current?.value) {
        setSync(true);
      } else {
        setSync(false);
      }
    }
  }, 1);

  // useRef Hook
  const currentDay = useRef();
  const timeRef = useRef();
  const activityRef = useRef();
  const cups = useRef();
  const sizeCup = useRef();
  const drinks = useRef();
  const typeDrink = useRef();
  const nameActivity = useRef();
  const nameCoffee = useRef();
  const nameDrink = useRef();

  /******************** Redux States Section *********************/

  const userId = useSelector((state) => state.users.currentUser.id);
  const nameUser = useSelector((state) => state.users.currentUser.names);
  const recordsUserRedux = useSelector(
    (state) => state.record.recordsByUserAndDate
  );
  const recordStatus = useSelector((state) => state.record.statusNewRecord);
  const activityStat = useSelector((state) => state.record.statusNewActivity);
  const coffeeStat = useSelector((state) => state.record.statusNewCoffeeSize);
  const drinkStat = useSelector((state) => state.record.statusNewDrink);
  const activitiesRedux = useSelector((state) => state.record.activities);
  const coffeeSizesRedux = useSelector((state) => state.record.coffeeSizes);
  const drinksRedux = useSelector((state) => state.record.drinks);
  const sleepTime = useSelector((state) => state.stage); //--> Estado global que guarda los segundos de suenio
  const day = useSelector((state) => state.loading.day);

  /******************** Functions Before load component *********************/

  const temp = sleepTime?.filter((e) => e.level !== 1);
  if (temp.length > 0) {
    sleepTimeMinutes = Math.floor(
      temp.map((e) => e.seconds).reduce((acc, e) => acc + e, 0) / 60
    );
    // eslint-disable-next-line no-unused-vars
    sleepTime12Format = time_convert(sleepTimeMinutes);
  }

  if (recordsUserRedux?.length >= 1) {
    check = recordsUserRedux?.filter((e) => e.sleepTime > 0);
  }

  /******************** Local States Section *********************/

  //! ================== Main Local States ================= !//
  const [loading, setLoading] = useState(true);

  const [record, setRecord] = useState({
    dateMeal: day ? day : date_maker(),
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
    userId: userId,
  });

  const [value, setValue] = useState({});

  const refresh = () => {
    setValue({});
  };

  //! ================== Sleep States ================= !//
  const [time, setTime] = useState({
    startTime: "",
    endTime: "",
  });

  let st = time.startTime;
  let et = time.endTime;

  const finalHours = formatingDate(st, et);

  const [sync, setSync] = useState(false); //--> 61

  //! ================== Activity States ================= !//

  const [activityStatus, setActivityStatus] = useState(false);
  const [newActivity, setNewActivity] = useState(false);
  const [activity, setActivity] = useState([]);
  const [addActivity, setAddActivity] = useState({
    activity: "",
    userId: userId,
  });

  //! ================== Coffee States ================= !//

  const [coffeeStatus, setCoffeeStatus] = useState(false);
  const [newCoffeeSize, setNewCoffeeSize] = useState(false);
  const [coffee, setCoffee] = useState([]);
  const [addCoffeSize, setAddCoffeSize] = useState({
    size: "",
    userId: userId,
  });

  //! ================== Drinks States ================= !//

  const [drinkStatus, setDrinkStatus] = useState(false);
  const [newDrink, setNewDrink] = useState(false);
  const [drink, setDrink] = useState([]);
  const [addNewDrink, setAddNewDrink] = useState({
    drink: "",
    userId: userId,
  });

  /******************** Handlers Section *********************/

  //! ================== Main Handlers ================= !//

  const handlerOnChange = (e) => {
    setRecord({ ...record, [e.target.name]: e.target.value });
    if (e.target.name === "dateMeal") {
      dispatch(getRecordByIdDate(userId, e.target.value));
      setLoading(true);
      //refresh();
    }
  };

  const handlerOnSubmit = (e) => {
    e.preventDefault();
    let date = "";
    let time = "";
    let min = "";

    // Before Dispatch //

    if (record.dateMeal === "") {
      date = date_maker();
      setRecord((record.dateMeal = date));
    }

    if (record.timeMeal.length > 0 && record.description.length < 1) {
      message.warn(`Ingresa una breve descripcion de tu cena`);
      message.warn(`Ingresa una breve descripcion de tu cena`);
      return;
    }

    if (record.timeMeal === "") {
      time = time_maker();
      setRecord((record.timeMeal = time));
    }

    if (st.length > 0 && et.length > 0) {
      min = timeToMinutes(st, et);
      setRecord((record.sleepTime = min));
    }

    if (!record.sleepTime) {
      setRecord((record.sleepTime = "0"));
    }

    const floorTimeActivity = record.timeActivity.map((e) => Math.floor(e));
    const floorCoffeeCups = record.coffeeCups.map((e) => Math.floor(e));
    const floorDrinks = record.drinks.map((e) => Math.floor(e));
    setRecord((record.timeActivity = floorTimeActivity));
    setRecord((record.coffeeCups = floorCoffeeCups));
    setRecord((record.drinks = floorDrinks));
    //dispatch(createNewRecord(record));
    //if((record.sleepTime === "0")){
      //console.log(record.sleepTime.length);
      //dispatch(createNewRecord(record));
    //message.success(`${nameUser} tu registro se creo correctamente!!`, 2500);
    //}
    dispatch(createNewRecord(record));
    
    // After Dispatch //

    setRecord({
      dateMeal: currentDay.current.value,
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
      userId: userId,
    });
    setActivity([]);
    setCoffee([]);
    setDrink([]);
    setActivityStatus(false);
    setCoffeeStatus(false);
    setDrinkStatus(false);
    setTime({ startTime: "", endTime: "" });
    refresh();
    navigate("/private/saving");
    dispatch(setDay(currentDay.current.value));
  };

  const handlerOnClear = (e) => {
    e.preventDefault();
    setRecord({
      dateMeal: currentDay.current.value,
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
      userId: userId,
    });

    setActivity([]);
    setCoffee([]);
    setDrink([]);
    setActivityStatus(false);
    setCoffeeStatus(false);
    setDrinkStatus(false);
    setTime({ startTime: "", endTime: "" });
  };

  //! ================== SleepTime Handlers ================= !//

  const handlerSleepTimeChange = (e) => {
    setTime({ ...time, [e.target.name]: e.target.value });
  };

  const handlerSync = (e) => {
    e.preventDefault();
    setRecord((record.sleepTime = sleepTimeMinutes));
    if (record.timeMeal === "") {
      let time = time_maker();
      setRecord((record.timeMeal = time));
    }
    dispatch(createNewRecord(record));
    message.success(`Se sincronizo tu sueño correctamente`, 2500);

    setSync(true);
    setRecord({
      dateMeal: currentDay.current.value,
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
      userId: userId,
    });
    setActivity([]);
    setCoffee([]);
    setDrink([]);
    setActivityStatus(false);
    setCoffeeStatus(false);
    setDrinkStatus(false);
    setTime({ startTime: "", endTime: "" });
  };

  //! ================== Activity Handlers ================= !//

  const handlerActivity = (e) => {
    e.preventDefault();
    const timeSelected = parseInt(timeRef.current.value) + Math.random();
    const activitySelected = activityRef.current.value;
    const timeSelectedText = timeRef.current.value;
    const filter = activitiesRedux.filter((e) => e.id === activitySelected);
    const nameActivity = filter[0].activity;

    if (!timeSelected || !activitySelected || timeSelected < 1) {
      message.warning("Ingresa los minutos", 2500);
      message.warning("Ingresa los minutos", 2500);
      return;
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

  const handlerOnChangeActivity = (e) => {
    e.preventDefault();
    setAddActivity({
      ...addActivity,
      [e.target.name]: e.target.value.toLowerCase(),
    });
  };

  const handlerAddActivity = (e) => {
    e.preventDefault();
    let duplicated = "";

    if (activitiesRedux.length > 0) {
      duplicated = activitiesRedux.filter(
        (e) => e.activity === addActivity.activity
      );
    }

    if (duplicated.length > 0) {
      message.error(
        `La actividad ${addActivity.activity} no puede duplicarse`,
        2500
      );
      message.error(
        `La actividad ${addActivity.activity} no puede duplicarse`,
        2500
      );
      nameActivity.current.value = "";
      return;
    }

    dispatch(createNewActivity(addActivity));

    if (activityStat === null) {
      message.success("Actividad creada exitosamente", 2500);
      message.success("Actividad creada exitosamente", 2500);
      setAddActivity({
        activity: "",
        userId: userId,
      });

      setNewActivity(false);
      setActivityStatus(false);
      activityRef.current.value = "default";
      dispatch(getActivitiesByUser(userId));
      refresh();
    }
  };

  const handlerSetActivity = (e) => {
    e.preventDefault();
    if (e.target.value !== "default" && e.target.value !== "add_activity")
      setActivityStatus(true);
    if (e.target.value === "default") setActivityStatus(false);
    if (activityRef.current.value === "add_activity") {
      timeRef.current.value = "0";
      setActivityStatus(false);
      setNewActivity(true);
    } else {
      setNewActivity(false);
    }
  };

  const eraseActivity = (e) => {
    e.preventDefault();
    const activityToErase = e.target.innerText;
    const activityFilter = activity.filter((e) => e !== activityToErase);
    const indexToErase = e.target.id;
    setActivity(activityFilter);

    const valueToRemoveTA = record.timeActivity[indexToErase];
    const valueToRemoveA = record.activity[indexToErase];
    const timeActivity = record.timeActivity.filter(
      (e) => e !== valueToRemoveTA
    );
    const activity2 = record.activity.filter((e) => e !== valueToRemoveA);
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

  const handlerCoffee = (e) => {
    e.preventDefault();
    const quantityCoffee = parseInt(cups.current.value) + Math.random();
    const cup = sizeCup.current.value;
    const coffees = cups.current.value;
    const filter = coffeeSizesRedux.filter((e) => e.id === cup);
    const size = filter[0].size;

    if (!quantityCoffee || !cup || quantityCoffee < 1) {
      message.warning("Ingresa el numero de tazas", 2500);
      message.warning("Ingresa el numero de tazas", 2500);
      return;
    }

    setRecord({
      ...record,
      coffeeCups: [...record.coffeeCups, quantityCoffee],
      coffee: [...record.coffee, cup],
    });

    setCoffee([...coffee, `${coffees} tazas de ${size}`]);
    sizeCup.current.value = "default";
    cups.current.value = "0";
  };

  const handlerOnChangeCoffeSize = (e) => {
    e.preventDefault();
    setAddCoffeSize({
      ...addCoffeSize,
      [e.target.name]: e.target.value.toLowerCase(),
    });
  };

  const handlerAddSizeCoffee = (e) => {
    e.preventDefault();
    let duplicated = "";

    if (coffeeSizesRedux.length > 0) {
      duplicated = coffeeSizesRedux.filter((e) => e.size === addCoffeSize.size);
    }

    if (duplicated.length > 0) {
      message.error(`La medida ${addCoffeSize.size} no puede duplicarse`, 2500);
      message.error(`La medida ${addCoffeSize.size} no puede duplicarse`, 2500);
      nameCoffee.current.value = "";
      return;
    }

    dispatch(createNewCoffeeSize(addCoffeSize));

    if (coffeeStat === null) {
      message.success("Nueva porcion creada exitosamente", 2500);
      message.success("Nueva porcion creada exitosamente", 2500);
      setAddCoffeSize({
        size: "",
        userId: userId,
      });

      setNewCoffeeSize(false);
      setCoffeeStatus(false);
      sizeCup.current.value = "default";
      dispatch(getCoffeeSizesByUser(userId));
      refresh();
    }
  };

  const handlerSetCoffee = (e) => {
    e.preventDefault();
    if (e.target.value !== "default" && e.target.value !== "add_coffee_size")
      setCoffeeStatus(true);
    if (e.target.value === "default") setCoffeeStatus(false);
    if (sizeCup.current.value === "add_coffee_size") {
      cups.current.value = "0";
      setCoffeeStatus(false);
      setNewCoffeeSize(true);
    } else {
      setNewCoffeeSize(false);
    }
  };

  const eraseCoffee = (e) => {
    e.preventDefault();
    const coffeeToErase = e.target.innerText;
    const coffeeFilter = coffee.filter((e) => e !== coffeeToErase);
    const indexToErase = e.target.id;
    setCoffee(coffeeFilter);

    const valueToRemoveC = record.coffeeCups[indexToErase];
    const valueToRemoveCS = record.coffee[indexToErase];
    const coffees = record.coffeeCups.filter((e) => e !== valueToRemoveC);
    const sizeCoffees = record.coffee.filter((e) => e !== valueToRemoveCS);
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

  const handlerDrinks = (e) => {
    e.preventDefault();
    const quantityDrinks = parseInt(drinks.current.value) + Math.random();
    const typeDrinks = typeDrink.current.value;
    const drinkss = drinks.current.value;
    const filter = drinksRedux.filter((e) => e.id === typeDrinks);
    const typeDrinkss = filter[0].drink;

    if (!quantityDrinks || !typeDrinks || quantityDrinks < 1) {
      message.warning("Ingresa el numero de bebidas", 2500);
      message.warning("Ingresa el numero de bebidas", 2500);
      return;
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

  const handlerOnChangeDrink = (e) => {
    e.preventDefault();
    setAddNewDrink({
      ...addNewDrink,
      [e.target.name]: e.target.value.toLowerCase(),
    });
  };

  const handlerAddDrink = (e) => {
    e.preventDefault();
    let duplicated = "";

    if (drinksRedux.length > 0) {
      duplicated = drinksRedux.filter((e) => e.drink === addNewDrink.drink);
    }

    if (duplicated.length > 0) {
      message.error(`La bebida ${addNewDrink.drink} no puede duplicarse`, 2500);
      message.error(`La bebida ${addNewDrink.drink} no puede duplicarse`, 2500);
      nameDrink.current.value = "";
      return;
    }

    dispatch(createNewDrink(addNewDrink));

    if (drinkStat === null) {
      message.success("Nueva bebida creada exitosamente", 2500);
      message.success("Nueva bebida creada exitosamente", 2500);
      setAddNewDrink({
        drink: "",
        userId: userId,
      });

      setNewDrink(false);
      setDrinkStatus(false);
      typeDrink.current.value = "default";
      dispatch(getDrinksByUser(userId));
      refresh();
    }
  };

  const handlerSetDrink = (e) => {
    e.preventDefault();
    if (e.target.value !== "default" && e.target.value !== "add_drink")
      setDrinkStatus(true);
    if (e.target.value === "default") setDrinkStatus(false);
    if (typeDrink.current.value === "add_drink") {
      drinks.current.value = "0";
      setDrinkStatus(false);
      setNewDrink(true);
    } else {
      setNewDrink(false);
    }
  };

  const eraseDrink = (e) => {
    e.preventDefault();
    const drinkToErase = e.target.innerText;
    const drinkFilter = drink.filter((e) => e !== drinkToErase);
    const indexToErase = e.target.id;
    setDrink(drinkFilter);

    const valueToRemoveD = record.drinks[indexToErase];
    const valueToRemoveDT = record.drink[indexToErase];
    const drinks2 = record.drinks.filter((e) => e !== valueToRemoveD);
    const typeDrinks = record.drink.filter((e) => e !== valueToRemoveDT);
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
    setTimeout(() => {
      setLoading(false);
      if (currentDay.current?.value) {
        dispatch(getSleepStage(currentDay.current.value));
        dispatch(getRecordByIdDate(userId, currentDay.current.value));
      }
      dispatch(getActivitiesByUser(userId));
      dispatch(getCoffeeSizesByUser(userId));
      dispatch(getDrinksByUser(userId));

      if (!recordStatus) {
        return;
      }
      if (recordStatus.statusText === "OK") {
          message.success(`${nameUser} tu registro se guardo correctamente!!`,2500);
          message.success(`${nameUser} tu registro se guardo correctamente!!`,2500);
        dispatch(setStatusNewRecord());
        } else {
          message.error(`Error: al guardar registro`, 2500);
          message.error(`Error: al guardar registro`, 2500);
          dispatch(setStatusNewRecord());
        }
      
    }, 500);
  }, [value, sync, recordStatus, loading]);

  const PopupActivity = () => (
    <Popup
      trigger={<img src={menRuning} alt="" className="popup_ico" />}
      contentStyle={{ width: "40%" }}
      onClose={() => setNewActivity(false)}
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

          <label>Actividad</label>
          <select ref={activityRef} onChange={handlerSetActivity}>
            <option value="default">Selecciona...</option>
            {activitiesRedux.length > 0
              ? activitiesRedux.map((e, i) => {
                  return (
                    <option
                      key={e.id}
                      value={e.id}
                      disabled={record.activity.includes(e.id) ? true : false}
                    >
                      {e.activity}
                    </option>
                  );
                })
              : ""}
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
              <div
                className="div_map"
                key={`act-${i}`}
                onClick={eraseActivity}
                id={i}
              >
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
              ref={nameActivity}
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
      onClose={() => setNewCoffeeSize(false)}
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
            {coffeeSizesRedux.length > 0
              ? coffeeSizesRedux.map((e, i) => {
                  return (
                    <option
                      key={`coffee-${i}`}
                      value={e.id}
                      disabled={record.coffee.includes(e.id) ? true : false}
                    >
                      {e.size}
                    </option>
                  );
                })
              : ""}
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
              <div
                className="div_map"
                key={`coff-${i}`}
                onClick={eraseCoffee}
                id={i}
              >
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
              ref={nameCoffee}
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
      onClose={() => setNewDrink(false)}
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
            {drinksRedux.length > 0
              ? drinksRedux.map((e, i) => {
                  return (
                    <option
                      key={`drinksRe-${i}`}
                      value={e.id}
                      disabled={record.drink.includes(e.id) ? true : false}
                    >
                      {e.drink}
                    </option>
                  );
                })
              : ""}
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
              <div
                className="div_map"
                key={`drink-${i}`}
                onClick={eraseDrink}
                id={i}
              >
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
              ref={nameDrink}
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
    <div className="master">
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div className="form_container">
          <form onSubmit={handlerOnSubmit}>
            <div className="main_container">
              <div className="x_container">
                <Link
                  to="/private/home"
                  className="link"
                  onClick={()=>dispatch(setDay(""))}
                >
                  <div className="x">X</div>
                </Link>
              </div>
              <div className="div_head">
                <h2>
                  Nuevo Registro de {nameUser}
                  <img src={memo} alt="" className="memo" />
                </h2>
              </div>
              <div className="general_info_container">
                <div className="date_record_container">
                  <h5 className="h5_head">Fecha</h5>
                  <div>
                    <img src={calendar} alt="" className="main_ico" />
                    <input
                      type="date"
                      name="dateMeal"
                      value={record.dateMeal}
                      onChange={handlerOnChange}
                      ref={currentDay}
                    />
                  </div>
                </div>
                <div className="time_meal_container">
                  <h5 className="h5_head">Hora de tu cena</h5>
                  <div>
                    <img src={timeIco} alt="" className="main_ico" />
                    <input
                      type="time"
                      name="timeMeal"
                      value={record.timeMeal}
                      onChange={handlerOnChange}
                    />
                  </div>
                </div>
                <div
                  id="test_div"
                  className="meal_section"
                  hidden={record.timeMeal.length > 0 ? false : true}
                >
                  <h5>
                    Descripcion de tu cena{" "}
                    <img
                      src={checkImg}
                      alt=""
                      hidden={
                        record.timeMeal.length > 0 &&
                        record.description.length > 0
                          ? false
                          : true
                      }
                      className="img_ok"
                    />
                  </h5>
                  <textarea
                    name="description"
                    id=""
                    cols="70"
                    rows="5"
                    placeholder="Ingresa breve descripcion"
                    value={record.description}
                    onChange={handlerOnChange}
                    required={record.timeMeal.length > 0 ? true : false}
                  ></textarea>
                </div>
              </div>
              <div className="sleep_container" hidden={sync ? true : false}>
                <div>
                  <h2>
                    <img src={personBed} alt="" className="person_bed" />
                    Tiempo de Sueño{" "}
                    <img
                      src={checkImg}
                      alt=""
                      hidden={
                        time.startTime.length > 0 && time.endTime.length > 0
                          ? false
                          : true
                      }
                      className="img_ok"
                    />
                  </h2>
                </div>

                <div className="sync_div_true" hidden={temp.length < 1}>
                  <h3>
                    El dia{" "}
                    {dateStringToDate(
                      currentDay.current?.value.replace("-", "")
                    )}
                  </h3>
                  <h4>Dormiste: {sleepTime12Format}</h4>
                  <span
                    className="sync"
                    hidden={sleepTime.length > 0 ? false : true}
                    onClick={handlerSync}
                  >
                    sincronizar
                  </span>
                </div>

                <div className="sleep_section" hidden={temp.length > 0}>
                  <label>Dormiste </label>
                  <input
                    className="sleep_section_input"
                    type="time"
                    name="startTime"
                    id=""
                    value={time.startTime}
                    onChange={handlerSleepTimeChange}
                  />
                  <label> Despertaste </label>
                  <input
                    type="time"
                    name="endTime"
                    id=""
                    value={time.endTime}
                    onChange={handlerSleepTimeChange}
                  />
                  <div
                    className="sleep_result"
                    hidden={st && et ? false : true}
                  >
                    <h4>
                      Dormiste:{" "}
                      {sleepTime12Format ? sleepTime12Format : finalHours}
                    </h4>
                  </div>
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
      )}
    </div>
  );
};

export default Record;
