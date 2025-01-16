import React from "react";
import { Modal } from "react-bootstrap";

const DialogBox = ({ show, onHide, renderChildren, className }) => {
  return (
    <Modal show={show} onHide={onHide} centered className={className}>
      {renderChildren()}
    </Modal>
  );
};

export default DialogBox;
