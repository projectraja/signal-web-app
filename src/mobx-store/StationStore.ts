import { action, makeObservable, observable } from "mobx";
import Messages from "../constant/Messages";

export default class StationStore {
    @observable stations: any[] = [];
    @observable currentStation: any = {};
    @observable page: number = 0;
    @observable size: number = 10;
    @observable totalItems: number = 0;
    @observable id: any = 0;
    @observable code: string = '';
    @observable name: string = '';
    @observable welcomeNotes: string = '';
    @observable adContact: string = '';
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
        this.page = 0;
        this.size = 10;
        this.totalItems = 0;
        this.code = '';
        this.name = '';
        this.welcomeNotes = '';
        this.adContact = '';
        this.searchStr = '';
        this.isLoading = false;
        this.formCreateStationErrors = {};
    }

    @action setStationValues = (id: any) => {
        const selectedStation: any = this.stations?.find((station:any)=> station?.id === id);

        this.id = selectedStation?.id;
        this.code = selectedStation?.code;
        this.name = selectedStation?.name;
        this.welcomeNotes = selectedStation?.welcomeNotes;
        this.adContact = selectedStation?.adContact;
        this.formCreateStationErrors = {};
    }

    @action setCurrentStationValues = () => {
        this.id = this.currentStation?.id;
        this.code = this.currentStation?.code;
        this.name = this.currentStation?.name;
        this.welcomeNotes = this.currentStation?.welcomeNotes;
        this.adContact = this.currentStation?.adContact;
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
