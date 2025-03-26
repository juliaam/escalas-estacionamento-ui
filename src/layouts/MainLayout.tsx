import { Header } from "@/components/Header/";
import { AppSidebar } from "@/components/Sidebar";

import { SidebarProvider } from "@/components/ui";
import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export function MainLayoutWrapper(): ReactElement {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="h-screen w-screen overflow-x-hidden bg-zinc-100">
        <Toaster />
        <Header />
        <main className="px-5">
          <Outlet />
        </main>
      </div>
      <AppSidebar />
    </SidebarProvider>
  );
}
