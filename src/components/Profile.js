import React, { useRef, useState } from "react";
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
// import { FaUser } from "react-icons/fa";

import DialogBox from "./ReusableComponents/DialogBox";
import { RoleData, GetInitialsName } from "./ReusableComponents/UtilityFunctions";
import CustomToast from "./ReusableComponents/CustomToast";
import { updateProfile } from "../Services/AuthenticationServices";
import { errorMessage } from "../Services/axiosinstance";
import "../assets/styles/Profile.css";

const Profile = (props) => {
    const { show, setShowDialog } = props;
    const user = JSON.parse(localStorage.getItem("user"));
    const fileInputRef = useRef(null);

    const [message, setMessage] = useState({ type: "", message: "" });
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        id: user?._id ?? "",
        email: user?.email ?? "",
        password: user?.password ?? "",
        fullName: user?.fullName ?? "",
        role: user?.role ?? "",
        contactNo: user?.contactNo ?? "",
        address: user?.address ?? "",
        city: user?.city ?? "",
        image: user?.image ?? ""
    });

    // const handleDivClick = () => {
    //     fileInputRef.current.click();
    // };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
        setErrors({ ...errors, [name]: "" });
    }

    const resetForm = (userData) => {
        const data = userData ? userData : user
        setFormData({
            id: data?._id ?? "",
            email: data?.email ?? "",
            password: data?.password ?? "",
            fullName: data?.fullName ?? "",
            role: data?.role ?? "",
            contactNo: data?.contactNo ?? "",
            address: data?.address ?? "",
            city: data?.city ?? "",
            image: data?.image ?? ""
        })
        setShowDialog(false);
    }

    const validateForm = () => {
        let isValid = true;
        let newErrors = {};
        if (!formData.fullName) {
            newErrors.fullName = "Full name is required";
            isValid = false;
        }

        if (!formData.email) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            newErrors.email = "Invalid email address";
            isValid = false;
        }

        if (!formData.contactNo) {
            newErrors.contactNo = "Contact number is required";
            isValid = false;
        } else if (!/^[6-9]\d{9}$/.test(formData.contactNo)) {
            newErrors.contactNo =
                "Invalid contact number. Must be 10 digits starting with 6-9";
            isValid = false;
        }

        if (!formData.city) {
            newErrors.city = "City is required";
            isValid = false;
        }

        if (!formData.role) {
            newErrors.role = "Role is required";
            isValid = false;
        }

        if (!formData.address) {
            newErrors.address = "Address is required";
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await updateProfile(JSON.stringify(formData));
                if (response.status === 200) {
                    setMessage({ type: "success", message: response.data.message });
                    localStorage.setItem("user", JSON.stringify(response?.data?.user));
                    resetForm(response?.data?.user);
                } else if (response.status === 201) {
                    setMessage({ type: "warning", message: response.data.message });
                }
            } catch (error) {
                setMessage({ type: "warning", message: errorMessage });
            }
        }
    }

    const renderChildren = () => {
        return (
            <>
                <Modal.Header closeButton>
                    <Modal.Title>{'Edit Profile'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row
                            className="d-flex justify-content-center align-items-center"
                        >
                            <Col md={12} sm={12}>
                                <Form.Group controlId="image" className="profile-form">
                                    {/* <div onClick={handleDivClick} className="upload-file">
                                        {getInitials(formData?.fullName)}
                                    </div> */}
                                    <div className="user-Logo">
                                        <div
                                            style={{
                                                position: "relative",
                                                display: "inline-block",
                                            }}
                                        >
                                            <GetInitialsName className="upload-file" name={formData?.fullName} />
                                            {/* <div className="userName-icon">
                                            <FaUser/>
                                            </div> */}
                                        </div>
                                    </div>
                                    <Form.Control
                                        type="file"
                                        filename={formData?.image}
                                        accept=".zip,.png,.jpg,.jpeg,.pdf"
                                        onChange={handleChange}
                                        name="image"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} sm={12}>
                                <Form.Group controlId="fullName" className="profile-form me-md-3">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Full Name"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        name="fullName"
                                        isInvalid={!!errors.fullName}
                                    />
                                    <Form.Control.Feedback type="invalid" style={{ marginBottom: "5px" }}>
                                        {errors?.fullName}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6} sm={12}>
                                <Form.Group controlId="role" className="profile-form">
                                    <Form.Label>Role</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="role"
                                        value={formData?.role}
                                        onChange={handleChange}
                                        isInvalid={!!errors.role}
                                    >
                                        <option value="">Select a role</option>
                                        {RoleData?.map((role) => (
                                            <option key={role?.id} value={role?.value}>
                                                {role?.name}
                                            </option>
                                        ))}
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid" style={{ marginBottom: "5px" }}>
                                        {errors?.role}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} sm={12}>
                                <Form.Group controlId="email" className="profile-form me-md-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        name="email"
                                        isInvalid={!!errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid" style={{ marginBottom: "5px" }}>
                                        {errors?.email}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6} sm={12}>
                                <Form.Group controlId="password" className="profile-form">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        disabled
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} sm={12}>
                                <Form.Group controlId="contactNo" className="profile-form me-md-3">
                                    <Form.Label>Contact No</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Contact No"
                                        value={formData.contactNo}
                                        onChange={handleChange}
                                        name="contactNo"
                                        isInvalid={!!errors.contactNo}
                                    />
                                    <Form.Control.Feedback type="invalid" style={{ marginBottom: "5px" }}>
                                        {errors?.contactNo}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6} sm={12}>
                                <Form.Group controlId="address" className="profile-form">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        name="address"
                                        isInvalid={!!errors.address}
                                    />
                                    <Form.Control.Feedback type="invalid" style={{ marginBottom: "5px" }}>
                                        {errors?.address}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} sm={12}>
                                <Form.Group controlId="city" className="profile-form me-md-3">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter City"
                                        value={formData.city}
                                        onChange={handleChange}
                                        name="city"
                                        isInvalid={!!errors.city}
                                    />
                                    <Form.Control.Feedback type="invalid" style={{ marginBottom: "5px" }}>
                                        {errors?.city}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        className="small-button"
                        variant="secondary"
                        type="button"
                        onClick={() => resetForm(user)}
                    >
                        Cancel
                    </Button>
                    <Button className="small-button" variant="primary" onClick={handleSubmit}>
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
                onHide={() => resetForm(user)}
                renderChildren={renderChildren}
            />
            {message ? <CustomToast message={message} /> : null}
        </>

    );
};

export default Profile;
