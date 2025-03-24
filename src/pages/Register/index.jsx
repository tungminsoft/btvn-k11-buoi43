import { useState } from "react";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [user, setUser] = useState({});

  const setFieldValue = (e) => {
    setErrors({});
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const arrName = user.fullName
      .split(" ")
      .map((item) => item.trim())
      .filter((item) => item);
    if (arrName.length < 2)
      return setErrors({ fullName: "Vui lòng nhập tên đầy đủ" });
    const firstName = arrName.pop();
    const lastName = arrName.join(" ");

    if (user.password_confirmation !== user.password)
      return setErrors({ password_confirmation: "Mật khẩu không trùng khớp" });

    setIsLoading(true);

    const data = {
      ...user,
      firstName: firstName,
      lastName: lastName,
    };

    fetch("https://api01.f8team.dev/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          localStorage.setItem("token", res.access_token);
          navigate("/");
          return;
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
      <h2>Đăng ký tài khoản</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Họ tên:
            <input
              type="text"
              name="fullName"
              value={user.fullName}
              onChange={setFieldValue}
              required
            />
            {errors.fullName && (
              <span style={{ color: "red" }}> {errors.fullName}</span>
            )}
          </label>
        </div>

        <div>
          <label>
            Email:
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
            Mật khẩu:
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

        <div>
          <label>
            Nhập lại mật khẩu:
            <input
              type="password"
              name="password_confirmation"
              value={user.password_confirmation}
              onChange={setFieldValue}
              required
            />
            {errors.password_confirmation && (
              <span style={{ color: "red" }}>
                {" "}
                {errors.password_confirmation}
              </span>
            )}
          </label>
        </div>

        <button type="submit">Đăng ký</button>
        {errors.other && <div style={{ color: "red" }}>{errors.other}</div>}
      </form>

      {isLoading && <Loading />}
    </div>
  );
};

export default Register;
