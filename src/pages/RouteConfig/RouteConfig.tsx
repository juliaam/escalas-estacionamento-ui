import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Config, Home } from "@/pages";
import { MainLayoutWrapper } from "@/layouts/MainLayout";

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
        path: "config",
        element: <Config />,
      },
    ],
  },
]);
export const RouterProviderHook = () => {
  return <RouterProvider router={router}></RouterProvider>;
};
