import { message } from "antd";
import { NavigateFunction } from "react-router-dom";
import RootStore from "../mobx-store/RootStore";
import Endpoints from "../services/Endpoints";
import SecureService from "../services/SecureService";
import { ILevelCrossingRes } from "../interface/ILevelCrossing";

const LevelCrossingHelper = (navigate: NavigateFunction) => {
    let { levelCrossingStore } = RootStore;

    const GetLevelCrossings = async () => {
        let resLevelCrossings: ILevelCrossingRes;

        levelCrossingStore.isLoading = true;
        resLevelCrossings = await SecureService(navigate).GetResponse(Endpoints.LevelCrossing);
        levelCrossingStore.isLoading = false;

        if (resLevelCrossings?.status === 'OK') {
            levelCrossingStore.levelCrossings = resLevelCrossings?.data;
        } else {
            levelCrossingStore.levelCrossings = []
        }
    }

    const CreateLevelCrossing = async () => {
        let resCreateLevelCrossing: any;
        const levelcrossingCreateObj = {
            'lc': levelCrossingStore?.name
        }

        levelCrossingStore.isLoading = true;
        resCreateLevelCrossing = await SecureService(navigate).PostResponse(Endpoints.LevelCrossing, 'POST', levelcrossingCreateObj);
        levelCrossingStore.isLoading = false;

        if (resCreateLevelCrossing?.status === 'CREATED') {
            message.success(resCreateLevelCrossing?.message, 5);
            await GetLevelCrossings();
        }
    }

    const UpdateLevelCrossing = async () => {
        let resUpdateLevelCrossing: any;
        const levelcrossingUpdateObj = {
            'lc': levelCrossingStore?.name,
            'isActive': levelCrossingStore?.isActive,
        }

        levelCrossingStore.isLoading = true;
        resUpdateLevelCrossing = await SecureService(navigate).PostResponse(Endpoints.LevelCrossing + '/' + levelCrossingStore?.id, 'PUT', levelcrossingUpdateObj);
        levelCrossingStore.isLoading = false;

        if (resUpdateLevelCrossing?.status === 'UPDATED') {
            message.success(resUpdateLevelCrossing?.message, 5);
            await GetLevelCrossings();
        }
    }

    const DeleteLevelCrossing = async (levelcrossingId: any) => {
        let resDeleteLevelCrossing: any;
        let deleteLevelCrossingObj: any = {
            id: levelcrossingId
        }

        levelCrossingStore.isLoading = true;
        resDeleteLevelCrossing = await SecureService(navigate).PostResponse(Endpoints.LevelCrossing, 'DELETE', deleteLevelCrossingObj);
        levelCrossingStore.isLoading = false;

        if (resDeleteLevelCrossing?.status === 'OK') {
            message.success(resDeleteLevelCrossing?.message, 5);
            await GetLevelCrossings();
        }
    }

    return { GetLevelCrossings, CreateLevelCrossing, UpdateLevelCrossing, DeleteLevelCrossing };
}

export default LevelCrossingHelper;
