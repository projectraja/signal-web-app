import { List, Modal, Tag, Tooltip, Typography } from "antd";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { Icons } from "../../constant/Icons";
import { CustomTable, Loader, PageTransition, SubHeader } from "../../components";
import { ITableColumn } from "../../interface/IComponent";
import RootStore from "../../mobx-store/RootStore";
import StationHelper from "../../helpers/StationHelper";
import CustomModal from "../../components/CustomModal";

const { confirm } = Modal;

const Station: React.FC = () => {
    const { stationStore } = RootStore;
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
            title: "Station Key",
            width: '12%',
            align: 'center'
        },
        {
            key: "code",
            title: "Code",
            width: '13%',
            align: 'center'
        },
        {
            key: "name",
            title: "Station Name",
            width: '24%',
            isTrim: true
        },
        {
            key: "welcomeNotes",
            title: "Welcome Notes",
            width: '22%',
            isTrim: true
        },
        {
            key: "adContact",
            title: "AD Contact",
            width: '17%'
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
        GetStationss();
    }, []);

    const GetStationss = async () => {
        await StationHelper(navigate).GetStations();
    }

    const onChangePage = async (page: number) => {
        stationStore.page = page - 1;
        await StationHelper(navigate).GetStations();
    }

    const onChangeSearch = async (event: any) => {
        stationStore.searchStr = event?.target?.value;
    }

    const onSubmitSearch = async (searchStr: string = '') => {
        if (stationStore?.searchStr) {
            if (searchStr === '') {
                stationStore.searchStr = '';
            }
            await StationHelper(navigate).GetStations();
        }
    }

    const onDelete = async (id: any) => {
        await StationHelper(navigate).DeleteStation(id);
    }

    const onUpdate = (id: any) => {
        stationStore.setStationValues(id);
        navigate(id?.toString());
    }

    const navigateToAdd = () => {
        navigate('add');
        stationStore.resetPostData();
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

    const onSelectCurrentStation = (currentStationId = 0) => {
        stationStore.id = currentStationId;
    }

    return <PageTransition>
        <div>
            <SubHeader
                title="Stations" count={stationStore.size} addBtn addBtnText='Add Station'
                search onAddClick={navigateToAdd} isLoading={stationStore?.isLoading}
                searchStr={stationStore?.searchStr} onChangeSearch={onChangeSearch}
                onSubmitSearch={onSubmitSearch}
            />
            <CustomTable
                columns={columns} datas={stationStore?.stations}
                defaultPaginationCurrent={1} paginationCurrent={stationStore?.page}
                paginationTotal={stationStore?.totalItems}
                onPageChange={onChangePage} isLoading={stationStore?.isLoading} />
            {stationStore.id === 0 &&
                <CustomModal title="Select Station" isOpen={true}>
                    <small>Please select station to continue</small>
                    <List
                        header={<div className="d-flex mt-2 mb-1" style={{ fontWeight: 'bold' }}>
                            <div className="col-3">Code</div>
                            <div className="col-9">Name</div>
                        </div>}
                        bordered
                        className="mt-2"
                        dataSource={stationStore.stations}
                        renderItem={(station) => (
                            <List.Item onClick={() => onSelectCurrentStation(station?.id)}>
                                <div className="col-3">{station?.code}</div>
                                <div className="col-9">{station?.name}</div>
                            </List.Item>
                        )}
                    />

                </CustomModal>
            }
            <Loader visibility={stationStore?.isLoading} />
        </div>
    </PageTransition>
}

export default observer(Station);
