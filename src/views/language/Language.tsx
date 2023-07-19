import { Modal, Tooltip } from "antd";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { CustomTable, Loader, PageTransition, SubHeader } from "../../components";
import { ITableColumn } from "../../interface/IComponent";
import RootStore from "../../mobx-store/RootStore";
import LanguageHelper from "../../helpers/LanguageHelper";
import { Icons } from "../../constant/Icons";

const { confirm } = Modal;

const Language: React.FC = () => {
    const { languageStore } = RootStore;
    const navigate = useNavigate();
    const columns: ITableColumn[] = [
        {
            key: "",
            title: "#",
            width: '5%',
            align: 'center'
        },
        {
            key: "name",
            title: "Name",
            width: '79%',
            isTrim: true
        },
        {
            key: "id",
            title: "Edit",
            width: '7%',
            render: (id: any) => (
                <Tooltip placement="topLeft" title='Edit' arrowPointAtCenter>
                    <img src={Icons.Edit} alt='ellipsis-vertical' style={{ height: '25px', cursor: 'pointer' }}
                        onClick={() => onUpdate(id)} />
                </Tooltip>
            ),
        }, {
            key: "id",
            title: "Delete",
            width: '7%',
            render: (id: any) => (
                <Tooltip placement="topLeft" title='Delete' arrowPointAtCenter>
                    <img src={Icons.Delete} alt='ellipsis-vertical' style={{ height: '25px', cursor: 'pointer' }}
                        onClick={() => showDelteConfirm(id)} />
                </Tooltip>
            ),
        }
    ];

    useEffect(() => {
        getLanguages();

        return () => {
            languageStore.page = 0;
        }
    }, []);

    const getLanguages = async () => {
        await LanguageHelper(navigate).GetLanguages();
    }

    const onChangePage = async (page: number) => {
        languageStore.page = page - 1;
        await LanguageHelper(navigate).GetLanguages();
    }

    const onDelete = async (id: any) => {
        await LanguageHelper(navigate).DeleteLanguage(id);
    }

    const onUpdate = (id: any) => {
        languageStore.setLanguageValues(id);
        navigate(id?.toString());
    }

    const navigateToAdd = () => {
        navigate('add');
        languageStore.resetPostData();
    }

    const showDelteConfirm = (id: any) => {
        confirm({
            title: 'Delete',
            icon: <ExclamationCircleOutlined />,
            content: 'Are you sure you want to delete?',
            onOk() {
                onDelete(id);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    return <PageTransition>
        <div>
            <SubHeader
                title="Languages" count={languageStore.size} addBtn addBtnText='Add Language'
                onAddClick={navigateToAdd} isLoading={languageStore?.isLoading}/>
            <CustomTable
                columns={columns} datas={languageStore?.languages}
                defaultPaginationCurrent={1} paginationCurrent={languageStore?.page}
                paginationTotal={languageStore?.totalItems}
                onPageChange={onChangePage} isLoading={languageStore?.isLoading} />
            <Loader visibility={languageStore?.isLoading} />
        </div>
    </PageTransition>
}

export default observer(Language);
