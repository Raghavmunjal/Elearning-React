import { useEffect, useContext } from "react";
import { Context } from "../../context/index";
import axios from "axios";
import { SyncOutlined } from "@ant-design/icons";

const CallbackScreen = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(Context);
  useEffect(() => {
    if (user) {
      axios.post("/api/role/get-account-status").then((res) => {
        dispatch({ type: "LOGIN", payload: res.data });
        window.localStorage.setItem("user", JSON.stringify(res.data));
        window.location.href = "/instructor";
      });
    }
  }, [user, dispatch]);
  return (
    <>
      <SyncOutlined
        spin
        className="d-flex justify-content-center display-1 p-5 m-5 gap"
      />
    </>
  );
};

export default CallbackScreen;
