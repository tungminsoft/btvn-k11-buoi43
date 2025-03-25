import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import config from "../../config";
import useQuery from "../../hooks/useQuery";
import Loading from "../Loading";

const ProtectedRoute = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    if (token === "") return setIsLoading(false);

    fetch("https://api01.f8team.dev/api/auth/me", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") return setCurrentUser(res.user);

        localStorage.removeItem("token");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <Loading />;

  if (!currentUser) {
    return (
      <Navigate
        to={`${config.routes.login}?continue=${encodeURIComponent(
          location.pathname
        )}`}
      />
    );
  }

  return children;
};

export default ProtectedRoute;
