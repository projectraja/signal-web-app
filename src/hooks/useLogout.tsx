import { useNavigate } from "react-router-dom";
import RootStore from "../mobx-store/RootStore";
import AppStorage from "../storage/AppStorage";

const useLogout = () => {
    const navigate = useNavigate();
    const { authStore, stationStore } = RootStore;

    return () => {
        authStore.resetData();
        stationStore.resetData();
        AppStorage.clearStorage();
        navigate('/login', { replace: true });
    }
}

export default useLogout;
