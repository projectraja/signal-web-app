import { message } from "antd";
import { NavigateFunction } from "react-router-dom";
import RootStore from "../mobx-store/RootStore";
import Endpoints from "../services/Endpoints";
import SecureService from "../services/SecureService";
import FunctionUtil from "../utils/Function-Util";

const LanguageHelper = (navigate: NavigateFunction) => {
    let { languageStore, stationStore } = RootStore;

    const GetLanguages = async () => {
        let resLanguages: any;

        let params = `?stationId=${stationStore.id}&page=${languageStore.page}&size=${languageStore.size}`;

        languageStore.isLoading = true;
        resLanguages = await SecureService(navigate).GetResponse(Endpoints.Language + params);
        languageStore.isLoading = false;

        if (resLanguages?.status === 'OK') {
            languageStore.languages = resLanguages?.data;
            languageStore.page = resLanguages?.currentPage;
            languageStore.totalItems = resLanguages?.totalItems;
        }
    }

    const CreateLanguage = async () => {
        let resCreateLanguage: any;
        const languageCreateObj = {
            'name': languageStore?.name
        }

        languageStore.isLoading = true;
        resCreateLanguage = await SecureService(navigate).PostResponse(Endpoints.Language, 'POST', languageCreateObj);
        languageStore.isLoading = false;

        if (resCreateLanguage?.status === 'CREATED') {
            message.success(resCreateLanguage?.message, 5);
            await GetLanguages();
        }
    }

    const UpdateLanguage = async () => {
        let resUpdateLanguage: any;
        let languageUpdateObj = {
            'id': languageStore?.id,
            'name': languageStore?.name
        }

        languageStore.isLoading = true;
        resUpdateLanguage = await SecureService(navigate).PostResponse(Endpoints.Language, 'PUT', languageUpdateObj);
        languageStore.isLoading = false;

        if (resUpdateLanguage?.status === 'OK') {
            message.success(resUpdateLanguage?.message, 5);
            await GetLanguages();
        }
    }

    const DeleteLanguage = async (languageId: any) => {
        let resDeleteLanguage: any;
        let deleteLanguageObj: any = {
            id: languageId
        }

        languageStore.isLoading = true;
        resDeleteLanguage = await SecureService(navigate).PostResponse(Endpoints.Language, 'DELETE', deleteLanguageObj);
        languageStore.isLoading = false;

        if (resDeleteLanguage?.status === 'OK') {
            message.success(resDeleteLanguage?.message, 5);
            await GetLanguages();
        }
    }

    return { GetLanguages, CreateLanguage, UpdateLanguage, DeleteLanguage };
}

export default LanguageHelper;
