import { action, makeObservable, observable } from "mobx";
import Messages from "../constant/Messages";

export default class AdvertisementStore {
    @observable advertisements: any[] = [];
    @observable page: number = 0;
    @observable size: number = 10;
    @observable totalItems: number = 0;
    @observable id: any = 0;
    @observable title: string = '';
    @observable videoPath: string = '';
    @observable file: any = [];
    @observable isActive: boolean = false;
    @observable uploadPercentage: number = 0;
    @observable searchStr: string = '';
    @observable isLoading: boolean = false;
    @observable formCreateAdErrors: any = {};

    constructor() {
        makeObservable(this);
    }

    @action resetData() {
        this.advertisements = [];
        this.resetPostData();
    }

    @action resetPostData() {
        this.id = 0;
        this.page = 0;
        this.size = 10;
        this.totalItems = 0;
        this.title = '';
        this.videoPath = '';
        this.file = '';
        this.isActive = false;
        this.uploadPercentage = 0;
        this.searchStr = '';
        this.isLoading = false;
        this.formCreateAdErrors = {};
    }

    @action setAdverisementValues = (id: any) => {
        const selectedAd = this.advertisements.find((advertisement) => advertisement.id === id);

        this.id = selectedAd?.id;
        this.title = selectedAd?.title;
        this.videoPath = selectedAd?.videoPath;
        this.isActive = selectedAd?.isActive;

        this.formCreateAdErrors = {};
    }

    @action isValidCreateAdForm() {
        this.formCreateAdErrors = {};

        if (!this.title) {
            this.formCreateAdErrors.title = Messages.EmptyVideoTitle;
        }

        if (this.file?.length === 0 && this.videoPath === '') {
            this.formCreateAdErrors.file = Messages.EmptyVideoFile;
        }

        if (Object.keys(this.formCreateAdErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }
}
