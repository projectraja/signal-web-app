import { Modal, Tag, Tooltip } from "antd";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { Icons } from "../../constant/Icons";
import { CustomTable, Loader, PageTransition, SubHeader } from "../../components";
import { ITableColumn } from "../../interface/IComponent";
import RootStore from "../../mobx-store/RootStore";
import AssignPlatformHelper from "../../helpers/AssignPlatformHelper";

const { confirm } = Modal;

const AssignPlatform: React.FC = () => {
    const { assignPlatformStore } = RootStore;
    const navigate = useNavigate();
    const columns: ITableColumn[] = [
        {
            key: "",
            title: "#",
            width: '5%',
            align: 'center'
        },
        {
            key: "platformNumber",
            title: "Platform No",
            width: '20%',
            render: (platformNumber: any) => (
                <div>{`Platform ${platformNumber}`}</div>
            )
        },
        {
            key: "trainNumber",
            title: "Train No",
            width: '22%'
        },
        {
            key: "arrivalTime",
            title: "ARR Time",
            width: '14%'
        },
        {
            key: "departureTime",
            title: "DEP Time",
            width: '14%'
        },
        {
            key: "engineDirection",
            title: "Eng Direction",
            width: '19%',
            render: (engineDirection: any) => (
                <Tag color={engineDirection === 'down' ? "#87d068" : "#108ee9"}>{engineDirection?.toUpperCase()}</Tag>
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
        getAll();
    }, []);

    const getAll = async () => {
        await AssignPlatformHelper(navigate).GetAssignPlatforms();
    }

    const onChangePage = async (page: number) => {
        assignPlatformStore.page = page - 1;
        await AssignPlatformHelper(navigate).GetAssignPlatforms();
    }

    const onDelete = async (id: any) => {
        await AssignPlatformHelper(navigate).DeleteAssignPlatform(id);
    }

    const onUpdate = (id: any) => {
        assignPlatformStore.setAssignPlatformValues(id);
        navigate(id?.toString());
    }

    const navigateToAdd = () => {
        navigate('add');
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
                title="Platform Assessment" count={assignPlatformStore.size} addBtn addBtnText='Assign New Platform'
                onAddClick={navigateToAdd} isLoading={assignPlatformStore?.isLoading}
            />
            <CustomTable columns={columns}
                datas={assignPlatformStore?.assignPlatforms}
                defaultPaginationCurrent={1} paginationCurrent={assignPlatformStore?.page}
                paginationTotal={assignPlatformStore?.totalItems}
                onPageChange={onChangePage} isLoading={assignPlatformStore?.isLoading} />
            <Loader visibility={assignPlatformStore?.isLoading} />
        </div>
    </PageTransition>
}

export default observer(AssignPlatform);
