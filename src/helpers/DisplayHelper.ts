import { message } from "antd";
import { NavigateFunction } from "react-router-dom";
import RootStore from "../mobx-store/RootStore";
import Endpoints from "../services/Endpoints";
import SecureService from "../services/SecureService";
import FunctionUtil from "../utils/Function-Util";

const DisplayHelper = (navigate: NavigateFunction) => {
    let { displayStore, stationStore, assignPlatformStore } = RootStore;

    const GetDisplays = async () => {
        let resDisplays: any;

        let params = `?stationId=${stationStore.id}&page=${displayStore.page}&size=${displayStore.size}`;
        if (displayStore?.searchStr) {
            params += `&number=${displayStore?.searchStr}`;
        }

        displayStore.isLoading = true;
        resDisplays = await SecureService(navigate).GetResponse(Endpoints.Display + params);
        displayStore.isLoading = false;

        if (resDisplays?.status === 'OK') {
            displayStore.displays = resDisplays?.data?.map((display: any) => {
                const plainPassword = FunctionUtil.decrypt(display?.password);
                return { ...display, password: plainPassword };
            });
            displayStore.page = resDisplays?.currentPage;
            displayStore.totalItems = resDisplays?.totalItems;
        }
    }

    const GetDisplaysByPatformId = async () => {
        let resDisplays: any;

        let params = `?stationId=${stationStore.id}&page=${displayStore.page}&size=${displayStore.size}`;
        if (displayStore?.searchStr) {
            params += `&number=${displayStore?.searchStr}`;
        }

        // if(assignPlatformStore?.selectedPlatformId) {
        //     params += 
        // }

        displayStore.isLoading = true;
        resDisplays = await SecureService(navigate).GetResponse(Endpoints.Display + '/getByPlatformId' + params);
        displayStore.isLoading = false;

        if (resDisplays?.status === 'OK') {
            displayStore.displays = resDisplays?.data?.map((display: any) => {
                const plainPassword = FunctionUtil.decrypt(display?.password);
                return { ...display, password: plainPassword };
            });
            displayStore.page = resDisplays?.currentPage;
            displayStore.totalItems = resDisplays?.totalItems;
        }
    }

    const CreateDisplay = async () => {
        let resCreateDisplay: any;
        const displayCreateObj = {
            'stationId': stationStore?.id,
            'name': displayStore?.name,
            'isFlyover': displayStore?.isFlyover,
            'platformId': displayStore?.platformId
        }

        displayStore.isLoading = true;
        resCreateDisplay = await SecureService(navigate).PostResponse(Endpoints.Display, 'POST', displayCreateObj);
        displayStore.isLoading = false;

        if (resCreateDisplay?.status === 'CREATED') {
            message.success(resCreateDisplay?.message, 5);
            await GetDisplays();
        }
    }

    const UpdateDisplay = async () => {
        let resUpdateDisplay: any;
        let displayUpdateObj = {
            'id': displayStore?.id,
            'name': displayStore?.name,
            'isFlyover': displayStore?.isFlyover,
            'platformId': displayStore?.platformId
        }

        displayStore.isLoading = true;
        resUpdateDisplay = await SecureService(navigate).PostResponse(Endpoints.Display, 'PUT', displayUpdateObj);
        displayStore.isLoading = false;

        if (resUpdateDisplay?.status === 'OK') {
            message.success(resUpdateDisplay?.message, 5);
            await GetDisplays();
        }
    }

    const DeleteDisplay = async (displayId: any) => {
        let resDeleteDisplay: any;
        let deleteDisplayObj: any = {
            id: displayId
        }

        displayStore.isLoading = true;
        resDeleteDisplay = await SecureService(navigate).PostResponse(Endpoints.Display, 'DELETE', deleteDisplayObj);
        displayStore.isLoading = false;

        if (resDeleteDisplay?.status === 'OK') {
            message.success(resDeleteDisplay?.message, 5);
            await GetDisplays();
        }
    }

    return { GetDisplays, GetDisplaysByPatformId, CreateDisplay, UpdateDisplay, DeleteDisplay };
}

export default DisplayHelper;
