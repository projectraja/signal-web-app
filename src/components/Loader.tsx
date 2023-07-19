interface ILoaderProps {
    visibility: boolean
}

const Loader: React.FC<ILoaderProps> = (props) => {
    return <>
        {props?.visibility &&
            <div style={{ backgroundColor: '#00000021' }} className='d-flex loader-frame'>
                <div className='loading-spinner' />
            </div>
        }
    </>
}

export default Loader;
