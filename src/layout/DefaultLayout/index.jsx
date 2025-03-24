import { Outlet } from "react-router-dom";
import Header from "../../components/Header";

const DefaultLayout = () => {
  return (
    <>
      <div>Default Layout</div>
      <Header />
      <Outlet />
    </>
  );
};

export default DefaultLayout;
