import { action, makeObservable, observable } from "mobx";
import Messages from "../constant/Messages";
import { IGearData } from "../interface/IGear";

export default class GearStore {
    @observable gears: IGearData[] = [];
    @observable id: any = 0;
    @observable gearTypeId: string = '';
    @observable stationId: string = '';
    @observable name: string = '';
    @observable isActive: boolean = false;
    @observable isLoading: boolean = false;
    @observable formCreateGearErrors: any = {};

    constructor() {
        makeObservable(this);
    }

    @action resetData() {
        this.gears = [];
        this.resetPostData();
    }

    @action resetPostData() {
        this.id = 0;
        this.gearTypeId = '';
        this.stationId = '';
        this.name = '';
        this.isActive = false;
        this.isLoading = false;
        this.formCreateGearErrors = {};
    }

    @action setGearValues = (id: any) => {
        const selectedGear = this.gears?.find((gear:any)=> gear?.id === id);

        this.id = selectedGear?.id;
        this.gearTypeId = selectedGear?.gearTypeId || '';
        this.stationId = selectedGear?.stationId || '';
        this.name = selectedGear?.gear || '';
        this.isActive = selectedGear?.isActive || false;
        this.formCreateGearErrors = {};
    }

    @action isValidCreateGearForm() {
        this.formCreateGearErrors = {};

        if (!this.name) {
            this.formCreateGearErrors.name = Messages.EmptyGearName;
        }
        if (!this.gearTypeId) {
            this.formCreateGearErrors.gearTypeId = Messages.EmptyGearTypeName;
        }
        if (!this.stationId) {
            this.formCreateGearErrors.stationId = Messages.EmptyStationName;
        }

        if (Object.keys(this.formCreateGearErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }
}
