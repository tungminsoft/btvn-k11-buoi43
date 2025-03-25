import { useEffect, useState } from "react";
import Loading from "../../components/Loading";

const Users = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://api01.f8team.dev/api/users", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setUsers(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Danh sách Users</h2>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.lastName} {user.firstName}
          </li>
        ))}
      </ul>

      {isLoading && <Loading />}
    </div>
  );
};

export default Users;
