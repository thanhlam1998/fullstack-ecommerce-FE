import { GoogleOutlined, MailOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { actionTypes } from "../../actions/types";
import { auth, googleAuthProvider } from "../../firebase";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user?.getIdTokenResult();
      dispatch({
        type: actionTypes.LOGGED_IN_USER,
        payload: {
          email: user?.email,
          token: idTokenResult?.token,
        },
      });
      history.push("/");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user?.getIdTokenResult();
        dispatch({
          type: actionTypes.LOGGED_IN_USER,
          payload: {
            email: user?.email,
            token: idTokenResult?.token,
          },
        });
        history.push("/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const loginForm = (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control mb-3"
        value={email}
        id="loginFormUserName"
        placeholder="Your email"
        onChange={onEmailChange}
        autoFocus
      />
      <input
        type="password"
        className="form-control"
        value={password}
        placeholder="Your password"
        onChange={onPasswordChange}
      />

      <br />
      <Button
        onClick={handleSubmit}
        type="primary"
        className="mb-3"
        block
        shape="round"
        icon={<MailOutlined />}
        size="large"
        loading={loading}
        disabled={!email || password.length < 6}>
        Login with Email/Password
      </Button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Login</h4>
          )}
          {loginForm}
          <Button
            onClick={googleLogin}
            type="primary"
            danger
            className="mb-3"
            block
            shape="round"
            icon={<GoogleOutlined />}
            size="large">
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
