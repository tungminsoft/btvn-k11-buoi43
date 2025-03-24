import { useState } from "react";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    setIsLoading(true);
    fetch("https://api01.f8team.dev/api/auth/logout", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);

        if (res.status === "success") {
          localStorage.removeItem("token");
          navigate("/");
          return;
        }

        if (res.status === "error") return alert(res.message);

        alert("Có lỗi xảy ra, vui lòng thử lại sau!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      Đây là header
      {localStorage.getItem("token") ? (
        <button onClick={handleLogout}>Đăng xuất</button>
      ) : (
        <button onClick={handleLogin}>Đăng nhập</button>
      )}
      {isLoading && <Loading />}
    </div>
  );
};

export default Header;
