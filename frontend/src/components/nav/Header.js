import { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context/index";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const Header = () => {
  const { state, dispatch } = useContext(Context);
  const { user } = state;
  const history = useHistory();

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get("/api/user/logout");
    toast.success(data.message);
    history.push("/");
  };

  return (
    <header id="header" className="fixed-top">
      <div className="container">
        <nav
          id="navbar"
          className="navbar navbar-expand-lg order-last order-lg-0"
        >
          <h2 className="logo navbar-brand">
            <Link to="/">Kakshaa</Link>
          </h2>
          <button
            className="navbar-toggler navbar-light bg-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {user === null && (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              )}
              {user === null && (
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              )}
              {user !== null && user.role && user.role.includes("Instructor") && (
                <li className="nav-item">
                  <Link className="nav-link" to="/instructor">
                    Instructor
                  </Link>
                </li>
              )}
              {user !== null && (
                <li className="nav-item">
                  <Link className="nav-link" to="/user">
                    Dashboard
                  </Link>
                </li>
              )}
              {user !== null && (
                <li className="nav-item" onClick={logout}>
                  <Link className="nav-link" to="/">
                    Logout
                  </Link>
                </li>
              )}
            </ul>
            {/* <form className="d-flex">
              <button className="get-started-btn">Get Started</button>
            </form> */}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
