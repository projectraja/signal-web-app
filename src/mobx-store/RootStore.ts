import AuthStore from "./AuthStore";
import CommonStore from "./CommonStore";
import StationStore from "./StationStore";

class RootStore {
    commonStore: CommonStore;
    authStore: AuthStore;
    stationStore: StationStore;

    constructor() {
        this.commonStore = new CommonStore();
        this.authStore = new AuthStore();
        this.stationStore = new StationStore();
    }
}

export default new RootStore();
