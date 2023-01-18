
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// MUI Imports
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import { parseISO } from "date-fns";

// Actions Imports
import { setDay } from "../../actions/loading";

// Import helpers
import { dayMaker } from "../../helpers/day_maker_loading";


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
  const [value, /* setValue */] = useState();

  const onChangeHandler = value => {
    let day = ("0" + value.getDate()).slice(-2);
    let month = ("0" + (value.getMonth() + 1)).slice(-2);
    let today = value.getFullYear() + "-" + month + "-" + day;
    dispatch(setDay(today));
    navigate("/private/loading");
  };

  useEffect(() => {}, [value]);

  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label={text}
          value={day?parseISO(day):dayMaker()}
          onChange={onChangeHandler}
          renderInput={params => <TextField {...params} />}
        />
      </LocalizationProvider>
    </Box>
  );
}

export default DateSelector
