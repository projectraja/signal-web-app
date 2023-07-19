import { message } from "antd";
import { NavigateFunction } from "react-router-dom";
import RootStore from "../mobx-store/RootStore";
import Endpoints from "../services/Endpoints";
import SecureService from "../services/SecureService";

const TrainHelper = (navigate: NavigateFunction) => {
    let { trainStore, stationStore } = RootStore;

    const GetTrains = async () => {
        let resTrains: any;
        let params = `?stationId=${stationStore.id}&page=${trainStore.page}&size=${trainStore.size}`;
        if (trainStore?.searchStr) {
            params += `&number=${trainStore?.searchStr}`;
        }

        trainStore.isLoading = true;
        resTrains = await SecureService(navigate).GetResponse(Endpoints.Train + params);
        trainStore.isLoading = false;

        if (resTrains?.status === 'OK') {
            trainStore.trains = resTrains?.data;
            trainStore.page = resTrains?.currentPage;
            trainStore.totalItems = resTrains?.totalItems;
        }
    }

    const CreateTrain = async () => {
        let resCreateTrain: any;
        const trainCreateObj = {
            'stationId': stationStore?.id,
            'number': trainStore?.number,
            'trainName': trainStore?.trainName,
            'type': trainStore?.type,
            'fromStation': trainStore?.fromStation,
            'toStation': trainStore?.toStation,
            'coaches': trainStore?.coaches,
            'stops': trainStore?.stations
        }

        trainStore.isLoading = true;
        resCreateTrain = await SecureService(navigate).PostResponse(Endpoints.Train, 'POST', trainCreateObj);
        trainStore.isLoading = false;

        if (resCreateTrain?.status === 'CREATED') {
            message.success(resCreateTrain?.message, 5);
            await GetTrains();
        }
    }

    const UpdateTrain = async () => {
        let resUpdateTrain: any;
        let trainUpdateObj = {
            'id': trainStore?.id,
            'number': trainStore?.number,
            'trainName': trainStore?.trainName,
            'type': trainStore?.type,
            'fromStation': trainStore?.fromStation,
            'toStation': trainStore?.toStation,
            'coaches': trainStore?.coaches,
            'stops': trainStore?.stations
        }

        trainStore.isLoading = true;
        resUpdateTrain = await SecureService(navigate).PostResponse(Endpoints.Train, 'PUT', trainUpdateObj);
        trainStore.isLoading = false;

        if (resUpdateTrain?.status === 'OK') {
            message.success(resUpdateTrain?.message, 5);
            await GetTrains();
        }
    }

    const DeleteTrain = async (trainId: any) => {
        let resDeleteTrain: any;
        let deleteTrainObj: any = {
            id: trainId
        }

        trainStore.isLoading = true;
        resDeleteTrain = await SecureService(navigate).PostResponse(Endpoints.Train, 'DELETE', deleteTrainObj);
        trainStore.isLoading = false;

        if (resDeleteTrain?.status === 'OK') {
            message.success(resDeleteTrain?.message, 5);
            await GetTrains();
        }
    }

    return { GetTrains, CreateTrain, UpdateTrain, DeleteTrain };
}

export default TrainHelper;
