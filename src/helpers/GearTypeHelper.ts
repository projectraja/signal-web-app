import { message } from "antd";
import { NavigateFunction } from "react-router-dom";
import RootStore from "../mobx-store/RootStore";
import Endpoints from "../services/Endpoints";
import SecureService from "../services/SecureService";
import { IGearTypeRes } from "../interface/IGearType";

const GearTypeHelper = (navigate: NavigateFunction) => {
    let { gearTypeStore } = RootStore;

    const GetGearTypes = async () => {
        let resGearTypes: IGearTypeRes;

        gearTypeStore.isLoading = true;
        resGearTypes = await SecureService(navigate).GetResponse(Endpoints.GearType);
        gearTypeStore.isLoading = false;

        if (resGearTypes?.status === 'OK') {
            gearTypeStore.gearTypes = resGearTypes?.data;
        } else {
            gearTypeStore.gearTypes = []
        }
    }

    const CreateGearType = async () => {
        let resCreateGearType: any;
        const geartypeCreateObj = {
            'geartype': gearTypeStore?.name
        }

        gearTypeStore.isLoading = true;
        resCreateGearType = await SecureService(navigate).PostResponse(Endpoints.GearType, 'POST', geartypeCreateObj);
        gearTypeStore.isLoading = false;

        if (resCreateGearType?.status === 'CREATED') {
            message.success(resCreateGearType?.message, 5);
            await GetGearTypes();
        }
    }

    const UpdateGearType = async () => {
        let resUpdateGearType: any;
        const geartypeUpdateObj = {
            'geartype': gearTypeStore?.name,
            'isActive': gearTypeStore?.isActive,
        }

        gearTypeStore.isLoading = true;
        resUpdateGearType = await SecureService(navigate).PostResponse(Endpoints.GearType + '/' + gearTypeStore?.id, 'PUT', geartypeUpdateObj);
        gearTypeStore.isLoading = false;

        if (resUpdateGearType?.status === 'UPDATED') {
            message.success(resUpdateGearType?.message, 5);
            await GetGearTypes();
        }
    }

    const DeleteGearType = async (geartypeId: any) => {
        let resDeleteGearType: any;
        let deleteGearTypeObj: any = {
            id: geartypeId
        }

        gearTypeStore.isLoading = true;
        resDeleteGearType = await SecureService(navigate).PostResponse(Endpoints.GearType, 'DELETE', deleteGearTypeObj);
        gearTypeStore.isLoading = false;

        if (resDeleteGearType?.status === 'OK') {
            message.success(resDeleteGearType?.message, 5);
            await GetGearTypes();
        }
    }

    return { GetGearTypes, CreateGearType, UpdateGearType, DeleteGearType };
}

export default GearTypeHelper;
