import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { actionTypes } from "../../actions/types";
import { auth } from "../../firebase";
import { createOrUpdateUser } from "../../functions/auth";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration") || "");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validation
    if (!email || !password) {
      toast.error("Email and password is required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (result.user?.emailVerified) {
        // remove user email from local storage
        window.localStorage.removeItem("emailForRegistration");
        // get user id token
        let user = auth.currentUser;
        await user?.updatePassword(password);
        const idTokenResult = await user?.getIdTokenResult();
        // Redux store
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            const { name, email, role, _id } = res.data;
            dispatch({
              type: actionTypes.LOGGED_IN_USER,
              payload: {
                name,
                email,
                token: idTokenResult.token,
                role,
                _id,
              },
            });
          })
          .catch();
        // redirect
        history.push("/");
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const completeRegistrationForm = (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control mb-3"
        value={email}
        disabled
      />
      <input
        type="password"
        className="form-control"
        value={password}
        placeholder="Password"
        onChange={onPasswordChange}
      />
      <br />
      <button type="submit" className="btn btn-light">
        COMPLETE REGISTRATION
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register Complete</h4>
          {completeRegistrationForm}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
