import { useReducer, createContext, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

// intial State
const intialState = {
  user: null,
};

// create Context
export const Context = createContext();

// root reducer update the state
const rootReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

export const Provider = ({ children }) => {
  const history = useHistory();

  const [state, dispatch] = useReducer(rootReducer, intialState);
  useEffect(() => {
    dispatch({
      type: "LOGIN",
      payload: JSON.parse(window.localStorage.getItem("user")),
    });
  }, []);

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

  // useEffect(() => {
  //   getCsrfToken();
  // }, []);

  // const getCsrfToken = async () => {
  //   const { data } = await axios.get("/api/csrf-token");
  //   axios.defaults.headers["X-CSRF-Token"] = data.csrfToken;
  // };

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
