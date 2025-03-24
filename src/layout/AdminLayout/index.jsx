import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <div>Admin Layout</div>
      <Outlet />
    </>
  );
};

export default AdminLayout;
