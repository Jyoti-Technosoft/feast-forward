import React, { useState } from "react";
import { Form, Button, Modal, InputGroup, FormControl } from "react-bootstrap";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";

import CustomToast from "./ReusableComponents/CustomToast";
import DialogBox from "./ReusableComponents/DialogBox";
import { resetPassword } from "../Services/AuthenticationServices";
import { errorMessage } from "../Services/axiosinstance";
import "../assets/styles/ResetPassword.css";

const ResetPassword = (props) => {
  const { show, setShowDialog } = props;
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState({ type: "", message: "" });

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const resetForm = () => {
    setFormData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setErrors({});
    setShowDialog(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let tempErrors = {};
    const { oldPassword, newPassword, confirmPassword } = formData;

    if (oldPassword === "") {
      tempErrors.oldPassword = "Old Password is required.";
    }

    if (!validatePassword(newPassword)) {
      tempErrors.newPassword = "Password must be at least 6 characters long.";
    }

    if (newPassword === "") {
      tempErrors.newPassword = "New Password is required.";
    } else if (!validatePassword(newPassword)) {
      tempErrors.newPassword = "Password must be at least 6 characters long.";
    }

    if (newPassword !== confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(tempErrors).length === 0) {
      try {
        const response = await resetPassword(
          JSON.stringify({ oldPassword, newPassword })
        );
        if (response.status === 200) {
          setMessage({ type: "success", message: response.data.message });
          const userWithNewPassword = {
            ...user,
            password: newPassword
          };
          localStorage.setItem("user", JSON.stringify(userWithNewPassword));
          resetForm();
        } else if (response.status === 201) {
          setMessage({ type: "warning", message: response.data.message });
        }
      } catch (error) {
        setMessage({ type: "warning", message: errorMessage });
      }
    } else {
      setErrors(tempErrors);
    }
  };

  const renderChildren = () => {
    return (
      <>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body className="change-passowrd-content">
          <Form className="transparent-box-1">
            <Form.Group
              controlId="formBasicOldPassword"
              className="mb-3 password-div"
            >
              <InputGroup>
                <FormControl
                  type={showPassword ? "text" : "password"}
                  placeholder="Old Password"
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  isInvalid={!!errors.oldPassword}
                />
                <InputGroup.Text
                  className="viewer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaRegEyeSlash /> : <IoEyeOutline />}
                </InputGroup.Text>
              </InputGroup>
              <Form.Control.Feedback type="invalid">
                {errors.oldPassword}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              controlId="formBasicPassword"
              className="mb-3 password-div"
            >
              <InputGroup>
                <FormControl
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  isInvalid={!!errors.newPassword}
                />
                <InputGroup.Text
                  className="viewer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaRegEyeSlash /> : <IoEyeOutline />}
                </InputGroup.Text>
              </InputGroup>
              <Form.Control.Feedback type="invalid">
                {errors.newPassword}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              controlId="formBasicConfirmPassword"
              className="mb-3 password-div"
            >
              <InputGroup>
                <FormControl
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  isInvalid={!!errors.confirmPassword}
                />
                <InputGroup.Text
                  className="viewer"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <FaRegEyeSlash /> : <IoEyeOutline />}
                </InputGroup.Text>
              </InputGroup>
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="small-button"
            variant="secondary"
            type="button"
            onClick={() => resetForm()}
          >
            Cancel
          </Button>
          <Button
            className="small-button"
            variant="primary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Modal.Footer>
      </>
    );
  };

  return (
    <>
      <DialogBox
        show={show}
        onHide={() => resetForm()}
        renderChildren={renderChildren}
        className="custom-modal"
      />
      {message !== "" ? <CustomToast message={message} /> : null}
    </>
  );
};

export default ResetPassword;
