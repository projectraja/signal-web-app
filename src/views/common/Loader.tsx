import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StationHelper from "../../helpers/StationHelper";
import useLogout from "../../hooks/useLogout";
import RootStore from "../../mobx-store/RootStore";

interface ILoaderProps {
    visibility: boolean
}

const Loader: React.FC<ILoaderProps> = (props) => {
    let { authStore } = RootStore;
    let navigate = useNavigate();

    useEffect(() => {
        console.log("authStore?.roleName",authStore?.roleName)
        if (authStore?.isLoggedIn && authStore?.roleName === 'SUPER ADMIN') {
            navigate('/station');
        } else if (authStore?.isLoggedIn) {
            GetStationDetailsByUserId();
        } else {
            navigate('/login');
        }
    }, []);

    const GetStationDetailsByUserId = async () => {
        await StationHelper(navigate).GetStationDetailsByUserId();
    }

    return <>
        {props?.visibility &&
            <div className='d-flex loader-frame'>
                <div className='loading-spinner' />
            </div>
        }
    </>
}

export default Loader;
