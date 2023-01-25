import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


// MUI Imports
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";

// Actions Imports

import { setTime, setStartTime, setEndTime } from "../../actions/loading";

//>======================>//
//> Starts Component
//>======================>//


const TimeMealSelector = ({ text, clean }) => {
  
  const dispatch = useDispatch()

  const [value, setValue] = useState(null);
  
  const onChangeHandler = value => {
    setValue(value);
    let str = value?.toString().slice(16, 24);
    dispatch(setTime(str));
  }

  useEffect(() => {
    
  })

  return (
    <Box>
      
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TimePicker
          componentsProps={{
            actionBar: {
              actions: ["clear"],
              sx: { justifyContent: "center" },
            },
          }}
          label={text}
          value={clean?null:value}
          onChange={onChangeHandler}
          renderInput={props => <TextField {...props} />}
        />
      </LocalizationProvider>
    
    </Box>
  );
}

const StartTime = ({ text, clean }) => {
  const dispatch = useDispatch();

  const [value, setValue] = useState(null);

  const onChangeHandler = value => {
    setValue(value);
    let str = value?.toString().slice(16, 24);
    dispatch(setStartTime(str));
  };

  useEffect(() => {});

  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TimePicker
          componentsProps={{
            actionBar: {
              actions: ["clear"],
              sx: { justifyContent: "center" },
            },
          }}
          label={text}
          value={clean ? null : value}
          onChange={onChangeHandler}
          renderInput={props => <TextField {...props} />}
        />
      </LocalizationProvider>
    </Box>
  );
};

const EndTime = ({ text, clean }) => {
  const dispatch = useDispatch();

  const [value, setValue] = useState(null);

  const onChangeHandler = value => {
    setValue(value);
    let str = value?.toString().slice(16, 24);
    dispatch(setEndTime(str));
  };

  useEffect(() => {});

  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TimePicker
          componentsProps={{
            actionBar: {
              actions: ["clear"],
              sx: { justifyContent: "center" },
            },
          }}
          label={text}
          value={clean ? null : value}
          onChange={onChangeHandler}
          renderInput={props => <TextField {...props} />}
        />
      </LocalizationProvider>
    </Box>
  );
};

export { StartTime, EndTime };
export default TimeMealSelector;