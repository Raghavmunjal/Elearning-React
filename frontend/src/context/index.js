import { useReducer, createContext, useEffect } from "react";
import axios from "axios";

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
  const [state, dispatch] = useReducer(rootReducer, intialState);
  useEffect(() => {
    dispatch({
      type: "LOGIN",
      payload: JSON.parse(window.localStorage.getItem("user")),
    });
  }, []);

  useEffect(() => {
    getCsrfToken();
  }, []);

  const getCsrfToken = async () => {
    const { data } = await axios.get("/api/csrf-token");
    axios.defaults.headers["X-CSRF-Token"] = data.csrfToken;
  };

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
