import { useContext } from "react";
import { Context } from "../../context/index";
import UserNav from "../../components/nav/UserNav";

const UserDashboardScreen = () => {
  const { state } = useContext(Context);
  const { user } = state;

  return (
    <>
      <div className="container-fluid gap">
        <div className="row">
          <div className="col-md-2 text-center">
            <UserNav />
          </div>
          <div className="col-md-10">Hey {user?.name}</div>
        </div>
      </div>
    </>
  );
};

export default UserDashboardScreen;
