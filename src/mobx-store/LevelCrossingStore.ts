import { action, makeObservable, observable } from "mobx";
import Messages from "../constant/Messages";
import { ILevelCrossingData } from "../interface/ILevelCrossing";

export default class LevelCrossingStore {
    @observable levelCrossings: ILevelCrossingData[] = [];
    @observable id: any = 0;
    @observable name: string = '';
    @observable isActive: boolean = false;
    @observable isLoading: boolean = false;
    @observable formCreateLevelCrossingErrors: any = {};

    constructor() {
        makeObservable(this);
    }

    @action resetData() {
        this.levelCrossings = [];
        this.resetPostData();
    }

    @action resetPostData() {
        this.id = 0;
        this.name = '';
        this.isActive = false;
        this.isLoading = false;
        this.formCreateLevelCrossingErrors = {};
    }

    @action setLevelCrossingValues = (id: any) => {
        const selectedLevelCrossing = this.levelCrossings?.find((levelcrossing:any)=> levelcrossing?.id === id);

        this.id = selectedLevelCrossing?.id;
        this.name = selectedLevelCrossing?.lc || '';
        this.isActive = selectedLevelCrossing?.isActive || false;
        this.formCreateLevelCrossingErrors = {};
    }

    @action isValidCreateLevelCrossingForm() {
        this.formCreateLevelCrossingErrors = {};

        if (!this.name) {
            this.formCreateLevelCrossingErrors.name = Messages.EmptyLevelCrossing;
        }

        if (Object.keys(this.formCreateLevelCrossingErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }
}
