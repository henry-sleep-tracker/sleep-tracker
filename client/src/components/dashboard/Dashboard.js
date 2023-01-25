import React from "react";
import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from '@mui/material/Grid';

import Default from "./default/Default";
import Users from "./users/Users";
import Copyright from "./Copyright";
import SideList from "./SideList";

const mdTheme = createTheme();

function DashboardContent() {
  return (
    <ThemeProvider theme={mdTheme}>

      <Grid container spacing={1}>

        <Grid item xs="auto">
          <SideList />
        </Grid>

        <Grid item xs={10}>

          <Routes>
            <Route exact path="/" element={<Default />} />
            <Route exact path="/users" element={<Users />} />
          </Routes>

        </Grid>

        <Grid item xs={12}>
          <Copyright sx={{ pt: 4 }} />
        </Grid>

      </Grid>

    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
