import { Modal } from 'antd';
import React from 'react';

const ModalComponent = ({ title = 'Modal', open = false, children, className, ...rests }) => {
    return (
        <Modal title={title} visible={open} className={className} {...rests}>
            {children}
        </Modal>
    );
};

export default ModalComponent;
