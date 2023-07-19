import Theme from '../utils/Function-Util';

interface IFormGroupProps {
    children: any
    label?: any
    labelComponent?: any
    subLabel?: any
    isRequired?: boolean
    error?: string
    isResponsive?: boolean
    imagePath?: string
    labelSpacing?: string
    labelColor?: string
}

const { COLORS } = Theme.getTheme();

const FormGroup: React.FC<IFormGroupProps> = (props) => {
    return <div className={`form-group ${props?.isResponsive ? 'col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-3' : ''} ${props?.label ? 'mb-2' : 'mb-1'}`}>
        <span className={`d-flex ellipsis-line ${props?.labelSpacing ? props?.labelSpacing : 'mb-2'}`}
            style={{ justifyContent: 'space-between' }}>
            <div>
                <span className='fw-bold' style={{ fontSize: '13px', color: props.labelColor ? props.labelColor : '#635D5D' }}>
                    {props?.label}
                </span>
                {props?.label && props?.isRequired &&
                    <span className="ms-1" style={{ color: COLORS.error }}>*</span>
                }
                {props?.label && props?.imagePath && typeof props?.imagePath === 'string' &&
                    <span className="ms-1 ellipsis-line" style={{ color: COLORS.blue, fontSize: 'small' }}>{props.imagePath}</span>
                }
                {props?.subLabel &&
                    <div style={{ fontSize: '9px', color: '#635D5D' }}>{props?.subLabel}</div>
                }
            </div>
            {props?.labelComponent &&
                <div>{props?.labelComponent}</div>
            }
        </span>

        {props?.children}

        {props?.isRequired && props?.error &&
            <small className="validation-message" style={{ color: COLORS.error, fontSize: '11px' }}>{props?.error}</small>
        }
    </div>
}

export default FormGroup;
