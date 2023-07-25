import { Modal, Tooltip } from "antd";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { Icons } from "../../constant/Icons";
import { CustomTable, Loader, PageTransition, SubHeader } from "../../components";
import { ITableColumn } from "../../interface/IComponent";
import RootStore from "../../mobx-store/RootStore";
import StationHelper from "../../helpers/StationHelper";
import SectionHelper from "../../helpers/SectionHelper";

const { confirm } = Modal;

const Station: React.FC = () => {
    const { stationStore, sectionStore } = RootStore;
    const navigate = useNavigate();
    const columns: ITableColumn[] = [
        {
            key: "",
            title: "#",
            width: '6%',
            align: 'center'
        },
        {
            key: "stationCode",
            title: "Code",
            width: '15%',
            align: 'center'
        },
        {
            key: "stationName",
            title: "Station Name",
            width: '72%',
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
        },
        // {
        //     key: "id",
        //     title: "Delete",
        //     width: '7%',
        //     render: (id: any) => (
        //         <Tooltip placement="topLeft" title='Delete' arrowPointAtCenter>
        //             <img src={Icons.Delete} alt='ellipsis-vertical' style={{ height: '25px', cursor: 'pointer' }}
        //                 onClick={() => showDelteConfirm(id)} />
        //         </Tooltip>
        //     ),
        // }
    ];

    useEffect(() => {
        GetStations();
    }, []);

    const GetStations = async () => {
        await SectionHelper(navigate).GetSections();
        if (sectionStore.sections?.length > 0) {
            stationStore.selectedSectionId = sectionStore.sections[0]?.id;
            await StationHelper(navigate).GetStations();
        }
    }

    const onChangePage = async (page: number) => {
        stationStore.page = page - 1;
        await StationHelper(navigate).GetStations();
    }

    const onChangeSearch = async (event: any) => {
        stationStore.searchStr = event?.target?.value;
    }

    const onChangeSection = async (value: any) => {
        console.log(value)
        stationStore.selectedSectionId = value;
        await StationHelper(navigate).GetStations();
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

    return <PageTransition>
        <div>
            <SubHeader
                title="Stations" count={stationStore.size} addBtn addBtnText='Add Station'
                dropdown dropdownText="Section" dropdownList={sectionStore.sections || []} dropdownValue={stationStore.selectedSectionId}
                dropdownKey={'id'} dropdownLabel={'sectionName'} onChangeDropdown={onChangeSection}
                onAddClick={navigateToAdd} isLoading={stationStore?.isLoading}
                searchStr={stationStore?.searchStr} onChangeSearch={onChangeSearch}
                onSubmitSearch={onSubmitSearch}
            />
            <CustomTable
                columns={columns} datas={stationStore?.stations}
                defaultPaginationCurrent={1} paginationCurrent={stationStore?.page}
                paginationTotal={stationStore?.totalItems}
                onPageChange={onChangePage} isLoading={stationStore?.isLoading} />
            <Loader visibility={stationStore?.isLoading} />
        </div>
    </PageTransition>
}

export default observer(Station);
