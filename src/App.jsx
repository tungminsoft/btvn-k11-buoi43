import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./components/AppRoutes";
import ScrollTop from "./components/ScrollTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollTop />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
