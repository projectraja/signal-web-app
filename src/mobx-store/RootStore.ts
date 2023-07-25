import AuthStore from "./AuthStore";
import CommonStore from "./CommonStore";
import DepartmentStore from "./DepartmentStore";
import SectionStore from "./SectionStore";
import StationStore from "./StationStore";

class RootStore {
    commonStore: CommonStore;
    authStore: AuthStore;
    stationStore: StationStore;
    sectionStore: SectionStore;
    departmentStore: DepartmentStore;

    constructor() {
        this.commonStore = new CommonStore();
        this.authStore = new AuthStore();
        this.stationStore = new StationStore();
        this.sectionStore = new SectionStore();
        this.departmentStore = new DepartmentStore();
    }
}

export default new RootStore();
