import { useNavigate } from "react-router-dom";
import RootStore from "../mobx-store/RootStore";
import AppStorage from "../storage/AppStorage";

const useLogout = () => {
    const navigate = useNavigate();
    const { authStore, stationStore, platformStore, flyoverStore, trainStore, assignPlatformStore,
        advertisementStore } = RootStore;

    return () => {
        authStore.resetData();
        stationStore.resetData();
        platformStore.resetData();
        flyoverStore.resetData();
        trainStore.resetData();
        assignPlatformStore.resetData();
        advertisementStore.resetData();
        AppStorage.clearStorage();
        navigate('/login', { replace: true });
    }
}

export default useLogout;
