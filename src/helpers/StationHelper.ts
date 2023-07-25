import { message } from "antd";
import { NavigateFunction } from "react-router-dom";
import RootStore from "../mobx-store/RootStore";
import Endpoints from "../services/Endpoints";
import SecureService from "../services/SecureService";
import FunctionUtil from "../utils/Function-Util";
import { IStationRes } from "../interface/IStation";

const StationHelper = (navigate: NavigateFunction) => {
    let { stationStore, authStore, sectionStore } = RootStore;

    const GetStations = async (isInitCall = false) => {
        let resStations: IStationRes;

        stationStore.isLoading = true;
        resStations = await SecureService(navigate).GetResponse(`${Endpoints.Station}/?sectionId=${stationStore.selectedSectionId}`);
        stationStore.isLoading = false;

        if (resStations?.status === 'OK') {
            stationStore.stations = resStations?.data;
        } else {
            stationStore.stations = [];
        }
    }

    const GetStationDetailsByUserId = async () => {
        // let resStationDetails: any;

        // stationStore.isLoading = true;
        // resStationDetails = await SecureService(navigate).GetResponse(`${Endpoints.Station}?userId=${authStore?.userId}`);
        // stationStore.isLoading = false;

        // if (resStationDetails) {
        //     if (resStationDetails?.status === 'OK') {
        //         stationStore.currentStation = resStationDetails?.data[0];
        //         if (!FunctionUtil.isEmptyObject(stationStore?.currentStation)) {
        //             stationStore.setStationValues();
        //         }
        //         authStore.isValidToken = true;
        //         navigate('/', { replace: true });
        //     }
        // } else {
        //     navigate('/login');
        // }
    }

    const CreateStation = async () => {
        let resCreateStation: any;
        const stationCreateObj = {
            'sectionId': sectionStore?.id,
            'stationName': stationStore?.name,
            'stationCode': stationStore?.code
        }

        stationStore.isLoading = true;
        resCreateStation = await SecureService(navigate).PostResponse(Endpoints.Station, 'POST', stationCreateObj);
        stationStore.isLoading = false;

        if (resCreateStation?.status === 'CREATED') {
            message.success(resCreateStation?.message, 5);
            await GetStations();
        }
    }

    const UpdateStation = async () => {
        let resUpdateStation: any;
        const stationUpdateObj = {
            'id': stationStore?.id,
            'sectionId': sectionStore?.id,
            'stationName': stationStore?.name,
            'stationCode': stationStore?.code
        }

        stationStore.isLoading = true;
        resUpdateStation = await SecureService(navigate).PostResponse(Endpoints.Station, 'PUT', stationUpdateObj);
        stationStore.isLoading = false;

        if (resUpdateStation?.status === 'OK') {
            message.success(resUpdateStation?.message, 5);
            await GetStations();
        }
    }

    const DeleteStation = async (stationId: any) => {
        let resDeleteStation: any;
        let deleteStationObj: any = {
            id: stationId
        }

        stationStore.isLoading = true;
        resDeleteStation = await SecureService(navigate).PostResponse(Endpoints.Station, 'DELETE', deleteStationObj);
        stationStore.isLoading = false;

        if (resDeleteStation?.status === 'OK') {
            message.success(resDeleteStation?.message, 5);
            await GetStations();
        }
    }

    return { GetStations, GetStationDetailsByUserId, CreateStation, UpdateStation, DeleteStation };
}

export default StationHelper;
