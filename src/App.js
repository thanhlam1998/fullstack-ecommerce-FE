import { Route, Switch } from "react-router";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Header from "./pages/components/nav/Header";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
      </Switch>
    </>
  );
}

export default App;
