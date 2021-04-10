import { useState } from "react";
import { Container, CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { pink, teal } from "@material-ui/core/colors";
import { Provider } from "react-redux";
import store from "./store";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import HomeScreen from "./Screens/HomeScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ProductScreen from "./Screens/ProductScreen";
import CartScreen from "./Screens/CartScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import ShippingScreen from "./Screens/ShippingScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";
import OrderScreen from "./Screens/OrderScreen";
import AdminProductsScreen from "./Screens/AdminProductsScreeen";
import AdminUsersScreeen from "./Screens/AdminUsersScreen";
import AdminOrdersScreeen from "./Screens/AdminOrdersScreeen";
import AdminUserEditScreen from "./Screens/AdminUserEditScreen";
import AdminProductEditScreen from "./Screens/AdminEditProductScreen";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
      primary: {
        main: pink[700],
      },
      secondary: {
        main: teal[500],
      },
    },
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Header changeMode={() => setDarkMode(!darkMode)} />
          <Container maxWidth="lg">
            <Switch>
              <Route
                path="/admin/users/edit/:id"
                component={AdminUserEditScreen}
              />
              <Route path="/admin/" component={AdminUsersScreeen} exact />
              <Route path="/admin/users" component={AdminUsersScreeen} exact />
              <Route path="/admin/orders" component={AdminOrdersScreeen} />
              <Route
                path="/admin/products/:id"
                component={AdminProductEditScreen}
              />
              <Route path="/admin/products" component={AdminProductsScreen} />
              <Route path="/order/:id" component={OrderScreen} />
              <Route path="/placeorder" component={PlaceOrderScreen} />
              <Route path="/payment" component={PaymentScreen} />
              <Route path="/shipping" component={ShippingScreen} />
              <Route path="/profile" component={ProfileScreen} />
              <Route path="/cart/:id?" component={CartScreen} />
              <Route path="/product/:id" component={ProductScreen} />
              <Route path="/register" component={RegisterScreen} />
              <Route path="/login" component={LoginScreen} />
              <Route path="/search/:keyword" component={HomeScreen} exact />
              <Route path="/" component={HomeScreen} exact />
            </Switch>
          </Container>
          <Footer />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
