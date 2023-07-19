import { Modal, Tag, Tooltip } from "antd";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { Icons } from "../../constant/Icons";
import { CustomTable, Loader, PageTransition, SubHeader } from "../../components";
import { ITableColumn } from "../../interface/IComponent";
import RootStore from "../../mobx-store/RootStore";
import FlyoverHelper from "../../helpers/FlyoverHelper";
import PlatformHelper from "../../helpers/PlatformHelper";

const { confirm } = Modal;

const Flyover: React.FC = () => {
    const { flyoverStore, platformStore } = RootStore;
    const navigate = useNavigate();
    const columns: ITableColumn[] = [
        {
            key: "",
            title: "#",
            width: '6%'
        },
        {
            key: "id",
            title: "Flyover Key",
            width: '18%',
            align: 'center'
        },
        {
            key: "platformsId",
            title: "Platform Keys",
            width: '20%',
            render: (platformsId: any) => (
                <div>{`[${platformsId}]`}</div>
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
                <Tag color={"#108ee9"}>DUAL</Tag>
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
        getFlyovers();
    }, []);

    const getFlyovers = async () => {
        await PlatformHelper(navigate).GetPlatforms();
        await FlyoverHelper(navigate).GetFlyovers();
    }

    const onChangePage = async (page: number) => {
        flyoverStore.page = page - 1;
        await FlyoverHelper(navigate).GetFlyovers();
    }

    const onChangeSearch = async (event: any) => {
        flyoverStore.searchStr = event?.target?.value;
    }

    const onSubmitSearch = async (searchStr: string = '') => {
        if (flyoverStore?.searchStr) {
            if (searchStr === '') {
                flyoverStore.searchStr = '';
            }
            await FlyoverHelper(navigate).GetFlyovers();
        }
    }

    const onDelete = async (id: any) => {
        await FlyoverHelper(navigate).DeleteFlyover(id);
    }

    const onUpdate = (id: any) => {
        flyoverStore.setFlyoverValues(id);
        navigate(id?.toString());
    }

    const navigateToAdd = () => {
        navigate('add');
        flyoverStore.resetPostData();
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
                title="Flyovers" count={flyoverStore.size} addBtn addBtnText='Add Flyover'
                search onAddClick={navigateToAdd} isLoading={flyoverStore?.isLoading}
                searchStr={flyoverStore?.searchStr} onChangeSearch={onChangeSearch}
                onSubmitSearch={onSubmitSearch}
            />
            <CustomTable
                columns={columns} datas={flyoverStore?.flyovers}
                defaultPaginationCurrent={1} paginationCurrent={flyoverStore?.page}
                paginationTotal={flyoverStore?.totalItems}
                onPageChange={onChangePage} isLoading={flyoverStore?.isLoading} />
            <Loader visibility={flyoverStore?.isLoading} />
        </div>
    </PageTransition>
}

export default observer(Flyover);
