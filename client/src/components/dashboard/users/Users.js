import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled, Box, Typography } from "@mui/material";
import { 
  DataGrid, 
  GridToolbarContainer, 
  GridToolbarColumnsButton, 
  gridClasses, 
  esES, 
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector
} from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import Pagination from '@mui/material/Pagination';

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

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
    </GridToolbarContainer>
  );
}

function CustomPagination({ totalUsers }) {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box>
        Usuarios Totales: { totalUsers }
      </Box>
      <Pagination
        color="primary"
        count={pageCount}
        page={page + 1}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
  </Box>
  );
};

function UsersContent() {

  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  
  const [rowId, setRowId] = useState(null);

  const [pageState, setPageState] = useState({
    isLoading: false,
    users: users.users,
    total: users.total,
    page: 1,
    pageSize: 5
  });

  useEffect(() => {
    dispatch(getUsers(pageState.page, pageState.pageSize));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setPageState(old => ({ ...old, isLoading: false, users: users.users, total: users.total }));
  }, [users]);

  useEffect(() => {
      setPageState(old => ({ ...old, isLoading: true }));
      dispatch(getUsers(pageState.page, pageState.pageSize));
      // eslint-disable-next-line
  }, [pageState.page, pageState.pageSize]);
  
  useEffect(() => {
    console.log('users', users);
    console.log('pageState', pageState);
  });

  function getFullName(params) {
    return `${params.row.lastNames}, ${params.row.names}`;
  }

  const columns = useMemo(
    () => [
      { field: "fullName", headerName: "Nombre Completo", width: 200, valueGetter: getFullName },
      { field: "lastNames", headerName: "Apellidos", width: 170, editable: true },
      { field: "names", headerName: "Nombres", width: 170, editable: true },
      { field: "email", headerName: "Email", width: 170 },
      { field: "plan", headerName: "Suscripción", width: 125, headerAlign: 'center', align: 'center',
          valueGetter:  params => { 
          console.log(params);
          return params.row.plan?.name || 'Basico';
        }
      },
      { field: "isAdmin", headerName: "Admin", width: 85, headerAlign: 'center', align: 'center', 
        type: "singleSelect", editable: true, 
        valueOptions: [{ value: true, label: 'Si' }, { value: false, label: 'No'} ], 
        valueFormatter: params => {
          if(params.value === true ) return 'Si';
          else return 'No';
        }
      },
      { field: "birthday", headerName: "Nacimiento", type: "date", editable: true },
      { field: "nationality", headerName: "Nacionalidad", width: 125, editable: true },
      { field: "lastConnection", headerName: "Última Conexión", type: "date", width: 125 }, 
      { field: "createdAt", headerName: "Creado", type: "date", width: 175 },
      { field: "deletedAt", headerName: "Eliminado", type: "date", width: 175 },
      { field: "actions", headerName: "Acciones", type: "actions",
        renderCell: (params) => (
          <UsersActions {...{ params, rowId, setRowId, pageState }} />
        ),
      },
    ],
    [rowId, pageState]
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
          onPageChange={ (newPage) => setPageState( old => ({ ...old, page: newPage + 1}) ) }
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
