import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Context } from "../../context/index";
import { useHistory } from "react-router-dom";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otpfromBackend, setOtpfromBackend] = useState("");
  const [otp, setOtp] = useState("");
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { state } = useContext(Context);
  const { user } = state;

  const history = useHistory();

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    if (user !== null) history.push("/");
  }, [user, history]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!name || !password || !otp) {
        toast.error("Enter all fields");
        setLoading(false);
        return;
      }

      if (otp !== otpfromBackend) {
        toast.error("Invalid OTP");
        setLoading(false);
        return;
      }

      const { data } = await axios.post(
        "/api/user/register",
        { name, email, password },
        config
      );
      setLoading(false);
      if (data.success === true) {
        toast.success("Registered Successfully Now you can login");
        setEmail("");
        setPassword("");
        setOtp("");
        setName("");
        history.push("/login");
      } else {
        toast.error("Registeration Failed");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data);
    }
  };

  const checkEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "/api/user/send-otp",
        { email },
        config
      );
      setLoading(false);
      setOtpfromBackend(data);
      setSuccess(true);
      toast.success(`OTP sent on ${email}`);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data);
    }
  };

  return (
    <>
      <form
        className="container gap mt-5"
        onSubmit={success ? handleRegister : checkEmail}
      >
        <div className="mb-3 col-md-4 offset-md-4">
          <label htmlFor="email" className="form-label text-muted">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            autoFocus
            value={email}
            disabled={success}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {success && (
          <>
            <div className="mb-3 col-md-4 offset-md-4">
              <label htmlFor="otp" className="form-label text-muted">
                Otp
              </label>
              <input
                type="text"
                className="form-control"
                id="otp"
                value={otp}
                autoFocus
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>

            <div className="mb-3 col-md-4 offset-md-4">
              <label htmlFor="name" className="form-label text-muted">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-3 col-md-4 offset-md-4">
              <label htmlFor="password" className="form-label text-muted">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </>
        )}
        <div className="mb-3 col-md-4 offset-md-4 mt-2">
          <button
            className="btn btn-submit"
            type="submit"
            onClick={success ? handleRegister : checkEmail}
            disabled={!email || loading}
          >
            {loading ? (
              <span>
                <SyncOutlined spin /> Loading...
              </span>
            ) : success ? (
              "Register"
            ) : (
              "Send Otp"
            )}
          </button>
        </div>
        <h6 className="text-muted mb-3 col-md-4 offset-md-4 mt-2">
          Already have an account? <Link to="/login">Login</Link>
        </h6>
      </form>
    </>
  );
};
export default RegisterScreen;
