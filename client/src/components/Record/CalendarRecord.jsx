
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// MUI Imports
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";

// Actions Imports
import { setDay } from "../../actions/loading";


//>======================>//
//> Starts Component
//>======================>//

const DateSelector = ({ text, date, onChange }) => {
  // Hooks init
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /******************** Redux States Section *********************/
  const day = useSelector(state => state.loading.day);

  /******************** Local States Section *********************/
  const [value, setValue] = useState(new Date());

  const onChangeHandler = value => {
    setValue(value);
    let str = value.toISOString().slice(0, 10);
    let regex = /"-"/i;
    dispatch(setDay(str.replace(regex, "")));
    navigate("/private/loading");
  };

  useEffect(() => {}, [value]);

  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label={text}
          value={day ? day : value}
          onChange={onChangeHandler}
          renderInput={params => <TextField {...params} />}
        />
      </LocalizationProvider>
    </Box>
  );
}

export default DateSelector
