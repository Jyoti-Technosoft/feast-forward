import React, { useEffect, useState } from "react";
import { Toast, ToastBody, ToastContainer } from "react-bootstrap";

function CustomToast({ message }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (message?.message) {
      const timer = setTimeout(() => setShow(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!message?.message || !show) return null;
  return (
    <ToastContainer
      position="top-center"
      className="p-4"
      autohide
      delay={2000}
      onClose={() => setShow(false)}
    >
      <Toast className={`toaster-alert ${message?.type}`}>
        <ToastBody>{message?.message}</ToastBody>
      </Toast>
    </ToastContainer>
  );
}

export default CustomToast;
