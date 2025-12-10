import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";

export const Router = createBrowserRouter([
  {
    path: "/",
    Component:MainLayout
  },
]);
