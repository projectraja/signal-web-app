import { Images } from "../constant/Images";

const NotFound: React.FC = () => {
    return <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
        <img src={Images.NotFound} alt="not-found" height={320} />
    </div>
}

export default NotFound;
