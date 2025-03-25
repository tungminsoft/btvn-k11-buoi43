import config from "../config";
import AdminLayout from "../layout/AdminLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import ProductDetail from "../pages/ProductDetail";
import Products from "../pages/Products";
import Register from "../pages/Register";
import Users from "../pages/Users";

const routes = [
  {
    path: config.routes.home,
    component: Home,
  },

  // Products
  {
    path: config.routes.products,
    component: Products,
    layout: AdminLayout,
    protected: true,
  },
  {
    path: config.routes.productDetail,
    component: ProductDetail,
    layout: null,
  },

  // Register
  {
    path: config.routes.register,
    component: Register,
    layout: null,
  },

  // Login
  {
    path: config.routes.login,
    component: Login,
    layout: null,
  },

  {
    path: config.routes.users,
    component: Users,
    layout: AdminLayout,
    protected: true,
  },

  // Not NotFound
  { path: config.routes.notFound, component: NotFound, layout: null },
];

export default routes;
