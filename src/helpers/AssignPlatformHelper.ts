import { message } from "antd";
import { NavigateFunction } from "react-router-dom";
import RootStore from "../mobx-store/RootStore";
import Endpoints from "../services/Endpoints";
import SecureService from "../services/SecureService";

const AssignPlatformHelper = (navigate: NavigateFunction) => {
    const { assignPlatformStore, stationStore } = RootStore;

    const GetAssignPlatforms = async () => {
        let resAssignPlatforms: any;

        let params = `?stationId=${stationStore.id}&page=${assignPlatformStore.page}&size=${assignPlatformStore.size}`;
        if (assignPlatformStore?.searchStr) {
            params += `&name=${assignPlatformStore?.searchStr}`;
        }

        assignPlatformStore.isLoading = true;
        resAssignPlatforms = await SecureService(navigate).GetResponse(Endpoints.AssignPlatform + params);
        assignPlatformStore.isLoading = false;

        if (resAssignPlatforms?.status === 'OK') {
            let datas = [];
            if (resAssignPlatforms?.data?.length > 0) {
                for (let i = 0; i < resAssignPlatforms?.data.length; i++) {
                    let formattedData: any = {};
                    formattedData.id = resAssignPlatforms?.data[i]?.id;
                    formattedData.selectedPlatformId = resAssignPlatforms?.data[i]?.platformId;
                    formattedData.selectedTrainId = resAssignPlatforms?.data[i]?.trainId;
                    formattedData.platformNumber = resAssignPlatforms?.data[i]?.assignplatforms?.number;
                    formattedData.trainNumber = resAssignPlatforms?.data[i]?.assigntrains?.number;
                    formattedData.trainName = resAssignPlatforms?.data[i]?.assigntrains?.name;
                    formattedData.arrivalTime = resAssignPlatforms?.data[i]?.arrivalTime;
                    formattedData.departureTime = resAssignPlatforms?.data[i]?.departureTime;
                    formattedData.engineDirection = resAssignPlatforms?.data[i]?.engineDirection;
                    datas.push(formattedData)
                }
            }
            assignPlatformStore.assignPlatforms = datas;
            assignPlatformStore.page = resAssignPlatforms?.currentPage;
            assignPlatformStore.totalItems = resAssignPlatforms?.totalItems;
        }
    }

    const CreateAssignPlatform = async () => {
        let resCreateAssignPlatform: any;
        const assignPlatformCreateObj = {
            'stationId': stationStore?.id,
            'platformId': assignPlatformStore?.selectedPlatformId,
            'trainId': assignPlatformStore?.selectedTrainId,
            'arrivalTime': assignPlatformStore?.arrivalTime,
            'departureTime': assignPlatformStore?.departureTime,
            'engineDirection': assignPlatformStore?.engineDirection
        }

        assignPlatformStore.isLoading = true;
        resCreateAssignPlatform = await SecureService(navigate).PostResponse(Endpoints.AssignPlatform, 'POST', assignPlatformCreateObj);
        assignPlatformStore.isLoading = false;

        if (resCreateAssignPlatform?.status === 'CREATED') {
            message.success(resCreateAssignPlatform?.message, 5);
            await GetAssignPlatforms();
        }
    }

    const UpdateAssignPlatform = async () => {
        let resUpdateAssignPlatform: any;
        let assignPlatformUpdateObj = {
            'id': assignPlatformStore?.id,
            'platformId': assignPlatformStore?.selectedPlatformId,
            'trainId': assignPlatformStore?.selectedTrainId,
            'arrivalTime': assignPlatformStore?.arrivalTime,
            'departureTime': assignPlatformStore?.departureTime,
            'engineDirection': assignPlatformStore?.engineDirection
        }

        assignPlatformStore.isLoading = true;
        resUpdateAssignPlatform = await SecureService(navigate).PostResponse(Endpoints.AssignPlatform, 'PUT', assignPlatformUpdateObj);
        assignPlatformStore.isLoading = false;

        if (resUpdateAssignPlatform?.status === 'OK') {
            message.success(resUpdateAssignPlatform?.message, 5);
            await GetAssignPlatforms();
        }
    }

    const DeleteAssignPlatform = async (assignPlatformId: any) => {
        let resDeleteAssignPlatform: any;
        const deleteAssignPlatformObj: any = {
            id: assignPlatformId
        }

        assignPlatformStore.isLoading = true;
        resDeleteAssignPlatform = await SecureService(navigate).PostResponse(Endpoints.AssignPlatform, 'DELETE', deleteAssignPlatformObj);
        assignPlatformStore.isLoading = false;

        if (resDeleteAssignPlatform?.status === 'OK') {
            message.success(resDeleteAssignPlatform?.message, 5);
            await GetAssignPlatforms();
        }
    }

    return { GetAssignPlatforms, CreateAssignPlatform, UpdateAssignPlatform, DeleteAssignPlatform };
}

export default AssignPlatformHelper;
