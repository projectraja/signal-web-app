import { message } from "antd";
import { NavigateFunction } from "react-router-dom";
import RootStore from "../mobx-store/RootStore";
import Endpoints from "../services/Endpoints";
import SecureService from "../services/SecureService";

const AdvertisementHelper = (navigate: NavigateFunction) => {
    let { advertisementStore, stationStore } = RootStore;

    const GetAds = async () => {
        let resAds: any;

        let params = `?stationId=${stationStore.id}&page=${advertisementStore.page}&size=${advertisementStore.size}`;
        if (advertisementStore?.searchStr) {
            params += `&number=${advertisementStore?.searchStr}`;
        }

        advertisementStore.isLoading = true;
        resAds = await SecureService(navigate).GetResponse(Endpoints.Advertisement + params);
        advertisementStore.isLoading = false;

        if (resAds?.status === 'OK') {
            advertisementStore.advertisements = resAds?.data;
            advertisementStore.page = resAds?.currentPage;
            advertisementStore.totalItems = resAds?.totalItems;
        }
    }

    const CreateAd = async () => {
        let resCreateAd: any;
        let adFormData: any = new FormData();
        adFormData.append('stationId', stationStore?.id);
        adFormData.append('title', advertisementStore?.title);
        adFormData.append('file', advertisementStore?.file);

        advertisementStore.isLoading = true;
        resCreateAd = await SecureService(navigate).PostFile(Endpoints.Advertisement, 'POST', adFormData);
        advertisementStore.isLoading = false;

        if (resCreateAd?.status === 'CREATED') {
            message.success(resCreateAd?.message, 5);
            await GetAds();
        }
    }

    const UpdateAd = async () => {
        let resUpdateAd: any;
        let adFormData: any = new FormData();
        adFormData.append('id', advertisementStore?.id);
        adFormData.append('title', advertisementStore?.title);
        adFormData.append('file', advertisementStore?.file);
        adFormData.append('isActive', advertisementStore?.isActive);

        advertisementStore.isLoading = true;
        resUpdateAd = await SecureService(navigate).PostFile(Endpoints.Advertisement, 'PUT', adFormData);
        advertisementStore.isLoading = false;

        if (resUpdateAd?.status === 'OK') {
            message.success(resUpdateAd?.message, 5);
            await GetAds();
        }
    }

    const DeleteAd = async (adId: any) => {
        let resDeleteAd: any;
        let deleteAdObj: any = {
            id: adId
        }

        advertisementStore.isLoading = true;
        resDeleteAd = await SecureService(navigate).PostResponse(Endpoints.Advertisement, 'DELETE', deleteAdObj);
        advertisementStore.isLoading = false;

        if (resDeleteAd?.status === 'OK') {
            message.success(resDeleteAd?.message, 5);
            await GetAds();
        }
    }

    return { GetAds, CreateAd, UpdateAd, DeleteAd };
}

export default AdvertisementHelper;
