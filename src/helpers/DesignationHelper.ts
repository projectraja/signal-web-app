import { message } from "antd";
import { NavigateFunction } from "react-router-dom";
import RootStore from "../mobx-store/RootStore";
import Endpoints from "../services/Endpoints";
import SecureService from "../services/SecureService";
import { IDesignationRes } from "../interface/IDesignation";

const DesignationHelper = (navigate: NavigateFunction) => {
    let { designationStore } = RootStore;

    const GetDesignations = async () => {
        let resDesignations: IDesignationRes;

        designationStore.isLoading = true;
        resDesignations = await SecureService(navigate).GetResponse(Endpoints.Designation);
        designationStore.isLoading = false;

        if (resDesignations?.status === 'OK') {
            designationStore.designations = resDesignations?.data;
        } else {
            designationStore.designations = []
        }
    }

    const CreateDesignation = async () => {
        let resCreateDesignation: any;
        const designationCreateObj = {
            'designation': designationStore?.name,
            "departmentId": designationStore.departmentId,
            "roleId": designationStore.roleId
        }

        designationStore.isLoading = true;
        resCreateDesignation = await SecureService(navigate).PostResponse(Endpoints.Designation, 'POST', designationCreateObj);
        designationStore.isLoading = false;

        if (resCreateDesignation?.status === 'CREATED') {
            message.success(resCreateDesignation?.message, 5);
            await GetDesignations();
        }
    }

    const UpdateDesignation = async () => {
        let resUpdateDesignation: any;
        const designationUpdateObj = {
            'designation': designationStore?.name,
            "departmentId": designationStore.departmentId,
            "roleId": designationStore.roleId,
            'isActive': designationStore?.isActive,
        }

        designationStore.isLoading = true;
        resUpdateDesignation = await SecureService(navigate).PostResponse(Endpoints.Designation + '/' + designationStore?.id, 'PUT', designationUpdateObj);
        designationStore.isLoading = false;

        if (resUpdateDesignation?.status === 'UPDATED') {
            message.success(resUpdateDesignation?.message, 5);
            await GetDesignations();
        }
    }

    const DeleteDesignation = async (designationId: any) => {
        let resDeleteDesignation: any;
        let deleteDesignationObj: any = {
            id: designationId
        }

        designationStore.isLoading = true;
        resDeleteDesignation = await SecureService(navigate).PostResponse(Endpoints.Designation, 'DELETE', deleteDesignationObj);
        designationStore.isLoading = false;

        if (resDeleteDesignation?.status === 'OK') {
            message.success(resDeleteDesignation?.message, 5);
            await GetDesignations();
        }
    }

    return { GetDesignations, CreateDesignation, UpdateDesignation, DeleteDesignation };
}

export default DesignationHelper;
