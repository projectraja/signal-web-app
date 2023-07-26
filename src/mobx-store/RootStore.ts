import AuthStore from "./AuthStore";
import CommonStore from "./CommonStore";
import DepartmentStore from "./DepartmentStore";
import DesignationStore from "./DesignationStore";
import GearStore from "./GearStore";
import GearTypeStore from "./GearTypeStore";
import LevelCrossingStore from "./LevelCrossingStore";
import SectionStore from "./SectionStore";
import StationStore from "./StationStore";

class RootStore {
    commonStore: CommonStore;
    authStore: AuthStore;
    stationStore: StationStore;
    sectionStore: SectionStore;
    departmentStore: DepartmentStore;
    designationStore: DesignationStore;
    gearTypeStore: GearTypeStore;
    gearStore: GearStore;
    levelCrossingStore: LevelCrossingStore;

    constructor() {
        this.commonStore = new CommonStore();
        this.authStore = new AuthStore();
        this.stationStore = new StationStore();
        this.sectionStore = new SectionStore();
        this.departmentStore = new DepartmentStore();
        this.designationStore = new DesignationStore();
        this.gearTypeStore = new GearTypeStore();
        this.gearStore = new GearStore();
        this.levelCrossingStore = new LevelCrossingStore();
    }
}

export default new RootStore();
