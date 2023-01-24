import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled, Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { DataGrid, gridClasses, esES, } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";

import CustomToolbar from './CustomToolbar';
import CustomPagination from './CustomPagination';

import { getUsers, getNationalities } from "../../../actions/users";
import { nationalities } from "../../../actions/nationalities";
import UsersActions from "./UsersActions";


const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

function UsersContent() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  const [rowId, setRowId] = useState(null);
  const [pageState, setPageState] = useState({
    isLoading: false,
    users: users.users,
    total: users.total,
    page: 1,
    pageSize: 5,
  });

  const [filters, setFilters] = useState({
    nationality: "",
    plan: "",
    lastNames: "",
  });

  const [search, setSearch] = useState("");
  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
  };
  const handleSearch = (event) => {
    if (event.target.name === "limpiar") {
      setSearch("");
      setFilters((filters) => ({ ...filters, lastNames: "" }));
    } else {
      setFilters((filters) => ({ ...filters, lastNames: search }));
    }
  };

  useEffect(() => {
    dispatch(getUsers(pageState.page, pageState.pageSize, filters));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(getNationalities());
    setPageState((old) => ({
      ...old,
      isLoading: false,
      users: users.users,
      total: users.total,
    }));
  }, [dispatch, users]);

  useEffect(() => {
    setPageState((old) => ({ ...old, isLoading: true }));
    dispatch(getUsers(pageState.page, pageState.pageSize, filters));
    // eslint-disable-next-line
  }, [pageState.page, pageState.pageSize]);

  useEffect(() => {
    setPageState((old) => ({ ...old, isLoading: true }));
    dispatch(getUsers(pageState.page, pageState.pageSize, filters));
    // eslint-disable-next-line
  }, [filters]);

  // useEffect(() => {
  //   console.log('users', users);
  //   console.log('pageState', pageState);
  // });

  function getFullName(params) {
    return `${params.row.lastNames}, ${params.row.names}`;
  }

  const columns = useMemo(
    () => [
      {
        field: "fullName",
        headerName: "Nombre Completo",
        width: 200,
        valueGetter: getFullName,
      },
      {
        field: "lastNames",
        headerName: "Apellidos",
        width: 170,
        editable: true,
      },
      { field: "names", headerName: "Nombres", width: 170, editable: true },
      { field: "email", headerName: "Email", width: 170 },
      {
        field: "plan",
        headerName: "Suscripción",
        width: 125,
        headerAlign: "center",
        align: "center",
        valueGetter: (params) => {
          return params.row.plan?.name || "Ninguno";
        },
      },
      {
        field: "isAdmin",
        headerName: "Admin",
        width: 85,
        headerAlign: "center",
        align: "center",
        type: "singleSelect",
        editable: true,
        valueOptions: [
          { value: true, label: "Si" },
          { value: false, label: "No" },
        ],
        valueFormatter: (params) => {
          if (params.value === true) return "Si";
          else return "No";
        },
      },
      {
        field: "birthday",
        headerName: "Nacimiento",
        type: "date",
        editable: true,
      },
      {
        field: "nationality",
        headerName: "Nacionalidad",
        width: 125,
        headerAlign: "center",
        align: "center",
        type: "singleSelect",
        editable: true,
        valueOptions: nationalities,
      },
      {
        field: "lastConnection",
        headerName: "Última Conexión",
        type: "date",
        width: 125,
      },
      {
        field: "createdAt",
        headerName: "Creado",
        type: "date",
        width: 175,
        editable: true,
      },
      { field: "deletedAt", headerName: "Eliminado", type: "date", width: 175 },
      {
        field: "actions",
        headerName: "Acciones",
        type: "actions",
        renderCell: (params) => (
          <UsersActions {...{ params, rowId, setRowId, pageState, filters }} />
        ),
      },
    ],
    // eslint-disable-next-line
    [rowId, pageState]
  );

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Box sx={{ height: 455, width: "100%" }}>
        <Box
          sx={{
            mb: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" component="h5">
            Usuarios
          </Typography>

          <Box>
            <Grid container spacing={2}>
              <Grid item>
                <TextField
                  id="search"
                  label="Buscar Usuario"
                  placeholder="Apellido"
                  variant="standard"
                  value={search}
                  onChange={handleChangeSearch}
                />
              </Grid>

              <Grid item>
                <Button variant="contained" onClick={handleSearch}>
                  Buscar
                </Button>
              </Grid>

              <Grid item>
                <Button
                  name="limpiar"
                  variant="contained"
                  onClick={handleSearch}
                >
                  Limpiar
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <DataGrid
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          initialState={{
            columns: {
              columnVisibilityModel: {
                lastNames: false,
                names: false,
                createdAt: false,
                deletedAt: false,
              },
            },
          }}
          columns={columns}
          rows={pageState.users}
          pageSize={pageState.pageSize}
          paginationMode="server"
          rowCount={pageState.total}
          loading={pageState.isLoading}
          onPageChange={(newPage) =>
            setPageState((old) => ({ ...old, page: newPage + 1 }))
          }
          page={pageState.page - 1}
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 3,
            bottom: params.isLastVisible ? 0 : 3,
          })}
          sx={{
            [`& .${gridClasses.row}`]: {
              bgcolor: (theme) =>
                theme.palette.mode === "light" ? grey[200] : grey[900],
            },
          }}
          onCellEditCommit={(params) => setRowId(params.id)}
          components={{
            Toolbar: CustomToolbar,
            Pagination: CustomPagination,
          }}
          componentsProps={{
            pagination: { totalUsers: users.total },
            toolbar: { filters: filters, setFilters: setFilters },
          }}
        />
      </Box>

      <DrawerHeader />
    </Box>
  );
}

export default function Users() {
  return <UsersContent />;
}
