import { useState } from "react";
import { Container, CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { pink, teal } from "@material-ui/core/colors";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import HomeScreen from "./Screens/HomeScreen";
import LoginScreen from "./Screens/Login";
import RegisterScreen from "./Screens/RegisterScreen";
import ProductScreen from "./Screens/ProductScreen";
import CartScreen from "./Screens/CartScreen";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
      primary: {
        main: teal[500],
      },
      secondary: {
        main: pink[500],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header changeMode={() => setDarkMode(!darkMode)} />
        <Container maxWidth="lg">
          <Route path="/cart" component={CartScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/" component={HomeScreen} exact />
        </Container>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
