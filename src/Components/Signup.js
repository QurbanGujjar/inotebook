import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const {showAlert}=props;
  const host = "http://localhost:5000";
  const navigate = useNavigate()
  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "",
    cpassword:""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(credential)
    const {name,email,password}=credential

    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const json = await response.json();

    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      showAlert("Successully create account", "success");
    } else {
      // alert(json.error);
      showAlert(json.error, "danger");
    }
  };
  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  return (
    <div className='container'>
      <h2>Create your accont in Inotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Name
          </label>
          <input
            type='text'
            className='form-control'
            id='name'
            name="name"
            onChange={onChange}
            value={credential.name}
            aria-describedby='emailHelp'
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email
          </label>
          <input
            type='email'
            className='form-control'
            id='email'
            name="email"
            onChange={onChange}
            value={credential.email}
            aria-describedby='emailHelp'
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            type='password'
            className='form-control'
            onChange={onChange}
            id='password'
            name="password"
            value={credential.password}
            required
            minLength={5}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='cpassword' className='form-label'>
            Confirm Password
          </label>
          <input
            type='password'
            className='form-control'
            onChange={onChange}
            id='cpassword'
            name="cpassword"
            value={credential.cpassword}
            required
            minLength={5}
          />
        </div>

        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
