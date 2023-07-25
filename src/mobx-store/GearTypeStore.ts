import { action, makeObservable, observable } from "mobx";
import Messages from "../constant/Messages";
import { IGearTypeData } from "../interface/IGearType";

export default class GearTypeStore {
    @observable gearTypes: IGearTypeData[] = [];
    @observable id: any = 0;
    @observable name: string = '';
    @observable isActive: boolean = false;
    @observable isLoading: boolean = false;
    @observable formCreateGearTypeErrors: any = {};

    constructor() {
        makeObservable(this);
    }

    @action resetData() {
        this.gearTypes = [];
        this.resetPostData();
    }

    @action resetPostData() {
        this.id = 0;
        this.name = '';
        this.isActive = false;
        this.isLoading = false;
        this.formCreateGearTypeErrors = {};
    }

    @action setGearTypeValues = (id: any) => {
        const selectedGearType = this.gearTypes?.find((geartype:any)=> geartype?.id === id);

        this.id = selectedGearType?.id;
        this.name = selectedGearType?.gearType || '';
        this.isActive = selectedGearType?.isActive || false;
        this.formCreateGearTypeErrors = {};
    }

    @action isValidCreateGearTypeForm() {
        this.formCreateGearTypeErrors = {};

        if (!this.name) {
            this.formCreateGearTypeErrors.name = Messages.EmptyGearTypeName;
        }

        if (Object.keys(this.formCreateGearTypeErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }
}
