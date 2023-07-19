import { action, makeObservable, observable } from "mobx";
import Messages from "../constant/Messages";

export default class FlyoverStore {
    @observable flyovers: any[] = [];
    @observable page: number = 0;
    @observable size: number = 10;
    @observable totalItems: number = 0;
    @observable id: any = 0;
    @observable platformsId: number[] = [];
    @observable type: number = 2;
    @observable description: string = '';
    @observable searchStr: string = '';
    @observable isLoading: boolean = false;
    @observable formCreateFlyoverErrors: any = {};

    constructor() {
        makeObservable(this);
    }

    @action resetData() {
        this.flyovers = [];
        this.resetPostData();
    }

    @action resetPostData() {
        this.id = 0;
        this.page = 0;
        this.size = 10;
        this.totalItems = 0;
        this.platformsId = [];
        this.type = 2;
        this.description = '';
        this.searchStr = '';
        this.isLoading = false;
        this.formCreateFlyoverErrors = {};
    }

    @action setFlyoverValues = (id: any) => {
        const selectedFlyover = this.flyovers.find((flyover) => flyover.id === id);

        this.id = selectedFlyover?.id;
        this.platformsId = selectedFlyover?.platformsId;
        this.type = selectedFlyover?.type;
        this.description = selectedFlyover?.description;
        this.formCreateFlyoverErrors = {};
    }

    @action isValidCreateFlyoverForm() {
        this.formCreateFlyoverErrors = {};

        if (!this.description) {
            this.formCreateFlyoverErrors.description = Messages.EmptyFlyoverDescription;
        }

        if (Object.keys(this.formCreateFlyoverErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }
}
