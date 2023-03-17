import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginSuccess } from "../../redux/userSlice";
import s from "./LoginPage.module.css";

const login = (user) => {
  return axios.post("http://localhost:3001/login", user);
};

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const currentUser = {
      email,
      password,
    };
    login(currentUser)
    .then(res => {
        console.log(res);
        setName(res.data.user.name)
        setEmail("")
        setPassword("")
        /* toast("successfully logged in") */
        navigate('/profile')
        dispatch(loginSuccess(res.data.user))
    })
    .catch(err =>  {
        console.log(err)
        toast("incorrect login or password")
    })    
  };

  return (
    <>
    <h1>{name}</h1>
   {/*  {!name && form} */}
    <form onSubmit={handleLogin} className={s.form}>
      <div>
        <label htmlFor="email">Email</label>
        <input
        className={s.control}
          type="email"
          name="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="pass">Password</label>
        <input
        className={s.control}
          type="password"
          name="pass"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}          
        />
      </div>
      <input className={s.submit} type="submit" value="To come in" />
      <ToastContainer autoClouse={500} theme="light" hideProgressBar={true} />
    </form>
    </>
  );
};

export default LoginPage;
