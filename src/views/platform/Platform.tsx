import { Modal, Tag, Tooltip } from "antd";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { Icons } from "../../constant/Icons";
import { CustomTable, Loader, PageTransition, SubHeader } from "../../components";
import { ITableColumn } from "../../interface/IComponent";
import RootStore from "../../mobx-store/RootStore";
import PlatformHelper from "../../helpers/PlatformHelper";

const { confirm } = Modal;

const Platform: React.FC = () => {
    const { platformStore } = RootStore;
    const navigate = useNavigate();
    const columns: ITableColumn[] = [
        {
            key: "",
            title: "#",
            width: '5%',
            align: 'center'
        },
        {
            key: "id",
            title: "Platform Key",
            width: '18%',
            align: 'center'
        },
        {
            key: "number",
            title: "Platform No",
            width: '20%',
            render: (number: any) => (
                <div>{`Platform ${number}`}</div>
            )
        },
        {
            key: "description",
            title: "Description",
            width: '33%',
            isTrim: true
        },
        {
            key: "type",
            title: "Display Type",
            width: '17%',
            render: () => (
                <Tag color={"#87d068"}>SINGLE</Tag>
            )
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
        getPlatforms();

        return () => {
            platformStore.page = 0;
            platformStore.searchStr = '';
        }
    }, []);

    const getPlatforms = async () => {
        await PlatformHelper(navigate).GetPlatforms();
    }

    const onChangePage = async (page: number) => {
        platformStore.page = page - 1;
        await PlatformHelper(navigate).GetPlatforms();
    }

    const onChangeSearch = async (event: any) => {
        platformStore.searchStr = event?.target?.value;
    }

    const onSubmitSearch = async (searchStr: string = '') => {
        if (platformStore?.searchStr) {
            if (searchStr === '') {
                platformStore.searchStr = '';
            }
            await PlatformHelper(navigate).GetPlatforms();
        }
    }

    const onDelete = async (id: any) => {
        await PlatformHelper(navigate).DeletePlatform(id);
    }

    const onUpdate = (id: any) => {
        platformStore.setPlatformValues(id);
        navigate(id?.toString());
    }

    const navigateToAdd = () => {
        navigate('add');
        platformStore.resetPostData();
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
                title="Platforms" count={platformStore.size} addBtn addBtnText='Add Platform'
                search onAddClick={navigateToAdd} isLoading={platformStore?.isLoading}
                searchStr={platformStore?.searchStr} onChangeSearch={onChangeSearch}
                onSubmitSearch={onSubmitSearch}
            />
            <CustomTable
                columns={columns} datas={platformStore?.platforms}
                defaultPaginationCurrent={1} paginationCurrent={platformStore?.page}
                paginationTotal={platformStore?.totalItems}
                onPageChange={onChangePage} isLoading={platformStore?.isLoading} />
            <Loader visibility={platformStore?.isLoading} />
        </div>
    </PageTransition>
}

export default observer(Platform);
