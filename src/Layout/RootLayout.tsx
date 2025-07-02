import Navaber from "@/_Components/Navbar/Navaber";
import React from "react";
import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <div>
      <Navaber></Navaber>
      <Outlet></Outlet>
    </div>
  );
}
