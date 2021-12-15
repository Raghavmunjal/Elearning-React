import React, { lazy, Suspense, useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Context } from "./context/index";
import Header from "./components/nav/Header";
import UserRoute from "./components/protectedRoutes/UserRoute";
import InstructorRoute from "./components/protectedRoutes/InstructorRoute";

const HomeScreen = lazy(() => import("./Screens/HomeScreen"));
const LoginScreen = lazy(() => import("./Screens/auth/LoginScreen"));
const RegisterScreen = lazy(() => import("./Screens/auth/RegisterScreen"));
const ForgotPasswordScreen = lazy(() =>
  import("./Screens/auth/ForgotPasswordScreen")
);
const UserDashboardScreen = lazy(() =>
  import("./Screens/user/UserDashboardScreen")
);
const BecomeInstructorScreen = lazy(() =>
  import("./Screens/user/BecomeInstructorScreen.js")
);
const InstructorDashboardScreen = lazy(() =>
  import("./Screens/instructor/InstructorDashboardScreen.js")
);
const CreateCourseScreen = lazy(() =>
  import("./Screens/instructor/course/CreateCourseScreen.js")
);
const CallbackScreen = lazy(() => import("./Screens/stripe/CallbackScreen.js"));

const App = () => {
  const { dispatch } = useContext(Context);
  const history = useHistory();
  axios.interceptors.response.use(
    function (response) {
      // any status code that lie within range of 2XX  cause this function to trigger
      return response;
    },
    function (error) {
      // any status code that falls outside within range of 2XX  cause this function to trigger
      let res = error.response;
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        return new Promise((resolve, reject) => {
          axios
            .get("/api/user/logout")
            .then((data) => {
              console.log("401 error > logout");
              dispatch({ type: "LOGOUT" });
              window.localStorage.removeItem("user");
              history.push("/login");
            })
            .catch((err) => {
              console.log("AXIOS INTERCEPTORS ERR", err);
              reject(err);
            });
        });
      }
      return Promise.reject(error);
    }
  );

  return (
    <Router>
      <Suspense
        fallback={
          <div className="col text-center p-5 display-4">
            __Kak <LoadingOutlined /> shaa__
          </div>
        }
      >
        <Header />
        <ToastContainer position="top-center" />
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/register" component={RegisterScreen} />
          <Route
            exact
            path="/forgot-password"
            component={ForgotPasswordScreen}
          />
          <UserRoute exact path="/user" component={UserDashboardScreen} />
          <UserRoute
            exact
            path="/user/become-instructor"
            component={BecomeInstructorScreen}
          />
          <InstructorRoute
            exact
            path="/instructor"
            component={InstructorDashboardScreen}
          />
          <InstructorRoute
            exact
            path="/instructor/course/create"
            component={CreateCourseScreen}
          />
          <UserRoute exact path="/stripe/callback" component={CallbackScreen} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
