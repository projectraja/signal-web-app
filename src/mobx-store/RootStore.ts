import AdvertisementStore from "./AdvertisementStore";
import AssignPlatformStore from "./AssignPlatformStore";
import AuthStore from "./AuthStore";
import CommonStore from "./CommonStore";
import DisplayStore from "./DisplayStore";
import FlyoverStore from "./FlyoverStore";
import LanguageStore from "./LanguageStore";
import PlatformStore from "./PlatformStore";
import StationStore from "./StationStore";
import TrainStore from "./TrainStore";

class RootStore {
    commonStore: CommonStore;
    authStore: AuthStore;
    stationStore: StationStore;
    platformStore: PlatformStore;
    flyoverStore: FlyoverStore;
    trainStore: TrainStore;
    assignPlatformStore: AssignPlatformStore;
    advertisementStore: AdvertisementStore;
    displayStore: DisplayStore;
    languageStore: LanguageStore;

    constructor() {
        this.commonStore = new CommonStore();
        this.authStore = new AuthStore();
        this.stationStore = new StationStore();
        this.platformStore = new PlatformStore();
        this.flyoverStore = new FlyoverStore();
        this.trainStore = new TrainStore();
        this.assignPlatformStore = new AssignPlatformStore();
        this.advertisementStore = new AdvertisementStore();
        this.displayStore = new DisplayStore();
        this.languageStore = new LanguageStore();
    }
}

export default new RootStore();
