import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mainColor: {
      purple: "#6f6af8",
      purpleLight: "#f2f2fd",
    },
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
});

export default theme;
