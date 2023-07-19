import { action, makeObservable, observable } from "mobx";
import Messages from "../constant/Messages";

export default class PlatformStore {
    @observable platforms: any[] = [];
    @observable page: number = 0;
    @observable size: number = 10;
    @observable totalItems: number = 0;
    @observable id: any = 0;
    @observable number: number = 0;
    @observable type: number = 1;
    @observable description: string = '';
    @observable searchStr: string = '';
    @observable isLoading: boolean = false;
    @observable formCreatePlatformErrors: any = {};

    constructor() {
        makeObservable(this);
    }

    @action resetData() {
        this.platforms = [];
        this.resetPostData();
    }

    @action resetPostData() {
        this.id = 0;
        this.page = 0;
        this.size = 10;
        this.totalItems = 0;
        this.number = 0;
        this.type = 1;
        this.description = '';
        this.searchStr = '';
        this.isLoading = false;
        this.formCreatePlatformErrors = {};
    }

    @action setPlatformValues = (id: any) => {
        const selectedPlatform = this.platforms.find((platform) => platform.id === id);

        this.id = selectedPlatform?.id;
        this.number = selectedPlatform?.number;
        this.type = selectedPlatform?.type;
        this.description = selectedPlatform?.description;
        this.formCreatePlatformErrors = {};
    }

    @action isValidCreatePlatformForm() {
        this.formCreatePlatformErrors = {};

        if (!this.number) {
            this.formCreatePlatformErrors.number = Messages.EmptyPlatformNumber;
        }

        if (!this.description) {
            this.formCreatePlatformErrors.description = Messages.EmptyPlatformDescription;
        }

        if (Object.keys(this.formCreatePlatformErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }
}
