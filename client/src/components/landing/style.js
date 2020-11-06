import showcaseImage from '../../img/showcase.jpg';

const style = (theme) => ({
  landingContainer: {
    position: "relative",
    height: "100vh",
    background: `url(${showcaseImage}) no-repeat center center/cover`
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
  },
  landingContent: {
    color: "white",
    textAlign: "center",
    paddingTop: "10em",
  },
  title: {
    marginBottom: "0.8em",
    [theme.breakpoints.down("md")]: {
      lineHeight: "95%",
    },
  },
  desc: {
    fontSize: "1.2rem",
    [theme.breakpoints.down("md")]: {
      fontSize: "1rem",
    },
  },
  btnContainer: {
    marginTop: "1.5em",
  },
  btnSignUp: {
    backgroundColor: theme.palette.common.primary,
    marginRight: "1.5em",
  },
  btnLogin: {},
})
export default style;