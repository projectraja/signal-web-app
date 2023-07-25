import { message } from "antd";
import { NavigateFunction } from "react-router-dom";
import RootStore from "../mobx-store/RootStore";
import Endpoints from "../services/Endpoints";
import SecureService from "../services/SecureService";
import { ISectionRes } from "../interface/ISection";

const SectionHelper = (navigate: NavigateFunction) => {
    let { sectionStore } = RootStore;

    const GetSections = async () => {
        let resSections: ISectionRes;

        sectionStore.isLoading = true;
        resSections = await SecureService(navigate).GetResponse(Endpoints.Section);
        sectionStore.isLoading = false;

        if (resSections?.status === 'OK') {
            sectionStore.sections = resSections?.data;
        } else {
            sectionStore.sections = []
        }
    }

    const CreateSection = async () => {
        let resCreateSection: any;
        const sectionCreateObj = {
            'sectionName': sectionStore?.name
        }

        sectionStore.isLoading = true;
        resCreateSection = await SecureService(navigate).PostResponse(Endpoints.Section, 'POST', sectionCreateObj);
        sectionStore.isLoading = false;

        if (resCreateSection?.status === 'CREATED') {
            message.success(resCreateSection?.message, 5);
            await GetSections();
        }
    }

    const UpdateSection = async () => {
        let resUpdateSection: any;
        const sectionUpdateObj = {
            'id': sectionStore?.id,
            'sectionName': sectionStore?.name,
            'isActive': sectionStore?.isActive,
        }

        sectionStore.isLoading = true;
        resUpdateSection = await SecureService(navigate).PostResponse(Endpoints.Section, 'PUT', sectionUpdateObj);
        sectionStore.isLoading = false;

        if (resUpdateSection?.status === 'OK') {
            message.success(resUpdateSection?.message, 5);
            await GetSections();
        }
    }

    const DeleteSection = async (sectionId: any) => {
        let resDeleteSection: any;
        let deleteSectionObj: any = {
            id: sectionId
        }

        sectionStore.isLoading = true;
        resDeleteSection = await SecureService(navigate).PostResponse(Endpoints.Section, 'DELETE', deleteSectionObj);
        sectionStore.isLoading = false;

        if (resDeleteSection?.status === 'OK') {
            message.success(resDeleteSection?.message, 5);
            await GetSections();
        }
    }

    return { GetSections, CreateSection, UpdateSection, DeleteSection };
}

export default SectionHelper;
