import { Modal, Tag, Tooltip } from "antd";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { Icons } from "../../constant/Icons";
import { CustomTable, Loader, PageTransition, SubHeader } from "../../components";
import { ITableColumn } from "../../interface/IComponent";
import RootStore from "../../mobx-store/RootStore";
import AdvertisementHelper from "../../helpers/AdvertisementHelper";
import FunctionUtil from "../../utils/Function-Util";
import Endpoints from "../../services/Endpoints";

const { confirm } = Modal;

const Advertisement: React.FC = () => {
    const { advertisementStore } = RootStore;
    const navigate = useNavigate();
    const columns: ITableColumn[] = [
        {
            key: "",
            title: "#",
            width: '6%',
            align: 'center'
        },
        {
            key: "title",
            title: "Title",
            width: '30%'
        },
        {
            key: "videoPath",
            title: "Video",
            width: '35%',
            render:(videoPath:any)=>(
                <Tooltip placement='leftTop' title='Click to see the video' arrowPointAtCenter>
                <div role='button' className="p-0 custom-link-btn text-ellipsis"
                    onClick={() => FunctionUtil.openURL(`${Endpoints.BaseURL}/${videoPath}`)}>{videoPath}</div>
            </Tooltip>
            )
        },
        {
            key: "isActive",
            title: "Status",
            width: '15%',
            render: (isActive: any) => (
                <Tag color={isActive ? '#87d068' : '#f50'}>{isActive ? 'ACTIVE' : 'INACTIVE'}</Tag>
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
    }, []);

    const getPlatforms = async () => {
        await AdvertisementHelper(navigate).GetAds();
    }

    const onChangePage = async (page: number) => {
        advertisementStore.page = page - 1;
        await AdvertisementHelper(navigate).GetAds();
    }

    const onChangeSearch = async (event: any) => {
        advertisementStore.searchStr = event?.target?.value;
    }

    const onSubmitSearch = async (searchStr: string = '') => {
        if (advertisementStore?.searchStr) {
            if (searchStr === '') {
                advertisementStore.searchStr = '';
            }
            await AdvertisementHelper(navigate).GetAds();
        }
    }

    const onDelete = async (id: any) => {
        await AdvertisementHelper(navigate).DeleteAd(id);
    }

    const onUpdate = (id: any) => {
        advertisementStore.setAdverisementValues(id);
        navigate(id?.toString());
    }

    const navigateToAdd = () => {
        navigate('add');
        advertisementStore.resetPostData();
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
                title="Advertisements" count={advertisementStore.size} addBtn addBtnText='Add New Ad'
                search onAddClick={navigateToAdd} isLoading={advertisementStore?.isLoading}
                searchStr={advertisementStore?.searchStr} onChangeSearch={onChangeSearch}
                onSubmitSearch={onSubmitSearch}
            />
            <CustomTable
                columns={columns} datas={advertisementStore?.advertisements}
                defaultPaginationCurrent={1} paginationCurrent={advertisementStore?.page}
                paginationTotal={advertisementStore?.totalItems}
                onPageChange={onChangePage} isLoading={advertisementStore?.isLoading} />
            <Loader visibility={advertisementStore?.isLoading} />
        </div>
    </PageTransition>
}

export default observer(Advertisement);
