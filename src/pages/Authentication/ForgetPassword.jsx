import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import DefaultLayout from "../../layout/DefaultLayout";
import { resetPassword, sendOtp } from "./resetPassword.action";
import { Modal, Button, Form } from "react-bootstrap";

const ForgetPassword = (props) => {
  // sent otp request
  // input new otp
  const { data, resetData } = props;
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  const [resetError, setResetError] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    setOtp("");
  }, []);

  const navigate = useNavigate();
  const closeWindow = () => {
    if (resetData.status === "200") {
      navigate("/");
    }
    setShowMessage(false);
  };

  useEffect(() => {
    console.log("datas", data);
    if (data.data?.split(":").length > 0) {
      setOtp(data.data?.split(":")[1]);
      console.log("datas", data.data?.split(":")[1]);
    }
  }, [data]);

  useEffect(() => {
    if (resetData?.status) {
      setShowMessage(true);
    }
  }, [resetData]);

  const handleSendOtp = async (event) => {
    event.preventDefault();
    setIsResetting(true);
    setResetError(null); // Clear any previous errors

    await props.sendOtp({ email });
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    setIsResetting(true);
    setResetError(null); // Clear any previous errors
    let form = {
      email,
      otp,
      newPassword,
      confirmNewPassword: newPassword,
    };
    await props.resetPassword(form);
  };

  return (
    <DefaultLayout>
      <MessageWindows
        show={showMessage}
        handleClose={closeWindow}
        message={resetData.message}
        status={resetData.status}
      />
      {/* <FormErrorWindows
        show={errorNotif}
        handleClose={() => setErrorNotif(false)}
        message={errors}
      /> */}
      {console.log("ee", otp)}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-10">
        <div className=" py-4 px-6 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Request Reset Password
          </h3>
        </div>
        <div>
          {otp === "" && (
            <div className="p-6.5">
              <div className="mb-5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <button
                onClick={handleSendOtp}
                className="flex w-full justify-center rounded bg-blue-500 p-3 font-medium text-white hover:bg-opacity-90"
              >
                Request Otp
              </button>
            </div>
          )}
          {otp !== "" && (
            <div className="p-6.5">
              <div className="mb-5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-5">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter your OTP"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-5">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter your new password"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <button
                onClick={handleResetPassword}
                className="flex w-full justify-center rounded bg-blue-500 p-3 font-medium text-white hover:bg-opacity-90"
              >
                Reset Password
              </button>
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

const MessageWindows = ({ show, handleClose, message, status }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Message</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {status === "200" ? (
          <p>Reset password is success, redirecting to login in a second...</p>
        ) : (
          <p>{message}</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const FormErrorWindows = ({ show, handleClose, message }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Notification</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul>
          {Object.keys(message).map((field) => (
            <li key={field}>{message[field]}</li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapDispatchToProps = {
  sendOtp: sendOtp,
  resetPassword: resetPassword,
};

const ForgetPasswordComponent = connect((state) => {
  return {
    data: state.resetPassword.data,
    resetData: state.resetPassword.resetData,
  };
}, mapDispatchToProps)(ForgetPassword);

const App = (props) => {
  return <ForgetPasswordComponent />;
};

export default App;
