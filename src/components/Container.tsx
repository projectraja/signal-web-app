import { Row, Col, Card, Button } from 'antd';
import Theme from '../utils/Function-Util';

interface IContainerProps {
    title?: string
    isRightBtn?: boolean
    rigthBtn?: any
    onRightClick?: any
    children?: React.ReactNode
}

const Container: React.FC<IContainerProps> = (props) => {
    const { title, isRightBtn, rigthBtn, onRightClick, children } = props;
    // const { COLORS } = Theme.getTheme();

    return <Row>
        <Col span='24'>
            <Card title={title} size='small' style={{ borderRadius: '6px' }}
                headStyle={{ paddingLeft: '15px', paddingRight: '15px', backgroundColor: '#fafafa' }}
                extra={isRightBtn === true ? <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button type="link" style={{ padding: '0px' }} onClick={onRightClick}>
                        {rigthBtn}
                    </Button></div> : null}
            >
                {children}
            </Card>
        </Col>
    </Row>
}

export default Container;