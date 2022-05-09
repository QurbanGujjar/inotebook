import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = (props) => {
  const { showAlert } = props;
  const navigate = useNavigate();
  const host = "http://localhost:5000";
  const [credential, setCredential] = useState({ email: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();


    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credential.email,
        password: credential.password,
      }),
    });


    const json = await response.json();

    console.log(json);

    if (json.success) {
      localStorage.setItem("token", json.authtoken);

      showAlert("Successully login", "success");
      navigate("/");
    } else {
      showAlert(json.error, "danger");
      // alert(json.error)

    }



  };
  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <h2>Enter credentials to get login</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email address
          </label>
          <input
            type='email'
            className='form-control'
            name='email'
            id='email'
            aria-describedby='emailHelp'
            onChange={onChange}
            value={credential.email}
          />
          <div id='emailHelp' className='form-text'>
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            type='password'
            className='form-control'
            name='password'
            id='password'
            onChange={onChange}
            value={credential.password}
          />
        </div>

        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
