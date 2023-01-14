import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateRange } from "react-date-range";
import { getSleepSession } from "../../actions/getUserHealthData";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Card, CardContent } from "@mui/material";
import { getRecordsRange } from "../../actions/records_data";

export default function Calendario() {
  const currentUser = useSelector((state) => state?.users.currentUser);

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(Date.now() - 86400000),
      key: "selection",
    },
  ]);
  const dispatch = useDispatch();

  const handleChange = (item) => {
    if (item.selection.startDate === item.selection.endDate) {
      setState([item.selection]);
    } else {
      setState([item.selection]);
      const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
      const startDate = new Date(item.selection?.startDate - tzoffset)
        .toISOString()
        .split("T")[0];
      const endDate = new Date(item.selection?.endDate - tzoffset)
        .toISOString()
        .split("T")[0];

      dispatch(getSleepSession(startDate, endDate));
      dispatch(getRecordsRange(currentUser.id, startDate, endDate));
    }
  };

  return (
    <Card>
      <CardContent>
        <DateRange
          editableDateInputs={true}
          onChange={handleChange}
          moveRangeOnFirstSelection={false}
          ranges={state}
        />
      </CardContent>
    </Card>
  );
}
