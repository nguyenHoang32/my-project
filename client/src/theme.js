import { createMuiTheme } from '@material-ui/core/styles'
const primary = "#17a2b8";
const dark = "#343a40";
const light = "#f4f4f4";
const danger = "#dc3545";
const success = "#28a745";
const border = "#ccc";
const theme = createMuiTheme({
  palette: {
    common: {
      primary,
      dark,
      light,
      danger,
      success,
      border,
    },
    primary: {
      main: primary,
    },
    error: {
      main: danger,
    },
    success: {
      main: success,
    },
  },
  typography: {
    small: {
      opacity: 0.85,
      marginBottom: '0.8em'
    },
  },
})
export default theme;