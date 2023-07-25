import { message } from "antd";
import { NavigateFunction } from "react-router-dom";
import RootStore from "../mobx-store/RootStore";
import Endpoints from "../services/Endpoints";
import SecureService from "../services/SecureService";
import { IGearRes } from "../interface/IGear";

const GearHelper = (navigate: NavigateFunction) => {
    let { gearStore } = RootStore;

    const GetGears = async () => {
        let resGears: IGearRes;

        gearStore.isLoading = true;
        resGears = await SecureService(navigate).GetResponse(Endpoints.Gear);
        gearStore.isLoading = false;

        if (resGears?.status === 'OK') {
            gearStore.gears = resGears?.data;
        } else {
            gearStore.gears = []
        }
    }

    const CreateGear = async () => {
        let resCreateGear: any;
        const gearCreateObj = {
            'gear': gearStore?.name,
            "gearTypeId": gearStore?.gearTypeId,
            "stationId": gearStore?.stationId
        }

        gearStore.isLoading = true;
        resCreateGear = await SecureService(navigate).PostResponse(Endpoints.Gear, 'POST', gearCreateObj);
        gearStore.isLoading = false;

        if (resCreateGear?.status === 'CREATED') {
            message.success(resCreateGear?.message, 5);
            await GetGears();
        }
    }

    const UpdateGear = async () => {
        let resUpdateGear: any;
        const gearUpdateObj = {
            'gear': gearStore?.name,
            "gearTypeId": gearStore?.gearTypeId,
            "stationId": gearStore?.stationId,
            'isActive': gearStore?.isActive,
        }

        gearStore.isLoading = true;
        resUpdateGear = await SecureService(navigate).PostResponse(Endpoints.Gear + '/' + gearStore?.id, 'PUT', gearUpdateObj);
        gearStore.isLoading = false;

        if (resUpdateGear?.status === 'UPDATED') {
            message.success(resUpdateGear?.message, 5);
            await GetGears();
        }
    }

    const DeleteGear = async (gearId: any) => {
        let resDeleteGear: any;
        let deleteGearObj: any = {
            id: gearId
        }

        gearStore.isLoading = true;
        resDeleteGear = await SecureService(navigate).PostResponse(Endpoints.Gear, 'DELETE', deleteGearObj);
        gearStore.isLoading = false;

        if (resDeleteGear?.status === 'OK') {
            message.success(resDeleteGear?.message, 5);
            await GetGears();
        }
    }

    return { GetGears, CreateGear, UpdateGear, DeleteGear };
}

export default GearHelper;
