import { action, makeObservable, observable } from "mobx";
import Messages from "../constant/Messages";

export default class DisplayStore {
    @observable displays: any[] = [];
    @observable page: number = 0;
    @observable size: number = 10;
    @observable totalItems: number = 0;
    @observable id: any = 0;
    @observable name: string = "";
    @observable isFlyover: boolean = false;
    @observable stationId: number = 0;
    @observable platformId: number = 0;
    @observable searchStr: string = '';
    @observable isLoading: boolean = false;
    @observable formCreateDisplayErrors: any = {};

    constructor() {
        makeObservable(this);
    }

    @action resetData() {
        this.displays = [];
        this.resetPostData();
    }

    @action resetPostData() {
        this.id = 0;
        this.page = 0;
        this.size = 10;
        this.totalItems = 0;
        this.name = "";
        this.isFlyover = false;
        this.stationId = 0;
        this.platformId = 0;
        this.searchStr = '';
        this.isLoading = false;
        this.formCreateDisplayErrors = {};
    }

    @action setDisplayValues = (id: any) => {
        const selectedDisplay = this.displays.find((display) => display.id === id);

        this.id = selectedDisplay?.id;
        this.name = selectedDisplay?.name;
        this.isFlyover = selectedDisplay?.isFlyover;
        this.platformId = selectedDisplay?.platformId;
        this.formCreateDisplayErrors = {};
    }

    @action isValidCreateDisplayForm() {
        this.formCreateDisplayErrors = {};

        if (!this.name) {
            this.formCreateDisplayErrors.name = Messages.EmptyDisplayName;
        }

        if (!this.platformId) {
            this.formCreateDisplayErrors.platformId = Messages.EmptyDisplayPlatformId;
        }

        if (Object.keys(this.formCreateDisplayErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }
}
