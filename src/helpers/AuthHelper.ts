import { message } from "antd";
import { NavigateFunction } from "react-router-dom";
import RootStore from "../mobx-store/RootStore";
import Endpoints from "../services/Endpoints";
import HttpClient from "../services/HttpClient";
import SecureService from "../services/SecureService";
import StationHelper from "./StationHelper";

const AuthHelper = () => {
    let { authStore, stationStore } = RootStore;

    const Login = async (navigate: NavigateFunction, logoutCb: any) => {
        let resLogin: any;
        const loginPostData = {
            empId: authStore?.empId,
            password: authStore?.password
        };

        authStore.isLoading = true;
        resLogin = await HttpClient().PostResponse(Endpoints.Login, 'POST', loginPostData);
        authStore.isLoading = false;

        if (resLogin?.status === 'OK') {
            authStore.isLoggedIn = true;
            authStore.setProfileInfo(resLogin?.data);
            message.success(resLogin?.message, 5);
            if (authStore?.roleName === 'SUPER ADMIN') {
                navigate('/station', { replace: true });
            } else {
                await StationHelper(navigate).GetStationDetailsByUserId();
                if (stationStore?.currentStation?.id) {
                    navigate('/platform', { replace: true });
                } else {
                    navigate('/login', { replace: true });
                }
            }
        }
    }

    const AddAdmin = async (navigate?: NavigateFunction) => {
        let resRegistration;
        const registrationPostData = {
            name: authStore?.adminName,
            empId: authStore?.adminEmpId,
            password: authStore?.adminPassword,
            stationId: authStore?.adminStationId
        };

        authStore.isLoading = true;
        resRegistration = await HttpClient().PostResponse(Endpoints.Registration, 'POST', registrationPostData);
        authStore.isLoading = false;

        if (resRegistration?.status === 'CREATED') {
            message.success(resRegistration?.message, 5);
        }
    }

    const UpdateAdmin = async (navigate?: NavigateFunction) => {
        let resAdminUpdate;
        const updatePostData = {
            id: authStore?.adminId,
            name: authStore?.adminName,
            empId: authStore?.adminEmpId,
            stationId: authStore?.adminStationId
        };

        authStore.isLoading = true;
        resAdminUpdate = await HttpClient().PostResponse(Endpoints.AdminUser, 'PUT', updatePostData);
        authStore.isLoading = false;

        if (resAdminUpdate?.status === 'OK') {
            message.success(resAdminUpdate?.message, 5);
        }
    }

    const DeleteAdminUser = async (navigate?: NavigateFunction) => {
        let resAdminDelete;
        const deletePostData = {
            id: authStore?.adminId
        };

        authStore.isLoading = true;
        resAdminDelete = await HttpClient().PostResponse(Endpoints.AdminUser, 'DELETE', deletePostData);
        authStore.isLoading = false;

        if (resAdminDelete?.status === 'OK') {
            message.success(resAdminDelete?.message, 5);
        }
    }

    const GetAdminUsers = async (navigate: NavigateFunction) => {
        let resAdminUsers: any;

        let params = `?page=${authStore.page}&size=${authStore.size}`;
        // if (authStore?.searchStr) {
        //     params += `&number=${authStore?.searchStr}`;
        // }

        authStore.isLoading = true;
        resAdminUsers = await SecureService(navigate).GetResponse(Endpoints.AdminUser + params);
        authStore.isLoading = false;

        if (resAdminUsers?.status === 'OK') {
            let datas = resAdminUsers?.data;
            if (resAdminUsers?.data?.length > 0) {
                for (let i = 0; i < resAdminUsers?.data.length; i++) {
                    datas[i].roleName = resAdminUsers?.data[i]?.userRole?.name;
                }
            }
            authStore.adminUsers = datas;
            authStore.page = resAdminUsers?.currentPage;
            authStore.totalItems = resAdminUsers?.totalItems;
        }
    }

    return { Login, AddAdmin, UpdateAdmin, GetAdminUsers, DeleteAdminUser };
}

export default AuthHelper;
