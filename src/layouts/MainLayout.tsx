import { Header } from "@/components/Header/";
import { AppSidebar } from "@/components/Sidebar";

import { SidebarProvider } from "@/components/ui";
import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export function MainLayoutWrapper(): ReactElement {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex h-screen w-screen flex-col overflow-x-hidden bg-zinc-100">
        <Toaster />
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
      </div>
      <AppSidebar />
    </SidebarProvider>
  );
}
