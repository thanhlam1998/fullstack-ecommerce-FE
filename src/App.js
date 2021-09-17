import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { actionTypes } from "./actions/types";
import { auth } from "./firebase";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";
import Header from "./pages/components/nav/Header";
import Home from "./pages/Home";

const App = () => {
  const dispatch = useDispatch();

  // To check firebase auth state
  useEffect(() => {
    const unsubscibe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: actionTypes.LOGGED_IN_USER,
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });
      }
    });
    // cleanup
    return () => {
      unsubscibe();
    };
  }, []);

  return (
    <>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
      </Switch>
    </>
  );
};

export default App;
