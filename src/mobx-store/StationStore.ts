import { action, makeObservable, observable } from "mobx";
import Messages from "../constant/Messages";
import { IStationData } from "../interface/IStation";

export default class StationStore {
    @observable stations: IStationData[] = [];
    @observable currentStation: any = {};
    @observable page: number = 0;
    @observable size: number = 10;
    @observable totalItems: number = 0;
    @observable id: any = 0;
    @observable selectedSectionId: string = '';
    @observable code: string = '';
    @observable name: string = '';
    @observable sectionId: string = '';
    @observable searchStr: string = '';
    @observable isLoading: boolean = false;
    @observable formCreateStationErrors: any = {};

    constructor() {
        makeObservable(this);
    }

    @action resetData() {
        this.stations = [];
        this.currentStation = {};
        this.resetPostData();
    }

    @action resetPostData() {
        this.id = 0;
        this.selectedSectionId = '';
        this.page = 0;
        this.size = 10;
        this.totalItems = 0;
        this.code = '';
        this.name = '';
        this.sectionId = ''
        this.searchStr = '';
        this.isLoading = false;
        this.formCreateStationErrors = {};
    }

    @action setStationValues = (id: any) => {
        const selectedStation = this.stations?.find((station:any)=> station?.id === id);

        this.id = selectedStation?.id;
        this.sectionId = selectedStation?.sectionId || '';
        this.code = selectedStation?.stationCode || '';
        this.name = selectedStation?.stationName || '';
        this.sectionId = selectedStation?.sectionId || '';
        this.formCreateStationErrors = {};
    }

    @action isValidCreateStationForm() {
        this.formCreateStationErrors = {};

        if (!this.code) {
            this.formCreateStationErrors.code = Messages.EmptyStationCode;
        }

        if (!this.name) {
            this.formCreateStationErrors.name = Messages.EmptyStationName;
        }

        if (Object.keys(this.formCreateStationErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }
}
