import { ILocalStorage } from '../interface/ICommon';

export default class LocalStorage {
    static set(key: string, value: any) {
        const persist: ILocalStorage = {
            type: typeof value,
            value: value
        };
        localStorage.setItem(key, this.getRaw(persist));
    }

    static get(key: string) {
        const json = this.getItemJSON(key);
        return json ? json?.value : null;
    }

    static clearStorage() {
        localStorage.clear();
    }

    static getItemJSON(key: string): ILocalStorage {
        let jsonObj = localStorage.getItem(key)
        jsonObj = jsonObj ? jsonObj : "{}"
        return JSON.parse(jsonObj);
    }

    static getRaw(value: ILocalStorage) {
        return JSON.stringify(value);
    }
}
