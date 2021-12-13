import { useState, useEffect } from "react";
import axios from "axios";
import LoadingToRedirect from "../LoadingToRedirect";
import { Route } from "react-router-dom";

const InstructorRoute = ({ children, ...rest }) => {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    isValidInstructor();
  }, []);
  const isValidInstructor = async () => {
    try {
      const { data } = await axios.get("/api/user/isInstructor");
      if (data.success === true) setOk(true);
    } catch (error) {
      console.log(error);
      setOk(false);
    }
  };
  return <>{!ok ? <LoadingToRedirect /> : <Route {...rest} />}</>;
};

export default InstructorRoute;
