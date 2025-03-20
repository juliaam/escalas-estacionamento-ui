import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "@/pages/Home";
import { MainLayoutWrapper } from "@/layouts/MainLayout";
import { ManageCooperators } from "@/components/ManageCooperators";
import NotFound from "../NotFound";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayoutWrapper />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/gerenciador-cooperadores",
        element: <ManageCooperators />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
export const RouterProviderHook = () => {
  return <RouterProvider router={router}></RouterProvider>;
};
