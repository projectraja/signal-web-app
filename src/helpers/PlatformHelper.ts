import { message } from "antd";
import { NavigateFunction } from "react-router-dom";
import RootStore from "../mobx-store/RootStore";
import Endpoints from "../services/Endpoints";
import SecureService from "../services/SecureService";

const PlatformHelper = (navigate: NavigateFunction) => {
    let { platformStore, stationStore } = RootStore;

    const GetPlatforms = async () => {
        let resPlatforms: any;

        let params = `?stationId=${stationStore.id}&page=${platformStore.page}&size=${platformStore.size}`;
        if (platformStore?.searchStr) {
            params += `&number=${platformStore?.searchStr}`;
        }

        platformStore.isLoading = true;
        resPlatforms = await SecureService(navigate).GetResponse(Endpoints.Platform + params);
        platformStore.isLoading = false;

        if (resPlatforms?.status === 'OK') {
            platformStore.platforms = resPlatforms?.data;
            platformStore.page = resPlatforms?.currentPage;
            platformStore.totalItems = resPlatforms?.totalItems;
        }
    }

    const CreatePlatform = async () => {
        let resCreatePlatform: any;
        const platformCreateObj = {
            'stationId': stationStore?.id,
            'number': platformStore?.number,
            'type': platformStore?.type,
            'description': platformStore?.description
        }

        platformStore.isLoading = true;
        resCreatePlatform = await SecureService(navigate).PostResponse(Endpoints.Platform, 'POST', platformCreateObj);
        platformStore.isLoading = false;

        if (resCreatePlatform?.status === 'CREATED') {
            message.success(resCreatePlatform?.message, 5);
            await GetPlatforms();
        }
    }

    const UpdatePlatform = async () => {
        let resUpdatePlatform: any;
        let platformUpdateObj = {
            'id': platformStore?.id,
            'number': platformStore?.number,
            'type': platformStore?.type,
            'description': platformStore?.description
        }

        platformStore.isLoading = true;
        resUpdatePlatform = await SecureService(navigate).PostResponse(Endpoints.Platform, 'PUT', platformUpdateObj);
        platformStore.isLoading = false;

        if (resUpdatePlatform?.status === 'OK') {
            message.success(resUpdatePlatform?.message, 5);
            await GetPlatforms();
        }
    }

    const DeletePlatform = async (platformId: any) => {
        let resDeletePlatform: any;
        let deletePlatformObj: any = {
            id: platformId
        }

        platformStore.isLoading = true;
        resDeletePlatform = await SecureService(navigate).PostResponse(Endpoints.Platform, 'DELETE', deletePlatformObj);
        platformStore.isLoading = false;

        if (resDeletePlatform?.status === 'OK') {
            message.success(resDeletePlatform?.message, 5);
            await GetPlatforms();
        }
    }

    return { GetPlatforms, CreatePlatform, UpdatePlatform, DeletePlatform };
}

export default PlatformHelper;
