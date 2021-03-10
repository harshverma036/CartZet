import { Container } from "@material-ui/core";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./Components/Header";
import LoginScreen from "./Screens/Login";

function App() {
  return (
    <Router>
      <Header />
      <Container maxWidth="lg">
        <Route path="/login" component={LoginScreen} />
      </Container>
    </Router>
  );
}

export default App;
