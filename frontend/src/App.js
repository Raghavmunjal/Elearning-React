import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
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

const App = () => {
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
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
