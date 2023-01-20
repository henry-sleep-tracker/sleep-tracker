import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Fab from "@mui/material/Fab";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Check from "@mui/icons-material/Check";
import Save from "@mui/icons-material/Save";
import { green } from "@mui/material/colors";
import { message } from "react-message-popup";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { updateUsers, getUsers } from "../../../actions/users";
import { restoreUserByJustEmail } from "../../../actions/index";
import { deleteUser } from "../../../actions/profileActions";
import { USER_ID } from "../../../actions/constants";

const UsersActions = ({ params, rowId, setRowId, pageState }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [loadingRestore, setLoadingRestore] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    isAdmin,
    names,
    lastNames,
    nationality,
    birthday,
    deletedAt,
    createdAt,
    id,
    email,
  } = params.row;

  const handleSubmit = async () => {
    setLoading(true);
    //Verificar names y lastNames no estan vacios. Falta Validar

    if (names && lastNames) {
      const result = await updateUsers(
        { isAdmin, names, lastNames, nationality, birthday, createdAt },
        id
      );
      if (result) {
        setSuccess(true);
        setRowId(null);
        dispatch(getUsers(pageState.page, pageState.pageSize));
      }
    } else {
      //alert('Nombre y Apellidos son requeridos');
      message.warn("Nombre y Apellidos son requeridos", 2500);
    }
    setLoading(false);
  };
  const restore = async () => {
    const result = dispatch(restoreUserByJustEmail(email)).then((result) => {
      message.success("El usuario ha sido activado.", 3000);
      setRowId(null);
      dispatch(getUsers(pageState.page, pageState.pageSize));
    });
  };
  const eliminate = async () => {
    const idAdmin = window.localStorage.getItem(USER_ID);
    const result = dispatch(deleteUser(id, idAdmin)).then((result) => {
      message.error("El usuario ha sido desactivado.", 3000);
      setRowId(null);
      dispatch(getUsers(pageState.page, pageState.pageSize));
    });
  };

  useEffect(() => {
    if (rowId === params.id && success) setSuccess(false);
    // eslint-disable-next-line
  }, [rowId]);

  return (
    <Box sx={{ m: 1, position: "relative" }}>
      {deletedAt ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: green[500],
            "&:hover": { bgcolor: green[700] },
          }}
          onClick={restore}
        >
          <Check />
        </Fab>
      ) : (
        <Fab color="primary" sx={{ width: 40, height: 40 }} onClick={eliminate}>
          <RemoveCircleIcon />
        </Fab>
      )}
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: green[500],
            "&:hover": { bgcolor: green[700] },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{ width: 40, height: 40 }}
          disabled={params.id !== rowId || loading}
          onClick={handleSubmit}
        >
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: green[500],
            position: "absolute",
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
};

export default UsersActions;
