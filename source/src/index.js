import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import { createRoot } from "react-dom/client";
import "./js/index";
import FormLogin from "./components/FormLogin";
import FormRegister from "./components/FormRegister";
if (document.getElementById("form-login")) {
  const formLogin = document.getElementById("form-login");
  const formRoot = createRoot(formLogin);
  formRoot.render(
    <BrowserRouter>
      <FormLogin />
    </BrowserRouter>
  );
}

if (document.getElementById("form-register")) {
  const formRegister = document.getElementById("form-register");
  const formRoot = createRoot(formRegister);
  formRoot.render(
    <BrowserRouter>
      <FormRegister />
    </BrowserRouter>
  );
}
