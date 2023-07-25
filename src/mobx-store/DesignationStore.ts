import { action, makeObservable, observable } from "mobx";
import Messages from "../constant/Messages";
import { IDesignationData } from "../interface/IDesignation";

export default class DesignationStore {
    @observable designations: IDesignationData[] = [];
    @observable id: any = 0;
    @observable name: string = '';
    @observable departmentId: string = '';
    @observable roleId: string = '';
    @observable isActive: boolean = false;
    @observable isLoading: boolean = false;
    @observable formCreateDesignationErrors: any = {};

    constructor() {
        makeObservable(this);
    }

    @action resetData() {
        this.designations = [];
        this.resetPostData();
    }

    @action resetPostData() {
        this.id = 0;
        this.name = '';
        this.departmentId = '';
        this.roleId = '';
        this.isActive = false;
        this.isLoading = false;
        this.formCreateDesignationErrors = {};
    }

    @action setDesignationValues = (id: any) => {
        const selectedDesignation = this.designations?.find((designation:any)=> designation?.id === id);

        this.id = selectedDesignation?.id;
        this.name = selectedDesignation?.designation || '';
        this.roleId = selectedDesignation?.roleId || '';
        this.departmentId = selectedDesignation?.departmentId || '';
        this.isActive = selectedDesignation?.isActive || false;
        this.formCreateDesignationErrors = {};
    }

    @action isValidCreateDesignationForm() {
        this.formCreateDesignationErrors = {};

        if (!this.name) {
            this.formCreateDesignationErrors.name = Messages.EmptyDesignationName;
        }
        if (!this.departmentId) {
            this.formCreateDesignationErrors.departmentId = Messages.EmptyDepartmentId;
        }
        if (!this.roleId) {
            this.formCreateDesignationErrors.roleId = Messages.EmptyRoleId;
        }

        if (Object.keys(this.formCreateDesignationErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }
}
