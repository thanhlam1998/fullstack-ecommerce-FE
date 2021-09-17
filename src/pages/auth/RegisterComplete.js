import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        console.log("User: ", user, "idTokenResult: ", idTokenResult);
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
      <input type="email" className="form-control" value={email} disabled />
      <input
        type="password"
        className="form-control"
        value={password}
        placeholder="Password"
        onChange={onPasswordChange}
      />
      <button type="submit" className="btn btn-light mt-3">
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
