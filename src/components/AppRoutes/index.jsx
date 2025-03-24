import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "../../layout/DefaultLayout";
import Home from "../../pages/Home";
import routes from "../../routers";
import NoLayout from "../../layout/NoLayout";
import NotFound from "../../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      {routes.map((route) => {
        const Component = route.component;
        const Layout =
          route.layout === undefined ? DefaultLayout : route.layout || NoLayout;

        return (
          <Route key={route.path} element={<Layout />}>
            <Route path={route.path} element={<Component />} />
          </Route>
        );
      })}
    </Routes>
  );
};

export default AppRoutes;
