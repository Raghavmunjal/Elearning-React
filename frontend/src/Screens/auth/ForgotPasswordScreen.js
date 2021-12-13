import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../../context/index";
import { useHistory } from "react-router-dom";
import { SyncOutlined } from "@ant-design/icons";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    state: { user },
  } = useContext(Context);

  const history = useHistory();

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    if (user !== null) history.push("/user");
  }, [user, history]);

  const checkEmail = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        "/api/auth/verify-email",
        { email },
        config
      );
      setLoading(false);
      if (data.success === true) setSuccess(true);
      toast.success(`Otp Sent on ${email}`);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data);
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        "/api/auth/forget-password",
        { email, otp, newPassword },
        config
      );
      setLoading(false);
      if (data.success === true) {
        toast.success(`Password Reset Successfully`);
        history.push("/login");
        setEmail("");
        setOtp("");
        setSuccess(false);
        setNewPassword("");
      } else toast.error("Reset Failed");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data);
    }
  };

  return (
    <form
      className="container gap mt-5"
      onSubmit={success ? resetPassword : checkEmail}
    >
      <div className="mb-3 col-md-4 offset-md-4">
        <label htmlFor="email" className="form-label text-muted">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          disabled={success}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
      </div>
      {success && (
        <>
          <div className="mb-3 col-md-4 offset-md-4">
            <label htmlFor="Otp" className="form-label text-muted">
              Otp
            </label>
            <input
              type="text"
              className="form-control"
              id="Otp"
              value={otp}
              required
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>

          <div className="mb-3 col-md-4 offset-md-4">
            <label htmlFor="password" className="form-label text-muted">
              New Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={newPassword}
              required
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </>
      )}
      <div className="mb-3 col-md-4 offset-md-4 mt-2">
        <button
          className="btn btn-submit"
          type="submit"
          onClick={success ? resetPassword : checkEmail}
          disabled={!email || loading}
        >
          {loading ? (
            <span>
              <SyncOutlined spin /> Loading
            </span>
          ) : success ? (
            "Reset Password"
          ) : (
            "Send Otp"
          )}
        </button>
      </div>
    </form>
  );
};

export default ForgotPasswordScreen;
