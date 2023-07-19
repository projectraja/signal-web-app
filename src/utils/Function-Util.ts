import { NavigateFunction, Location } from 'react-router-dom';
import RootStore from '../mobx-store/RootStore';
import AppStorage from '../storage/AppStorage';
import LocalStorage from '../storage/LocalStorage';
import { COLORS } from '../constant/Colors';
import jwt_decode from 'jwt-decode';
import CryptoJS from "crypto-js";
import Secrets from '../constant/Secrets';

class Function {

    emailExp: any = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    onlyNumExp: any = /^\d+$/;

    getTheme = () => {
        let { customColor } = RootStore.commonStore;

        return {
            COLORS: COLORS.green
        }
    }

    clearAllData = () => {
        LocalStorage.clearStorage();
        // history.push('/');
        window.location.reload();
    }

    isValidEmail = (email: string): boolean => {
        return this.emailExp.test(String(email).toLowerCase());
    }

    isNumOnly = (userName: string): boolean => {
        return this.onlyNumExp.test(String(userName).toLowerCase());
    }

    isLoggedIn = () => {
        let isLoggedIn: boolean = false;
        const userInfo: any = AppStorage.getUserDetails();
        if (userInfo?.AccessToken) {
            isLoggedIn = true;
        }
        return isLoggedIn;
    }

    isNetworkAvailable = () => {
        let networkStatus = false;
        if (window.navigator.onLine) {
            networkStatus = true;
        }
        return networkStatus;
    }

    checkNavigationStatus = (navigate: NavigateFunction, location: Location) => {
        if (location?.state?.isSecureNavigate) {
            navigate('', { replace: true });
        } else {
            navigate('/login', { replace: true });
        }
    }

    isEmptyObject(obj: {}) {
        let isEmpty = true;

        if (obj && Object.keys(obj).length !== 0) {
            isEmpty = false;
        }

        return isEmpty;
    }

    loadImagePath(imgPath: string) {
        return `${process.env.REACT_APP_BASE_URL}/${imgPath}`;
    }

    isUserCanProceed = () => {
        // let status: boolean = true;
        // if (!this.isStoreCreated()) {
        //     message.warning(Messages.EmptyStore, 5);
        //     status = false;
        // }
        // return status;
    }

    isValidJWTToken = () => {
        let isValid: boolean = false;
        const accessToken: string = RootStore.authStore?.accessToken;
        try {
            const decodedAccessToken: any = jwt_decode(accessToken);
            const currentDate = new Date();

            if ((decodedAccessToken?.exp * 1000) > currentDate.getTime()) {
                isValid = true;
            }
        } catch (err) {
            isValid = false;
        }

        return isValid;
    }

    logout = (navigate: NavigateFunction) => {
        const { } = RootStore;

        AppStorage.clearStorage();
        navigate('/login', { replace: true });
    }

    formatValue = (value: any) => {
        // let formattedValue = '';
        // const currency = RootStore.shopStore.storeDetails?.currency;

        // try {
        //     const numberVal: number = parseInt(value);
        //     formattedValue = new Intl.NumberFormat('en-IN', { style: 'currency', currency: currency })
        //         .format(numberVal).replace(/^(\D+)/, '$1 ');
        // } catch (err) {
        //     formattedValue = value;
        // }

        // return formattedValue;
    }

    imagetoDataURL(src: string, callback: any) {
        var image = new Image();
        image.crossOrigin = 'Anonymous';
        image.onload = function () {
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            // canvas.height = canvas .naturalHeight;
            // canvas.width = this.naturalWidth;
            // context.drawImage(this, 0, 0);
            var dataURL = canvas.toDataURL('image/png');
            callback(dataURL);
        };
        image.src = src;
    }

    dataURLtoFile = (dataurl: string, filename: string) => {
        let arr: any = dataurl.split(','), mime = arr[0]?.match(/:(.*?);/)[1],
            bstr = window.atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }

    openURL = (url: any) => {
        window.open(url, '_blank');
    }

    encrypt(plainText: string) {
        return CryptoJS.AES.encrypt(plainText, Secrets.ENCRYPTION_SECRET).toString();
    }

    decrypt(cipherText: string) {
        const bytes  = CryptoJS.AES.decrypt(cipherText, Secrets.ENCRYPTION_SECRET);
        return bytes.toString(CryptoJS.enc.Utf8);
    }
}

export default new Function();
