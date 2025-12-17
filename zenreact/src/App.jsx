import React from "react";
import Feve from "./components/Feve.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { Outlet } from "react-router-dom";

export const App = () => {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Feve />
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
};
export default App;
