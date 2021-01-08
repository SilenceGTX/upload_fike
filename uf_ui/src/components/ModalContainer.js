import React, { useState } from 'react';
import { Modal, Button } from 'antd';

export default function ModalContainer(props) {
    const [visible, setVisible] = useState(false); //是否显示模态框
    
    const showModal = () => {
        setVisible(true); //显示
    };

    const handleCancel = () => {
        setVisible(false); //隐藏
    };

    return (
        <>
            <Button
            type={props.buttonType} 
            icon={props.icon} 
            onClick={showModal}>
                {props.title}
            </Button>

            <Modal
            title={props.title}
            visible={visible}
            footer={null}
            onCancel={handleCancel}
            {...props}
            >
                {React.cloneElement(props.content, 
                    { handleCancel: handleCancel })}
            </Modal>
        </>
    )
}