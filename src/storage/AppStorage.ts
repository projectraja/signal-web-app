// import { IUserInfo } from "../interface/ILogin";
import LocalStorage from "./LocalStorage";

export default class AppStorage extends LocalStorage {

  static _KEYS = {
    USER_INFO: 'USER_INFO'
  }

  static setValue(key: string, value: any) {
    super.set(key, value);
  }

  static setUserDetails(userInfo: any) {
    this.setValue(this._KEYS.USER_INFO, userInfo);
  }

  static getUserDetails() {
    return super.get(this._KEYS.USER_INFO);
  }
}
