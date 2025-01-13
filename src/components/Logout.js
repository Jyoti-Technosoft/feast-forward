import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';
import { MdLogout } from "react-icons/md";

import DialogBox from "./ReusableComponents/DialogBox";
import CustomToast from "./ReusableComponents/CustomToast";
import { upsertLogout } from "../Services/AuthenticationServices";
import "../assets/styles/Logout.css";

const Logout = (props) => {
    const { show, setShowDialog } = props;
    const navigate = useNavigate();
    const [message, setMessage] = useState({ type: "", message: "" });

    const user = JSON.parse(localStorage.getItem("user"));

    const resetForm = () => {
        setShowDialog(false);
    }

    const handleLogout = async () => {
        if (user?.email) {
            try {
                const response = await upsertLogout(user?.email);
                if (response?.status === 200) {
                    setMessage({ type: "success", message: response?.data?.message });
                    setTimeout(() => {
                        window.localStorage.clear();
                        navigate("/");
                        window.location.reload();
                    }, 2000);
                }
            } catch (error) {
                console.error("error", error);
            }
        }
    };

    const renderChildren = () => {
        return (
            <>
                <Modal.Header className="logout-header" closeButton>
                    <Modal.Title>
                        <div className="logout-icon">
                            <MdLogout />
                        </div>
                    </Modal.Title>
                    <Modal.Title className="logout-title">{'Confirm Logout'}</Modal.Title>
                </Modal.Header >
                <Modal.Body className="logout-content">
                    Are you sure you want to log out?
                </Modal.Body>
                <Modal.Footer className="logout-footer">
                    <Button
                        className="small-buttons"
                        variant="secondary"
                        type="button"
                        onClick={() => resetForm()}
                    >
                        Cancel
                    </Button>
                    <Button className="small-buttons" variant="primary" onClick={handleLogout}>
                        Log Out
                    </Button>
                </Modal.Footer>
            </>
        );
    };
    return (<>
        <DialogBox
            show={show}
            onHide={() => resetForm()}
            renderChildren={renderChildren}
        />
        {message !== "" ? <CustomToast message={message} /> : null}
    </>)
}

export default Logout