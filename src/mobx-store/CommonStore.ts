import { action, makeObservable, observable } from "mobx";

export default class CommonStore {
    @observable sidebarShow: boolean = true;
    @observable sidebarUnfoldable: boolean = false;
    @observable customColor: string = 'green';

    constructor() {
        makeObservable(this);
    }

    @action resetData() {
        this.sidebarShow = true;
        this.sidebarUnfoldable = false;
        this.customColor = 'green';
    }
}
