import React, { useContext } from "react";
import Login from "../components/Login";
import "../styles/Login.css";
import { UserContext } from "../context/UserContext";

const LoginPage = () => {
  const { handleUser, handleEmail, handlePass, handleInvitado, handleAdmin } = useContext(UserContext);
  
  return (
    <div>
      <Login handleUser={handleUser} handleEmail={handleEmail} handlePass={handlePass} handleInvitado={handleInvitado} handleAdmin={handleAdmin} />
    </div>
  );
}

export default LoginPage;