import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const InstructorNav = () => {
  const [current, setCurrent] = useState("/instructor");

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
    //eslint-disable-next-line
  }, [process.browser, window.location]);

  return (
    <div className="nav flex-column nav-pills mt-2">
      <Link
        to="/instructor"
        className={`nav-link ${current === "/instructor" && "active"}`}
      >
        <i className="fas fa-user-circle p-2"></i>Dashboard
      </Link>
      <Link
        to="/instructor/course/create"
        className={`nav-link ${
          current === "/instructor/course/create" && "active"
        }`}
      >
        <i className="fas fa-video p-2"></i>Create Course
      </Link>
    </div>
  );
};

export default InstructorNav;
