import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getSleepByDate } from "../../actions/getSleepData";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { getRecordsQuery } from "../../actions/newRecord";

export default function Calendario() {
  const [value, setValue] = useState(new Date(Date.now() - 28800000));
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state?.users.currentUser);
  let id = currentUser.id


  const dateChangeHandler = (event) => {
    const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
    const localISOTime = new Date(event - tzoffset).toISOString().split("T")[0];
    setValue(localISOTime);
    dispatch(getSleepByDate(localISOTime));
    let date = localISOTime
    dispatch(getRecordsQuery(id, date))
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Fecha"
          value={value}
          onChange={dateChangeHandler}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </div>
  );
}
