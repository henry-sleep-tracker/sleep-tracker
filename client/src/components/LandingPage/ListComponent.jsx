import { List, ListItem, ListItemText } from "@mui/material";
import { makeStyles } from "@mui/styles";

import React from "react";

const ListComponent = () => {
  const classes = useStyles();

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.listRoot}
    >
      <ListItem>
        <ListItemText primary="Sweet Dreams" className={classes.text} />
      </ListItem>
    </List>
  );
};

export default ListComponent;

const useStyles = makeStyles((theme) => ({
  text: {
    color: "ea5933",
  },

  listRoot: {},
}));
