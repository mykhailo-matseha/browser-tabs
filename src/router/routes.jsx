import { createBrowserRouter } from "react-router";
import MainLayout from "@/layouts/MainLayout";
import { initialTabs } from "@/data/initialTabs";

export const routes = [
  {
    path: "/",
    Component: MainLayout,
    children: [
      ...initialTabs.map((tab) => ({
        path: tab.path.replace(/^\//, ""),
        element: <div>{tab.title}</div>,
      })),
      {
        index: true,
        element: <div>Select tab please :)</div>,
      },
    ],
  },
];

const router = createBrowserRouter(routes);
export default router;
