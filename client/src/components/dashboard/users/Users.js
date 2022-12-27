import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled, Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar, gridClasses, esES } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";

import { getUsers } from "../../../actions/users";
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
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);

  useEffect(() => {
    if (users.length === 0) dispatch(getUsers());
    // eslint-disable-next-line
  }, []);

  function getFullName(params) {
    return `${params.row.lastnames}, ${params.row.names}`;
  }

  const columns = useMemo(
    () => [
      {
        field: "fullName",
        headerName: "Nombre Completo",
        width: 225,
        valueGetter: getFullName,
      },
      {
        field: "lastnames",
        headerName: "Apellidos",
        width: 170,
        editable: true,
      },
      { field: "names", headerName: "Nombres", width: 170, editable: true },
      {
        field: "isSubscribed",
        headerName: "Suscripción",
        type: "singleSelect",
        valueOptions: ["true", "false"],
        editable: true,
      },
      {
        field: "birthday",
        headerName: "Nacimiento",
        type: "date",
        editable: true,
      },
      {
        field: "isAdmin",
        headerName: "Rol",
        width: 85,
        type: "singleSelect",
        valueOptions: ["true", "false"],
        editable: true,
      },
      {
        field: "nationality",
        headerName: "Nacionalidad",
        width: 125,
        editable: true,
      },
      { field: "email", headerName: "Email", width: 170, editable: true },
      { field: "created_at", headerName: "Registrado", width: 200 },

      {
        field: "actions",
        headerName: "Acciones",
        type: "actions",
        renderCell: (params) => (
          <UsersActions {...{ params, rowId, setRowId }} />
        ),
      },
    ],
    [rowId]
  );

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Box sx={{ height: 455, width: "100%" }}>
        <Typography
          variant="h5"
          component="h5"
          sx={{ textAlign: "left", mt: 0, mb: 2 }}
        >
          Usuarios
        </Typography>

        <DataGrid
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          initialState={{
            columns: {
              columnVisibilityModel: {
                lastnames: false,
                names: false,
                created_at: false,
              },
            },
          }}
          columns={columns}
          rows={users}
          rowsPerPageOptions={[5, 10, 20]}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
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
          components={{ Toolbar: GridToolbar }}
        />
      </Box>

      <DrawerHeader />
    </Box>
  );
}

export default function Users() {
  return <UsersContent />;
}
