import { message } from "antd";
import { NavigateFunction } from "react-router-dom";
import RootStore from "../mobx-store/RootStore";
import Endpoints from "../services/Endpoints";
import SecureService from "../services/SecureService";
import { IDepartmentRes } from "../interface/IDepartment";

const DepartmentHelper = (navigate: NavigateFunction) => {
    let { departmentStore } = RootStore;

    const GetDepartments = async () => {
        let resDepartments: IDepartmentRes;

        departmentStore.isLoading = true;
        resDepartments = await SecureService(navigate).GetResponse(Endpoints.Department);
        departmentStore.isLoading = false;

        if (resDepartments?.status === 'OK') {
            departmentStore.departments = resDepartments?.data;
        } else {
            departmentStore.departments = []
        }
    }

    const CreateDepartment = async () => {
        let resCreateDepartment: any;
        const departmentCreateObj = {
            'department': departmentStore?.name
        }

        departmentStore.isLoading = true;
        resCreateDepartment = await SecureService(navigate).PostResponse(Endpoints.Department, 'POST', departmentCreateObj);
        departmentStore.isLoading = false;

        if (resCreateDepartment?.status === 'CREATED') {
            message.success(resCreateDepartment?.message, 5);
            await GetDepartments();
        }
    }

    const UpdateDepartment = async () => {
        let resUpdateDepartment: any;
        const departmentUpdateObj = {
            'id': departmentStore?.id,
            'department': departmentStore?.name,
            'isActive': departmentStore?.isActive,
        }

        departmentStore.isLoading = true;
        resUpdateDepartment = await SecureService(navigate).PostResponse(Endpoints.Department, 'PUT', departmentUpdateObj);
        departmentStore.isLoading = false;

        if (resUpdateDepartment?.status === 'OK') {
            message.success(resUpdateDepartment?.message, 5);
            await GetDepartments();
        }
    }

    const DeleteDepartment = async (departmentId: any) => {
        let resDeleteDepartment: any;
        let deleteDepartmentObj: any = {
            id: departmentId
        }

        departmentStore.isLoading = true;
        resDeleteDepartment = await SecureService(navigate).PostResponse(Endpoints.Department, 'DELETE', deleteDepartmentObj);
        departmentStore.isLoading = false;

        if (resDeleteDepartment?.status === 'OK') {
            message.success(resDeleteDepartment?.message, 5);
            await GetDepartments();
        }
    }

    return { GetDepartments, CreateDepartment, UpdateDepartment, DeleteDepartment };
}

export default DepartmentHelper;
