import React from 'react';
import { Modal } from 'react-bootstrap';

const DialogBox = ({ show, onHide, renderChildren }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            {renderChildren()}
        </Modal>
    );
};

export default DialogBox;
