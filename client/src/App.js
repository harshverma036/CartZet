import { Container } from "@material-ui/core";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./Components/Header";
import HomeScreen from "./Screens/HomeScreen";
import LoginScreen from "./Screens/Login";
import RegisterScreen from "./Screens/RegisterScreen";

function App() {
  return (
    <Router>
      <Header />
      <Container maxWidth="lg">
        <Route path="/register" component={RegisterScreen} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/" component={HomeScreen} exact />
      </Container>
    </Router>
  );
}

export default App;
