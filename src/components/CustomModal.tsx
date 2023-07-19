import { Modal } from "antd";

interface ICustomModalProps {
    children?: any
    isOpen: boolean
    title: string
}

const CustomModal: React.FC<ICustomModalProps> = (props) => {
    return <Modal title={props?.title} open={props?.isOpen} footer={null} closable={false} keyboard={false}
        bodyStyle={{ overflowY: 'scroll' }}>
        {props?.children}
    </Modal>
}

export default CustomModal;
