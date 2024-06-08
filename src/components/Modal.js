import React from 'react';
import ReactDOM from 'react-dom';

const ModalOverlay = (props) => {
    return (
        <div>
            {props.children}
            <button onClick={props.onClick}>Close</button>
        </div>
    );
};

const Modal = (props) => {
    const portalElement = document.getElementById('modal-root');
    return (
        <>
            {ReactDOM.createPortal(
                <ModalOverlay onClick={props.onClick}>
                    {props.children}
                </ModalOverlay>,
                portalElement
            )}
        </>
    );
};

export default Modal;
