import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Result } from "antd";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  const history = useHistory();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((current_count) => --current_count);
    }, 1000);

    // redirect once count is equal to 0
    count === 0 && history.push("/");

    return () => clearInterval(interval);
  }, [count, history]);
  return (
    <div className="container p-5 text-center">
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <h6 className="text-warning">Redirecting you in {count} seconds</h6>
        }
      />
    </div>
  );
};

export default LoadingToRedirect;
