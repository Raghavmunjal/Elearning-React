import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { Context } from "../../context/index";

const UserNav = () => {
  const [current, setCurrent] = useState("/user");

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
    //eslint-disable-next-line
  }, [process.browser, window.location]);

  const {
    state: { user },
  } = useContext(Context);

  return (
    <div className="nav flex-column nav-pills mt-2">
      <Link
        to="/user"
        className={`nav-link ${current === "/user" && "active"}`}
      >
        <i className="fas fa-user-circle p-2"></i>Dashboard
      </Link>
      {user && user.role && !user.role.includes("Instructor") && (
        <Link
          to="/user/become-instructor"
          className={`nav-link ${
            current === "/user/become-instructor" && "active"
          }`}
        >
          <i className="fas fa-users-cog p-2"></i>Become an Instructor
        </Link>
      )}
    </div>
  );
};

export default UserNav;
