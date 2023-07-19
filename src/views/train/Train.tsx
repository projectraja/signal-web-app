import { Modal, Tooltip } from "antd";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { Icons } from "../../constant/Icons";
import { CustomTable, Loader, PageTransition, SubHeader } from "../../components";
import { ITableColumn } from "../../interface/IComponent";
import RootStore from "../../mobx-store/RootStore";
import TrainHelper from "../../helpers/TrainHelper";

const { confirm } = Modal;

const Train: React.FC = () => {
    let { trainStore } = RootStore;
    const navigate = useNavigate();
    const columns: ITableColumn[] = [
        {
            key: "",
            title: "#",
            width: '6%'
        },
        {
            key: "number",
            title: "Train No",
            width: '17%'
        },
        {
            key: "trainName",
            title: "Name",
            width: '43%',
            isTrim: true,
            render: (trainName: any) => {
                return <div>{trainName[0]?.trainName || ''}</div>
            }
        },
        {
            key: "type",
            title: "Type",
            width: '20%',
            render: (type: any) => {
                let name = '';
                let typeId = parseInt(type)
                if (typeId === 1) {
                    name = 'SF Express';
                } else if (typeId === 2) {
                    name = 'Intercity Express';
                } else if (typeId === 3) {
                    name = 'Express'
                }
                return <div>{name}</div>
            }
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
        getAll();

        return () => {
            trainStore.page = 0;
            trainStore.searchStr = '';
        }
    }, []);

    const getAll = async () => {
        await TrainHelper(navigate).GetTrains();
    }

    const onChangePage = async (page: number) => {
        trainStore.page = page - 1;
        await TrainHelper(navigate).GetTrains();
    }

    const onChangeSearch = async (event: any) => {
        trainStore.searchStr = event?.target?.value;
    }

    const onSubmitSearch = async (searchStr: string = '') => {
        if (trainStore?.searchStr) {
            if (searchStr === '') {
                trainStore.searchStr = '';
            }
            await TrainHelper(navigate).GetTrains();
        }
    }

    const onDelete = async (id: any) => {
        await TrainHelper(navigate).DeleteTrain(id);
    }

    const onUpdate = (id: any) => {
        trainStore.setTrainValues(id);
        navigate(id?.toString());
    }

    const navigateToAdd = () => {
        navigate('add');
        trainStore.resetPostData();
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
                title="Trains" count={trainStore.size} addBtn addBtnText='Add Train'
                search onAddClick={navigateToAdd} isLoading={trainStore?.isLoading}
                searchStr={trainStore?.searchStr} onChangeSearch={onChangeSearch}
                onSubmitSearch={onSubmitSearch}
            />
            <CustomTable
                columns={columns} datas={trainStore?.trains}
                defaultPaginationCurrent={1} paginationCurrent={trainStore?.page}
                paginationTotal={trainStore?.totalItems}
                onPageChange={onChangePage} isLoading={trainStore?.isLoading} />
            <Loader visibility={trainStore?.isLoading} />
        </div>
    </PageTransition>
}

export default observer(Train);
