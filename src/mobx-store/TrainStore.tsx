import { action, makeObservable, observable } from "mobx";
import Messages from "../constant/Messages";

export default class TrainStore {
    @observable trainTypes: any[] = [{ value: 1, label: 'SF Express' }, { value: 2, label: 'Intercity Express' }, { value: 3, label: 'Express' }]
    @observable trains: any[] = [];
    @observable page: number = 0;
    @observable size: number = 10;
    @observable totalItems: number = 0;
    @observable id: any = 0;
    @observable number: string = '';
    @observable trainName = [{ trainName: '', languageId: 0 }];
    @observable languageWiseTrainName = '';
    @observable type: string = '1';
    @observable fromStation: string = '';
    @observable toStation: string = '';
    @observable languageId: number = 0;
    @observable coaches: any[] = [{ serialNumber: 1, coachNumber: '' }];
    @observable stations: any[] = [{ name: '',  languageId: 0 }];
    @observable searchStr: string = '';
    @observable isLoading: boolean = false;
    @observable formCreateTrainErrors: any = {};

    constructor() {
        makeObservable(this);
    }

    @action resetData() {
        this.trains = [];
        this.resetPostData();
    }

    @action resetPostData() {
        this.id = 0;
        this.page = 0;
        this.size = 10;
        this.totalItems = 0;
        this.number = '';
        this.trainName = [{ trainName: '', languageId: 0 }];
        this.languageWiseTrainName = '';
        this.type = '1';
        this.fromStation = '';
        this.toStation = '';
        this.languageId = 0;
        this.coaches = [{ serialNumber: 1, coachNumber: '' }];
        this.stations = [{ name: '',  languageId: 0 }];
        this.searchStr = '';
        this.isLoading = false;
        this.formCreateTrainErrors = {};
    }

    @action setTrainValues = (id: any) => {
        const selectedTrain = this.trains.find((train) => train.id === id);

        this.id = selectedTrain?.id;
        this.number = selectedTrain?.number;
        this.trainName = selectedTrain?.trainName;
        this.type = selectedTrain?.type;
        this.fromStation = selectedTrain?.fromStation;
        this.toStation = selectedTrain?.toStation;
        if (selectedTrain?.coaches?.length > 0) {
            this.coaches = selectedTrain?.coaches;
        } else {
            this.coaches = [{ serialNumber: 1, coachNumber: '' }];
        }
        if (selectedTrain?.stops?.length > 0) {
            this.stations = selectedTrain?.stops;
        } else {
            this.stations = [{ name: '' }];
        }
        this.formCreateTrainErrors = {};
    }

    @action isValidCreateTrainForm() {
        this.formCreateTrainErrors = {};

        if (!this.number) {
            this.formCreateTrainErrors.number = Messages.EmptyTrainNumber;
        }
        if (!this.trainName || this.trainName.length === 0 || this.trainName?.some(obj => obj.hasOwnProperty('trainName') && obj['trainName'] === '')) {
            this.formCreateTrainErrors.name = Messages.EmptyTrainName;
        }
        if(this.trainName.length < 3) {
            this.formCreateTrainErrors.name = Messages.NotFillAllTrainName;
        }
        if (!this.type) {
            this.formCreateTrainErrors.type = Messages.EmptyTrainType;
        }
        if (!this.fromStation) {
            this.formCreateTrainErrors.fromStation = Messages.EmptyTrainFromStation;
        }
        if (!this.toStation) {
            this.formCreateTrainErrors.toStation = Messages.EmptyTrainToStation;
        }
        if (this.coaches.some((coach: any) => coach.coachNumber === '' || coach.coachNumber === null)) {
            this.formCreateTrainErrors.coaches = Messages.EmptyTrainCoach;
        }
        if (this.stations.some((station: any) => station.name === '' || station.name === null)) {
            this.formCreateTrainErrors.stations = Messages.EmptyTrainStation;
        }

        if (Object.keys(this.formCreateTrainErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }
}
