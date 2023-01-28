import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  getSleepSession,
  getSleepStage,
} from "../../actions/getUserHealthData";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { getRecordsQuery } from "../../actions/records_data";

export default function Calendario() {
  const [value, setValue] = useState(new Date(Date.now() - 28800000));
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state?.users.currentUser);

  const dateChangeHandler = (event) => {
    const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
    const localISOTime = new Date(event - tzoffset).toISOString().split("T")[0];
    setValue(localISOTime);
    dispatch(getSleepStage(localISOTime));
    dispatch(getSleepSession(localISOTime));
    dispatch(getRecordsQuery(currentUser.id, localISOTime));
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Selecciona una fecha"
          value={value}
          onChange={dateChangeHandler}
          renderInput={(params) => <TextField size="small" {...params} />}
        />
      </LocalizationProvider>
    </div>
  );
}
