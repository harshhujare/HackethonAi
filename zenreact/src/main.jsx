import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./components/Home.jsx";
import ShortFilms from "./components/ShortFilms.jsx";
import { BrowserRouter, Route, Router, Link, Routes } from "react-router-dom";
import Account from "./components/Account.jsx";
import Ai from "./components/Ai/Ai.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/home" element={<Home />} />
          <Route path="short-films" element={<ShortFilms />} />
          <Route path="Ai" element={<Ai />} /> 
        </Route>
        <Route path="/Account" element={<Account />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
