import React from "react";
import Mainscreen from "./Components/Mainscreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import { useState } from "react";
import AuthContext from "./Context/Authcontext";

const App = () => {
const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("Usertoken"));

  const login = (token) => {
  localStorage.setItem("Usertoken", token);
  setIsLoggedIn(true);
};

  console.log(isLoggedIn);

  const logout = () => {
    localStorage.removeItem("Usertoken");
    setIsLoggedIn(false);
  };
  let appRoutes;

  if (isLoggedIn) {
    appRoutes = (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="webapp" element={<Mainscreen />} />
      </Routes>
    );
  } else {
    appRoutes = (
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    );
  }

  console.log(appRoutes);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <BrowserRouter>
        <div>
          <div className="body">{appRoutes}</div>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};
export default App;
