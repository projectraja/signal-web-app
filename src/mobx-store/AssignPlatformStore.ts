import { action, makeObservable, observable } from "mobx";
import Messages from "../constant/Messages";

export default class AssignPlatformStore {
    @observable assignPlatforms: any[] = [];
    @observable page: number = 0;
    @observable size: number = 10;
    @observable totalItems: number = 0;
    @observable id: any = 0;
    @observable selectedPlatformId: any = 0;
    @observable selectedTrainId: any = 0;
    @observable platformNumber: string = '';
    @observable trainNumber: string = '';
    @observable trainName: string = '';
    @observable arrivalTime: string = '';
    @observable departureTime: string = '';
    @observable engineDirection: string = 'down';
    @observable searchStr: string = '';
    @observable isLoading: boolean = false;
    @observable formCreateAssignPlatformErrors: any = {};

    constructor() {
        makeObservable(this);
    }

    @action resetData() {
        this.assignPlatforms = [];
        this.resetPostData();
    }

    @action resetPostData() {
        this.id = 0;
        this.page = 0;
        this.size = 10;
        this.totalItems = 0;
        this.selectedPlatformId = 0;
        this.selectedTrainId = 0;
        this.platformNumber = '';
        this.trainNumber = '';
        this.trainName = '';
        this.arrivalTime = '';
        this.departureTime = '';
        this.engineDirection = 'down';
        this.searchStr = '';
        this.isLoading = false;
        this.formCreateAssignPlatformErrors = {};
    }

    @action setAssignPlatformValues = (id: any) => {
        const selectedAssignPlatform = this.assignPlatforms.find((assignPlatform) => assignPlatform.id === id);

        this.id = selectedAssignPlatform?.id;
        this.selectedPlatformId = selectedAssignPlatform?.selectedPlatformId;
        this.selectedTrainId = selectedAssignPlatform?.selectedTrainId;
        this.platformNumber = selectedAssignPlatform?.platformNumber;
        this.trainNumber = selectedAssignPlatform?.trainNumber;
        this.trainName = selectedAssignPlatform?.trainName;
        this.arrivalTime = selectedAssignPlatform?.arrivalTime;
        this.departureTime = selectedAssignPlatform?.departureTime;
        this.engineDirection = selectedAssignPlatform?.engineDirection;
        this.formCreateAssignPlatformErrors = {};
    }

    @action isValidCreateAssignPlatformForm() {
        this.formCreateAssignPlatformErrors = {};

        if (!this.selectedPlatformId) {
            this.formCreateAssignPlatformErrors.selectedPlatformId = Messages.EmptyPlatformNumber;
        }
        if (!this.selectedTrainId) {
            this.formCreateAssignPlatformErrors.selectedTrainId = Messages.EmptyTrainNumber;
        }
        if (!this.arrivalTime) {
            this.formCreateAssignPlatformErrors.arrivalTime = Messages.EmptyTrainArrivalTime;
        }
        if (!this.departureTime) {
            this.formCreateAssignPlatformErrors.departureTime = Messages.EmptyTrainDepartureTime;
        }

        if (Object.keys(this.formCreateAssignPlatformErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }
}
