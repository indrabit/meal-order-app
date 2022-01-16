import React, { Fragment } from 'react';
import classes from './Modal.module.css';
import ReactDOM from 'react-dom';
import { Scrollbars } from 'react-custom-scrollbars-2';
const Backdrop=props=>{
    return <div className={classes.backdrop} onClose={props.onClose}></div>
};
const ModalOverlay=props=>{
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
};
const portalElement=document.getElementById('overlays');
const Modal = (props) => {
    return (
        <Fragment>
            {ReactDOM.createPortal (<Backdrop/>,portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>
                {props.children} </ModalOverlay>, portalElement)}
        </Fragment>
    )
};

export default Modal;