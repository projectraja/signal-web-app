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
    @observable roleName: string = '';
    @observable password: string = '';
    @observable confirmPassword: string = '';
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
    @observable formRegistrationErrors: any = {};

    constructor() {
        makeObservable(this);
        this.init();
    }

    @action resetLoginPostData() {
        this.page = 0;
        this.size = 10;
        this.totalItems = 0;
        this.formLoginErrors = {};
        this.formRegistrationErrors = {};
    }

    @action resetData() {
        this.adminUsers = [];
        this.userId = 0;
        this.name = '';
        this.empId = '';
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

    @action isValidAdminRegistrationForm() {
        this.formRegistrationErrors = {};

        if (!this.adminName) {
            this.formRegistrationErrors.adminName = Messages.EmptyFullName;
        }
        if (!this.adminEmpId) {
            this.formRegistrationErrors.adminEmpId = Messages.EmptyEmpId;
        }
        if (!this.adminPassword && !this.adminConfirmPassword) {
            this.formRegistrationErrors.adminPassword = Messages.EmptyPassword;
            this.formRegistrationErrors.adminConfirmPassword = Messages.EmptyConfirmPassword;
        }
        else if (!this.adminPassword) {
            this.formRegistrationErrors.adminPassword = Messages.EmptyPassword;
        } else if (this.adminPassword.length < 5) {
            this.formRegistrationErrors.adminPassword = Messages.InvalidPassword;
        } else if (!this.adminConfirmPassword) {
            this.formRegistrationErrors.adminConfirmPassword = Messages.EmptyConfirmPassword;
        } else if (this.adminConfirmPassword.length < 5) {
            this.formRegistrationErrors.adminConfirmPassword = Messages.InvalidPassword;
        } else if (this.adminPassword !== this.adminConfirmPassword) {
            this.formRegistrationErrors.adminConfirmPassword = Messages.ConfirmPasswordMismatch;
        }
        if (!this.adminStationId) {
            this.formRegistrationErrors.adminStationId = Messages.EmptyStationCode;
        }

        if (Object.keys(this.formRegistrationErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }

    @action isValidAdminUpdateForm() {
        this.formRegistrationErrors = {};

        if (!this.adminName) {
            this.formRegistrationErrors.adminName = Messages.EmptyFullName;
        }
        if (!this.adminEmpId) {
            this.formRegistrationErrors.adminEmpId = Messages.EmptyEmpId;
        }
        if (!this.adminStationId) {
            this.formRegistrationErrors.adminStationId = Messages.EmptyStationCode;
        }

        if (Object.keys(this.formRegistrationErrors).length === 0) {
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

    @action setAdminUserValues = (id: any) => {
        const selectedUser = this.adminUsers.find((user) => user.id === id);

        this.adminId = selectedUser?.id;
        this.adminUserId = selectedUser?.userId;
        this.adminEmpId = selectedUser?.empId;
        this.adminName = selectedUser?.name;
        this.adminRoleName = selectedUser?.roleName;
        this.adminStationId = selectedUser?.stationId;
        this.formRegistrationErrors = {};
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
