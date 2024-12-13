import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";

export function MainLayoutWrapper(): ReactElement {
  return (
    <div className="h-screen w-screen overflow-x-hidden">
      <Header />
      <Outlet />
    </div>
  );
}
