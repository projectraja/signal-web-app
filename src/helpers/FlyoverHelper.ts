import { message } from "antd";
import { NavigateFunction } from "react-router-dom";
import RootStore from "../mobx-store/RootStore";
import Endpoints from "../services/Endpoints";
import SecureService from "../services/SecureService";

const FlyoverHelper = (navigate: NavigateFunction) => {
    const { flyoverStore, stationStore } = RootStore;

    const GetFlyovers = async () => {
        let resFlyovers: any;

        let params = `?stationId=${stationStore.id}&page=${flyoverStore.page}&size=${flyoverStore.size}`;
        if (flyoverStore?.searchStr) {
            params += `&number=${flyoverStore?.searchStr}`;
        }

        flyoverStore.isLoading = true;
        resFlyovers = await SecureService(navigate).GetResponse(Endpoints.Flyover + params);
        flyoverStore.isLoading = false;

        if (resFlyovers?.status === 'OK') {
            flyoverStore.flyovers = resFlyovers?.data;
            flyoverStore.page = resFlyovers?.currentPage;
            flyoverStore.totalItems = resFlyovers?.totalItems;
        }
    }

    const CreateFlyover = async () => {
        let resCreateFlyover: any;
        const flyoverCreateObj = {
            'stationId': stationStore?.id,
            'platformsId': flyoverStore?.platformsId,
            'type': flyoverStore?.type,
            'description': flyoverStore?.description,
            'isFlyover': true
        }

        flyoverStore.isLoading = true;
        resCreateFlyover = await SecureService(navigate).PostResponse(Endpoints.Flyover, 'POST', flyoverCreateObj);
        flyoverStore.isLoading = false;

        if (resCreateFlyover?.status === 'CREATED') {
            message.success(resCreateFlyover?.message, 5);
            await GetFlyovers();
        }
    }

    const UpdateFlyover = async () => {
        let resUpdateFlyover: any;
        let flyoverUpdateObj = {
            'id': flyoverStore?.id,
            'platformsId': flyoverStore?.platformsId,
            'type': flyoverStore?.type,
            'description': flyoverStore?.description,
            'isFlyover': true
        }

        flyoverStore.isLoading = true;
        resUpdateFlyover = await SecureService(navigate).PostResponse(Endpoints.Flyover, 'PUT', flyoverUpdateObj);
        flyoverStore.isLoading = false;

        if (resUpdateFlyover?.status === 'OK') {
            message.success(resUpdateFlyover?.message, 5);
            await GetFlyovers();
        }
    }

    const DeleteFlyover = async (flyoverId: any) => {
        let resDeleteFlyover: any;
        let deleteFlyoverObj: any = {
            id: flyoverId
        }

        flyoverStore.isLoading = true;
        resDeleteFlyover = await SecureService(navigate).PostResponse(Endpoints.Flyover, 'DELETE', deleteFlyoverObj);
        flyoverStore.isLoading = false;

        if (resDeleteFlyover?.status === 'OK') {
            message.success(resDeleteFlyover?.message, 5);
            await GetFlyovers();
        }
    }

    return { GetFlyovers, CreateFlyover, UpdateFlyover, DeleteFlyover };
}

export default FlyoverHelper;
