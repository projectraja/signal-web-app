import { message } from "antd";
import { NavigateFunction } from "react-router-dom";
import RootStore from "../mobx-store/RootStore";
import Endpoints from "../services/Endpoints";
import HttpClient from "../services/HttpClient";
import SecureService from "../services/SecureService";
import { ILoginRes, IOTPVerificationRes } from "../interface/ILogin";
import { IRoleRes } from "../interface/IRole";
import { IDesignationRes } from "../interface/IDesignation";
import { IEmployeesRes } from "../interface/IEmployee";

const AuthHelper = () => {
    let { authStore } = RootStore;

    const Login = async (navigate: NavigateFunction, logoutCb: any) => {
        let resLogin: ILoginRes;
        const loginPostData = {
            empId: authStore?.empId
        };

        authStore.isLoading = true;
        resLogin = await HttpClient().PostResponse(Endpoints.Login, 'POST', loginPostData);
        authStore.isLoading = false;

        if (resLogin?.status === 'OK') {
            authStore.isOTPGenerated = true;
            authStore.userId = resLogin?.data?._id || '';
            message.success(resLogin?.message, 5);
            navigate('/otp-verification');
        } else {
            authStore.isOTPGenerated = false;
            authStore.userId = '';
        }
    }

    const OTPVerification = async (navigate: NavigateFunction, logoutCb: any) => {
        let resLogin: IOTPVerificationRes;
        const loginPostData = {
            userId: authStore.userId,
            otp: authStore.loginOTP
        }

        authStore.isLoading = true;
        resLogin = await HttpClient().PostResponse(Endpoints.LoginOTPVerification, 'POST', loginPostData);
        authStore.isLoading = false;

        if (resLogin?.status === 'OK') {
            authStore.isLoggedIn = true;
            authStore.setProfileInfo(resLogin?.data)
            message.success(resLogin?.message, 5);
            navigate('/employee', { replace: true });
        } else {
            authStore.isLoggedIn = false;
        }
    }

    const CreateEmployee = async (navigate?: NavigateFunction) => {
        let resRegistration;
        const registrationPostData = {
            name: authStore.employeeName,
            empId: authStore.employeeId,
            email: authStore.employeeMail,
            phone: authStore.employeeMobile,
            designationId: authStore.employeeDesignationId
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
            name: authStore.employeeName,
            empId: authStore.employeeId,
            email: authStore.employeeMail,
            phone: authStore.employeeMobile,
            designationId: authStore.employeeDesignationId
        };

        authStore.isLoading = true;
        resAdminUpdate = await HttpClient().PostResponse(Endpoints.CreateUser + '/' + authStore?.selectedEmployeeId, 'PUT', updatePostData);
        authStore.isLoading = false;

        if (resAdminUpdate?.status === 'UPDATED') {
            message.success(resAdminUpdate?.message, 5);
        }
    }

    const GetEmployees = async (navigate: NavigateFunction) => {
        let resAdminUsers: IEmployeesRes;

        authStore.isLoading = true;
        resAdminUsers = await SecureService(navigate).GetResponse(Endpoints.CreateUser);
        authStore.isLoading = false;

        if (resAdminUsers?.status === 'OK') {
            authStore.employees = resAdminUsers?.data;
        }
    }

    const GetRoles = async (navigate: NavigateFunction) => {
        let resAdminUsers: IRoleRes;

        authStore.isLoading = true;
        resAdminUsers = await SecureService(navigate).GetResponse(Endpoints.Roles);
        authStore.isLoading = false;

        if (resAdminUsers?.status === 'OK') {
            authStore.roles = resAdminUsers?.data;
        }
    }

    const GetDesignations = async (navigate: NavigateFunction) => {
        let resAdminUsers: IDesignationRes;

        authStore.isLoading = true;
        resAdminUsers = await SecureService(navigate).GetResponse(Endpoints.Designation);
        authStore.isLoading = false;

        if (resAdminUsers?.status === 'OK') {
            authStore.designations = resAdminUsers?.data;
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

    return { Login, OTPVerification, CreateEmployee, UpdateEmployee, GetEmployees, GetRoles, GetDesignations, GetSections };
}

export default AuthHelper;
