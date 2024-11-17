import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home } from "../Home";
import { Config } from "../Config";
import { MainLayoutWrapper } from "../../layouts/MainLayout";

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
