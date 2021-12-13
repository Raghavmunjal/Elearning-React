import { useContext, useState, useEffect } from "react";
import { Context } from "../../context/index";
import axios from "axios";
import { Button } from "antd";
import {
  SettingOutlined,
  SyncOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const BecomeInstructorScreen = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const {
    state: { user },
  } = useContext(Context);

  useEffect(() => {
    if (user && user.role && user.role.includes("Instructor"))
      history.push("/instructor");
  });

  const handleBecomeInstructor = () => {
    setLoading(true);

    axios
      .post("/api/role/make-instructor")
      .then((res) => {
        console.log(res);
        setLoading(false);
        window.location.href = res.data;
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error("Stripe Onboarding Failed,Try Again Later");
      });
  };

  return (
    <>
      <div className="container gap">
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center">
            <h3>Become an Instructor</h3>
            <div className="pt-4">
              <UserSwitchOutlined className="display-2 mb-5" />
              <br />
              <h3 className="mb-4">
                Setup Payout to publish courses on Kakshaa
              </h3>
              <p className="lead text-warning mb-4">
                Kakshaa partners with stripe to transfer earnings to your bank
                account
              </p>
              <Button
                className="mb-3"
                type="primary"
                block
                shape="round"
                icon={loading ? <SyncOutlined spin /> : <SettingOutlined />}
                size="large"
                disabled={
                  (user && user.role && user.role.includes("Instructor")) ||
                  loading
                }
                onClick={handleBecomeInstructor}
              >
                {loading ? "Processing" : "Payout Setup"}
              </Button>
              <p className="lead mt-3">
                You will be redirected to stripe to complete onboarding process.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BecomeInstructorScreen;
