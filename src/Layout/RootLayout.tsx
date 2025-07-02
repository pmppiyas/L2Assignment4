import Footer from "@/_Components/Footer/Footer";
import Navaber from "@/_Components/Navbar/Navaber";
import React from "react";
import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <div className="max-w-7xl mx-auto">
      <Navaber></Navaber>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
}
