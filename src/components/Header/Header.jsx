import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import s from "./Header.module.css";

const Header = () => {
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);
  return (
    <header className={s.header}>
      <nav className={s.nav}>
        <Link to="/"> Home </Link>
        <Link to="/about "> About </Link>
        <Link to="/contacts"> Contacts </Link>
        <Link to="/addnote"> Add post </Link>
        {
            user ? (
                <Link to="/profile">{user.name}</Link>
            ) : 
            (
                <>
                <Link to="/register"> Registration </Link>
                <Link to="/login"> Login</Link>
                </>
            )
        }
      </nav>
    </header>
  );
};

export default Header;
