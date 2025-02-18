import { AppSidebar, Header } from "@/components";
import { SidebarProvider } from "@/components/ui";
import { ReactElement } from "react";
import { Outlet } from "react-router-dom";

export function MainLayoutWrapper(): ReactElement {
  return (
    <SidebarProvider>
      <div className="h-screen w-screen overflow-x-hidden">
        <Header />
        <Outlet />
      </div>
      <AppSidebar />
    </SidebarProvider>
  );
}
