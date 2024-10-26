// AppRoutes.js
import { useRoutes } from "react-router-dom";
import Add from "../pages/add/Add";

function AppRoutes() {
  const routes = useRoutes([
    { path: "/", 
      element: <Add /> 
    }
  ]);

  return routes;
}

export default AppRoutes;
