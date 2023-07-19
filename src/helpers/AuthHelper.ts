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
            authStore.userId = 0;
            message.success(resLogin?.message, 5);
            navigate('/otp-verification', { replace: true });
        }
    }

    const OTPVerification = async (navigate: NavigateFunction, logoutCb: any) => {
        let resLogin: any;
        const loginPostData = {
            userId: authStore.userId,
            otp: authStore.loginOTP
        }

        authStore.isLoading = true;
        resLogin = await HttpClient().PostResponse(Endpoints.LoginOTPVerification, 'POST', loginPostData);
        authStore.isLoading = false;

        if (resLogin?.status === 'OK') {
            authStore.isLoggedIn = true;
            message.success(resLogin?.message, 5);
            navigate('/user', { replace: true });
        }
    }

    const CreateEmployee = async (navigate?: NavigateFunction) => {
        let resRegistration;
        const registrationPostData = {
            name: authStore.userName,
            empId: authStore.userEmpId,
            email: authStore.userMail,
            password: authStore.userPassword,
            phone: authStore.userMobile,
            roleId: authStore.userRoleId,
        }

        authStore.isLoading = true;
        resRegistration = await HttpClient().PostResponse(Endpoints.CreateUser, 'POST', registrationPostData);
        authStore.isLoading = false;

        if (resRegistration?.status === 'CREATED') {
            message.success(resRegistration?.message, 5);
        }
    }

    const UpdateEmployee = async (navigate?: NavigateFunction) => {
        let resAdminUpdate;
        const updatePostData = {
            id: authStore?.selectedUserId,
            name: authStore.userName,
            empId: authStore.userEmpId,
            email: authStore.userMail,
            password: authStore.userPassword,
            phone: authStore.userMobile,
            roleId: authStore.userRoleId,
        };

        authStore.isLoading = true;
        resAdminUpdate = await HttpClient().PostResponse(Endpoints.CreateUser, 'PUT', updatePostData);
        authStore.isLoading = false;

        if (resAdminUpdate?.status === 'OK') {
            message.success(resAdminUpdate?.message, 5);
        }
    }

    const GetEmployees = async (navigate: NavigateFunction) => {
        let resAdminUsers: any;

        authStore.isLoading = true;
        resAdminUsers = await SecureService(navigate).GetResponse(Endpoints.CreateUser);
        authStore.isLoading = false;

        if (resAdminUsers?.status === 'OK') {
            authStore.employees = resAdminUsers?.data;
        }
    }

    const GetRoles = async (navigate: NavigateFunction) => {
        let resAdminUsers: any;

        authStore.isLoading = true;
        resAdminUsers = await SecureService(navigate).GetResponse(Endpoints.Roles);
        authStore.isLoading = false;

        if (resAdminUsers?.status === 'OK') {
            authStore.roles = resAdminUsers?.data;
        }
    }

    const GetSections = async (navigate: NavigateFunction) => {
        let resAdminUsers: any;

        authStore.isLoading = true;
        resAdminUsers = await SecureService(navigate).GetResponse(Endpoints.Sections);
        authStore.isLoading = false;

        if (resAdminUsers?.status === 'OK') {
            authStore.sections = resAdminUsers?.data;
        }
    }

    return { Login, OTPVerification, CreateEmployee, UpdateEmployee, GetEmployees, GetRoles, GetSections };
}

export default AuthHelper;
