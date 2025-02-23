import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home } from "@/pages";
import { MainLayoutWrapper } from "@/layouts/MainLayout";
import { ManageCooperators } from "@/components/ManageCooperators";
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
]);
export const RouterProviderHook = () => {
  return <RouterProvider router={router}></RouterProvider>;
};
