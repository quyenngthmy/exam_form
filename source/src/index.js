import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import "./index.scss";
import { createRoot } from "react-dom/client";
import "./js/index";
import FormLogin from "./components/FormLogin";
import FormRegister from "./components/FormRegister";
import CurrentUser from "./components/CurrentUser";

if (document.getElementById("form-login")) {
  const formLogin = document.getElementById("form-login");
  const formRoot = createRoot(formLogin);
  formRoot.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormLogin />} />
        <Route path="/user" element={<CurrentUser />} />
      </Routes>
    </BrowserRouter>
  );
}

if (document.getElementById("form-register")) {
  const formRegister = document.getElementById("form-register");
  const formRoot = createRoot(formRegister);
  formRoot.render(
    <BrowserRouter>
      <Routes>
        <Route path="/register.html" element={<FormRegister />} />
        <Route path="/user" element={<CurrentUser />} />
      </Routes>
    </BrowserRouter>
  );
}
