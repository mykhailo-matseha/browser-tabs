import { RouterProvider } from "react-router";
import "./App.css";
import Tabs from "./components/Tabs/Tabs";
import Icon from "./components/ui/Icon";
import MainLayout from "./layouts/MainLayout";
import router from "./router/routes";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
