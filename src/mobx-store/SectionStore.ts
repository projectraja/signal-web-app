import { action, makeObservable, observable } from "mobx";
import Messages from "../constant/Messages";
import { ISectionData } from "../interface/ISection";

export default class SectionStore {
    @observable sections: ISectionData[] = [];
    @observable id: any = 0;
    @observable name: string = '';
    @observable isActive: boolean = false;
    @observable isLoading: boolean = false;
    @observable formCreateSectionErrors: any = {};

    constructor() {
        makeObservable(this);
    }

    @action resetData() {
        this.sections = [];
        this.resetPostData();
    }

    @action resetPostData() {
        this.id = 0;
        this.name = '';
        this.isActive = false;
        this.isLoading = false;
        this.formCreateSectionErrors = {};
    }

    @action setSectionValues = (id: any) => {
        const selectedSection: any = this.sections?.find((section:any)=> section?.id === id);

        this.id = selectedSection?.id;
        this.name = selectedSection?.sectionName;
        this.isActive = selectedSection?.isActive;
        this.formCreateSectionErrors = {};
    }

    @action isValidCreateSectionForm() {
        this.formCreateSectionErrors = {};

        if (!this.name) {
            this.formCreateSectionErrors.name = Messages.EmptySectionName;
        }

        if (Object.keys(this.formCreateSectionErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }
}
