import { Modal, Tag, Tooltip } from "antd";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { Icons } from "../../constant/Icons";
import { CustomTable, Loader, PageTransition, SubHeader } from "../../components";
import { ITableColumn } from "../../interface/IComponent";
import RootStore from "../../mobx-store/RootStore";
import GearTypeHelper from "../../helpers/GearTypeHelper";

const { confirm } = Modal;

const GearType: React.FC = () => {
    const { gearTypeStore } = RootStore;
    const navigate = useNavigate();
    const columns: ITableColumn[] = [
        {
            key: "",
            title: "#",
            width: '6%',
            align: 'center'
        },
        {
            key: "gearType",
            title: "Gear Type",
            width: '72%',
            isTrim: true
        },
        {
            key: "isActive",
            title: "Status",
            width: '15%',
            render: (isActive: any) => (
                <Tag color={isActive ? "#10e92b" : "#108ee9"}>{isActive ? 'Active' : 'InActive'}</Tag>
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
        }
        // , {
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
        GetGearTypess();
    }, []);

    const GetGearTypess = async () => {
        await GearTypeHelper(navigate).GetGearTypes();
    }

    const onDelete = async (id: any) => {
        await GearTypeHelper(navigate).DeleteGearType(id);
    }

    const onUpdate = (id: any) => {
        gearTypeStore.setGearTypeValues(id);
        navigate(id?.toString());
    }

    const navigateToAdd = () => {
        navigate('add');
        gearTypeStore.resetPostData();
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
                title="Gear Types" count={1} addBtn addBtnText='Add Gear Type'
                onAddClick={navigateToAdd} isLoading={gearTypeStore?.isLoading}
            />
            <CustomTable
                columns={columns} datas={gearTypeStore?.gearTypes}
                defaultPaginationCurrent={1} paginationCurrent={1}
                paginationTotal={1} isLoading={gearTypeStore?.isLoading} />
            <Loader visibility={gearTypeStore?.isLoading} />
        </div>
    </PageTransition>
}

export default observer(GearType);
