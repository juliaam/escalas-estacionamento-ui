import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";

export function MainLayoutWrapper(): ReactElement {
  return (
    <div className="w-screen h-dvh">
      <div className="h-full">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
