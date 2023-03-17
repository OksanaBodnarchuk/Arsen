import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import s from "./RegistrationPage.module.css";

const register = (user) => {
  return axios.post("http://localhost:3001/register", user);
};

const RegisrationPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = {
      email,
      password,
    };
    register(newUser)
      .then((res) => {
        console.log(res);
        toast("User successfully registered");
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        console.log(err.respons.data); //текст ошибки
        toast(err.respons.data);
      });
  };

  return (
    <div className={s.wrapper}>
      <form onSubmit={handleRegister} className={s.form}>
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
            minLength="8"
            //pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          />
        </div>
        <input className={s.submit} type="submit" value="Register" />
        <ToastContainer autoClouse={500} theme="light" hideProgressBar={true} />
      </form>
    </div>
  );
};

export default RegisrationPage;
