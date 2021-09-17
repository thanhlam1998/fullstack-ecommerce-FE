import React, { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase";

const Register = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      // URL you want to redirect back to
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL || "",
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email is sent to ${email}. Click the link to complete your registration,`
    );

    // Save user email to local storage
    window.localStorage.setItem("emailForRegistration", email);
    // clear state
    setEmail("");
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const registerForm = (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        placeholder="Email"
        onChange={onEmailChange}
        autoFocus
      />
      <button type="submit" className="btn btn-light mt-3">
        REGISTER
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {registerForm}
        </div>
      </div>
    </div>
  );
};

export default Register;
