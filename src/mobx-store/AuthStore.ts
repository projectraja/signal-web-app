import { action, makeObservable, observable } from "mobx";
import { IOTPVerificationData, IUserInfo } from '../interface/ILogin'
import AppStorage from '../storage/AppStorage';
import Messages from "../constant/Messages";
import { IRoleData } from "../interface/IRole";
import { IDesignationData } from "../interface/IDesignation";
import { IEmployeesData } from "../interface/IEmployee";

export default class AuthStore {
    @observable employees: IEmployeesData[] = [];
    @observable roles: IRoleData[] = [];
    @observable sections: any[] = [];
    @observable designations: IDesignationData[] = [];
    @observable page: number = 0;
    @observable size: number = 10;
    @observable totalItems: number = 0;
    @observable userId: string = '';
    @observable name: string = '';
    @observable empId: string = '';
    @observable designationId: string = '';
    @observable loginOTP: string = '';
    @observable roleName: string = '';
    @observable isOTPGenerated: boolean = false;
    @observable isLoggedIn: boolean = false;
    @observable isValidToken: boolean = false;
    @observable isLoading: boolean = false;
    @observable accessToken: string = '';
    @observable refreshToken: string = '';
    @observable selectedEmployeeId: string = '';
    @observable employeeDesignationId: string = '';
    @observable employeeName: string = '';
    @observable employeeId: number = 0;
    @observable employeeRoleId: string = '';
    @observable employeeMobile: string = '';
    @observable employeeMail: string = '';
    @observable formLoginErrors: any = {};
    @observable formLoginOTPErrors: any = {};
    @observable formEmployeeRegistrationErrors: any = {};


    constructor() {
        makeObservable(this);
        this.init();
    }

    @action resetLoginPostData() {
        this.page = 0;
        this.size = 10;
        this.totalItems = 0;
        this.formLoginErrors = {};
        this.formLoginOTPErrors = {};
        this.formEmployeeRegistrationErrors = {};
    }

    @action resetEmployeeCreatePostData() {
        this.employeeDesignationId = '';
        this.employeeId = 0;
        this.employeeName = '';
        this.employeeMobile = '';
        this.employeeMail = '';
        this.resetLoginPostData();
    }

    @action resetData() {
        this.employees = [];
        this.userId = '';
        this.name = '';
        this.empId = '';
        this.designationId = '';
        this.loginOTP = '';
        this.roles = [];
        this.sections = [];
        this.designations = [];
        this.selectedEmployeeId = '';
        this.employeeDesignationId = '';
        this.employeeName = '';
        this.employeeId = 0;
        this.employeeRoleId = '';
        this.employeeMobile = '';
        this.employeeMail = '';
        this.roleName = '';
        this.isOTPGenerated = false;
        this.isLoggedIn = false;
        this.isValidToken = false;
        this.isLoading = false;
        this.accessToken = '';
        this.refreshToken = '';
    }

    @action async init() {
        await this.setUserDetails();
    }

    @action async setUserDetails() {
        const userInfo: IUserInfo | any = await AppStorage.getUserDetails();
        if (userInfo?.accessToken) {
            this.userId = userInfo?.userId;
            this.name = userInfo?.name;
            this.empId = userInfo?.empId;
            this.roleName = userInfo?.roleName;
            this.accessToken = userInfo?.accessToken;
            this.refreshToken = userInfo?.refreshToken;
            this.isLoggedIn = true;
        }
    }

    @action isValidLoginForm() {
        this.formLoginErrors = {};

        if (!this.empId) {
            this.formLoginErrors.empId = Messages.EmptyEmpId;
        }

        if (Object.keys(this.formLoginErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }

    @action isValidLoginOTPForm() {
        this.formLoginOTPErrors = {};

        if (!this.loginOTP) {
            this.formLoginOTPErrors.loginOTP = Messages.EmptyOTP;
        } else if (this.loginOTP?.length < 5) {
            this.formLoginOTPErrors.loginOTP = Messages.InvalidOTP;
        }

        if (Object.keys(this.formLoginOTPErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }

    @action isValidEmployeeRegistrationForm() {
        this.formEmployeeRegistrationErrors = {};

        if (!this.employeeDesignationId) {
            this.formEmployeeRegistrationErrors.employeeDesignationId = Messages.EmptyDesignationId;
        }
        if (!this.employeeName) {
            this.formEmployeeRegistrationErrors.employeeName = Messages.EmptyFullName;
        }
        if (!this.employeeId) {
            this.formEmployeeRegistrationErrors.employeeId = Messages.EmptyEmpId;
        }
        if (!this.employeeMobile) {
            this.formEmployeeRegistrationErrors.employeeMobile = Messages.EmptyPhone;
        }
        if (!this.employeeMail) {
            this.formEmployeeRegistrationErrors.employeeMail = Messages.EmptyEmail;
        }

        if (Object.keys(this.formEmployeeRegistrationErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }

    @action setProfileInfo(userData: any) {
        const userInfo: IOTPVerificationData = {
            'id': userData?.id,
            'empId': userData?.empId,
            'isActive': userData?.isActive,
            'designationId': userData?.designationId,
            'accessToken': userData?.accessToken,
            'refreshToken': userData?.refreshToken
        }
        this.userId = userData?.id;
        this.empId = userData?.empId;
        this.designationId = userData?.designationId;
        this.accessToken = userData?.accessToken;
        this.refreshToken = userData?.refreshToken;
        AppStorage.setUserDetails(userInfo);
        this.setUserDetails();
    }

    @action setEmployeeValues = (id: any) => {
        const selectedUser = this.employees.find((employee) => employee.id === id);

        this.selectedEmployeeId = selectedUser?.id || '';
        this.employeeDesignationId = selectedUser?.designationId || '';
        this.employeeId = selectedUser?.empId || 0;
        this.employeeName = selectedUser?.name || '';
        this.employeeMobile = selectedUser?.phone || '';
        this.employeeMail = selectedUser?.email || '';
        this.formEmployeeRegistrationErrors = {};
    }

    @action async updateToken(tokenData: any) {
        let userInfo: IUserInfo | any = await AppStorage.getUserDetails();
        if (userInfo) {
            userInfo.accessToken = tokenData?.accessToken;
            userInfo.refreshToken = tokenData?.refreshToken;
            AppStorage.setUserDetails(userInfo);
            this.setUserDetails();
        }
    }
}
