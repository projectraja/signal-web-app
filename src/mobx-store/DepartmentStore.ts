import { action, makeObservable, observable } from "mobx";
import Messages from "../constant/Messages";
import { IDepartmentData } from "../interface/IDepartment";

export default class DepartmentStore {
    @observable departments: IDepartmentData[] = [];
    @observable id: any = 0;
    @observable name: string = '';
    @observable isActive: boolean = false;
    @observable isLoading: boolean = false;
    @observable formCreateDepartmentErrors: any = {};

    constructor() {
        makeObservable(this);
    }

    @action resetData() {
        this.departments = [];
        this.resetPostData();
    }

    @action resetPostData() {
        this.id = 0;
        this.name = '';
        this.isActive = false;
        this.isLoading = false;
        this.formCreateDepartmentErrors = {};
    }

    @action setDepartmentValues = (id: any) => {
        const selectedDepartment = this.departments?.find((department:any)=> department?.id === id);

        this.id = selectedDepartment?.id;
        this.name = selectedDepartment?.department || '';
        this.isActive = selectedDepartment?.isActive || false;
        this.formCreateDepartmentErrors = {};
    }

    @action isValidCreateDepartmentForm() {
        this.formCreateDepartmentErrors = {};

        if (!this.name) {
            this.formCreateDepartmentErrors.name = Messages.EmptyDepartmentName;
        }

        if (Object.keys(this.formCreateDepartmentErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }
}
