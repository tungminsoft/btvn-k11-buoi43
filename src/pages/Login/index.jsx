import { useState } from "react";
import Loading from "../../components/Loading";
import useQuery from "../../hooks/useQuery";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({});

  const query = useQuery();
  const navigate = useNavigate();

  const setFieldValue = (e) => {
    setErrors({});
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);
    fetch("https://api01.f8team.dev/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          localStorage.setItem("token", res.access_token);
          return navigate(query.get("continue") || "/");
        }

        if (res.status === "error") return setErrors({ other: res.message });

        setErrors({ other: "Có lỗi xảy ra, vui lòng thử lại sau!" });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      <h2>Đăng nhập</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Email:{" "}
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={setFieldValue}
              required
            />
            {errors.email && (
              <span style={{ color: "red" }}> {errors.email}</span>
            )}
          </label>
        </div>

        <div>
          <label>
            Password:{" "}
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={setFieldValue}
              required
            />
            {errors.password && (
              <span style={{ color: "red" }}> {errors.password}</span>
            )}
          </label>
        </div>

        <button type="submit">Đăng nhập</button>
        {errors.other && <div style={{ color: "red" }}> {errors.other}</div>}
      </form>

      {isLoading && <Loading />}
    </div>
  );
};

export default Login;
