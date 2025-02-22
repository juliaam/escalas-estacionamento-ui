import { AppSidebar, Header } from "@/components";
import { SidebarProvider } from "@/components/ui";
import { ReactElement } from "react";
import { Outlet } from "react-router-dom";

export function MainLayoutWrapper(): ReactElement {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="h-screen w-screen overflow-x-hidden">
        <Header />
        <main className="px-20">
          <Outlet />
        </main>
      </div>
      <AppSidebar />
    </SidebarProvider>
  );
}
