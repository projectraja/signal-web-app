import { action, makeObservable, observable } from "mobx";
import { IUserInfo } from '../interface/ILogin'
import AppStorage from '../storage/AppStorage';
import Messages from "../constant/Messages";

export default class AuthStore {
    @observable adminUsers: any[] = [];
    @observable page: number = 0;
    @observable size: number = 10;
    @observable totalItems: number = 0;
    @observable userId: number = 0;
    @observable name: string = '';
    @observable empId: string = '';
    @observable loginOTP: string = '';
    @observable roleName: string = '';
    @observable password: string = '';
    @observable confirmPassword: string = '';
    @observable roles: any[] = [];
    @observable sections: any[] = [];

    @observable selectedUserId: string = '';
    @observable userName: string = '';
    @observable userEmpId: string = '';
    @observable userRoleId: string = '';
    @observable userMobile: string = '';
    @observable userMail: string = '';
    @observable userPassword: string = '';
    @observable userConfirmPassword: string = '';
    @observable employees: any[] = [];


    @observable adminStationId: number = 0;
    @observable adminId: number = 0;
    @observable adminUserId: number = 0;
    @observable adminName: string = '';
    @observable adminEmpId: string = '';
    @observable adminRoleName: string = '';
    @observable adminPassword: string = '';
    @observable adminConfirmPassword: string = '';
    @observable isLoggedIn: boolean = false;
    @observable isValidToken: boolean = false;
    @observable accessToken: string = '';
    @observable refreshToken: string = '';
    @observable isLoading: boolean = false;
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

    @action resetData() {
        this.adminUsers = [];
        this.userId = 0;
        this.name = '';
        this.empId = '';
        this.loginOTP = '';
        this.roles = [];
        this.sections = [];
        this.selectedUserId = '';
        this.userName = '';
        this.userEmpId = '';
        this.userRoleId = '';
        this.userMobile = '';
        this.userMail = '';
        this.userPassword = '';
        this.userConfirmPassword = '';
        this.employees = [];


        this.roleName = '';
        this.adminStationId = 0;
        this.adminId = 0;
        this.adminUserId = 0;
        this.adminName = '';
        this.adminEmpId = '';
        this.adminRoleName = '';
        this.isLoggedIn = false;
        this.isValidToken = false;
        this.isLoading = false;
        this.confirmPassword = '';
        this.password = '';
        this.adminPassword = '';
        this.adminConfirmPassword = '';
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
            this.password = userInfo?.password;
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

        if (!this.password) {
            this.formLoginErrors.password = Messages.EmptyPassword;
        } else if (this.password.length < 5) {
            this.formLoginErrors.password = Messages.InvalidPassword;
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

        if (!this.userRoleId) {
            this.formEmployeeRegistrationErrors.userRoleId = Messages.EmptyRoleId;
        }
        if (!this.userName) {
            this.formEmployeeRegistrationErrors.userName = Messages.EmptyFullName;
        }
        if (!this.userEmpId) {
            this.formEmployeeRegistrationErrors.userEmpId = Messages.EmptyEmpId;
        }
        if (!this.userMobile) {
            this.formEmployeeRegistrationErrors.userMobile = Messages.EmptyPhone;
        }
        if (!this.userMail) {
            this.formEmployeeRegistrationErrors.userMail = Messages.EmptyEmail;
        }
        if (!this.userPassword && !this.userConfirmPassword) {
            this.formEmployeeRegistrationErrors.userPassword = Messages.EmptyPassword;
            this.formEmployeeRegistrationErrors.userConfirmPassword = Messages.EmptyConfirmPassword;
        }
        else if (!this.userPassword) {
            this.formEmployeeRegistrationErrors.userPassword = Messages.EmptyPassword;
        } else if (this.userPassword.length < 5) {
            this.formEmployeeRegistrationErrors.userPassword = Messages.InvalidPassword;
        } else if (!this.userConfirmPassword) {
            this.formEmployeeRegistrationErrors.userConfirmPassword = Messages.EmptyConfirmPassword;
        } else if (this.userConfirmPassword.length < 5) {
            this.formEmployeeRegistrationErrors.userConfirmPassword = Messages.InvalidPassword;
        } else if (this.userPassword !== this.userConfirmPassword) {
            this.formEmployeeRegistrationErrors.userConfirmPassword = Messages.ConfirmPasswordMismatch;
        }
        if (!this.adminStationId) {
            this.formEmployeeRegistrationErrors.adminStationId = Messages.EmptyStationCode;
        }

        if (Object.keys(this.formEmployeeRegistrationErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }

    @action isValidAdminUpdateForm() {
        this.formEmployeeRegistrationErrors = {};

        if (!this.adminName) {
            this.formEmployeeRegistrationErrors.adminName = Messages.EmptyFullName;
        }
        if (!this.adminEmpId) {
            this.formEmployeeRegistrationErrors.adminEmpId = Messages.EmptyEmpId;
        }
        if (!this.adminStationId) {
            this.formEmployeeRegistrationErrors.adminStationId = Messages.EmptyStationCode;
        }

        if (Object.keys(this.formEmployeeRegistrationErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }

    @action setProfileInfo(userData: any) {
        const userInfo: IUserInfo = {
            'userId': userData?.id,
            'empId': userData?.empId,
            'password': this.password,
            'name': userData?.name,
            'roleName': userData?.roleName,
            'accessToken': userData?.accessToken,
            'refreshToken': userData?.refreshToken
        }
        this.userId = userData?.id;
        this.empId = userData?.empId;
        this.roleName = userData?.roleName;
        this.accessToken = userData?.accessToken;
        this.refreshToken = userData?.refreshToken;
        AppStorage.setUserDetails(userInfo);
        this.setUserDetails();
    }

    @action setEmployeeValues = (id: any) => {
        const selectedUser = this.employees.find((employee) => employee.id === id);

        this.selectedUserId = selectedUser?.id;
        this.userRoleId = selectedUser?.roleId;
        this.userEmpId = selectedUser?.empId;
        this.userName = selectedUser?.name;
        this.userMobile = selectedUser?.phome;
        this.userMail = selectedUser?.email;
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
