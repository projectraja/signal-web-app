import { action, makeObservable, observable } from "mobx";
import Messages from "../constant/Messages";

export default class LanguageStore {
    @observable languages: any[] = [];
    @observable page: number = 0;
    @observable size: number = 10;
    @observable totalItems: number = 0;
    @observable id: any = 0;
    @observable name: string = "";
    @observable isLoading: boolean = false;
    @observable formCreateLanguageErrors: any = {};

    constructor() {
        makeObservable(this);
    }

    @action resetData() {
        this.languages = [];
        this.resetPostData();
    }

    @action resetPostData() {
        this.id = 0;
        this.page = 0;
        this.size = 10;
        this.totalItems = 0;
        this.name = "";
        this.isLoading = false;
        this.formCreateLanguageErrors = {};
    }

    @action setLanguageValues = (id: any) => {
        const selectedLanguage = this.languages.find((language) => language.id === id);

        this.id = selectedLanguage?.id;
        this.name = selectedLanguage?.name;
        this.formCreateLanguageErrors = {};
    }

    @action isValidCreateLanguageForm() {
        this.formCreateLanguageErrors = {};

        if (!this.name) {
            this.formCreateLanguageErrors.name = Messages.EmptyLanguageName;
        }

        if (Object.keys(this.formCreateLanguageErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }
}
