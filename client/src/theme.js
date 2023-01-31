// import { createTheme } from "@mui/material";

// export const theme = createTheme({
//     palette: {
//         primary: {
//             main: "#42a5f5",
//             light: "#e3f2fd",
//         },
//         secondary: {
//             main: '#15c630',
//         },
//         lightFont:
//         {
//             main: "#e3f2fd",
//             light: "#e3f2fd",
//         },
//     }
// })

import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
      background: "rgb(250, 250, 251)",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
    lightFont: {
      main: "#e3f2fd",
      light: "#e3f2fd",
    },
  },
});
