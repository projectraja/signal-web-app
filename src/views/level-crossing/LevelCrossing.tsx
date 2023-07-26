import { Modal, Tag, Tooltip } from "antd";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { Icons } from "../../constant/Icons";
import { CustomTable, Loader, PageTransition, SubHeader } from "../../components";
import { ITableColumn } from "../../interface/IComponent";
import RootStore from "../../mobx-store/RootStore";
import LevelCrossingHelper from "../../helpers/LevelCrossingHelper";

const { confirm } = Modal;

const LevelCrossing: React.FC = () => {
    const { levelCrossingStore } = RootStore;
    const navigate = useNavigate();
    const columns: ITableColumn[] = [
        {
            key: "",
            title: "#",
            width: '6%',
            align: 'center'
        },
        {
            key: "lc",
            title: "Level Crossing",
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
        GetLevelCrossingss();
    }, []);

    const GetLevelCrossingss = async () => {
        await LevelCrossingHelper(navigate).GetLevelCrossings();
    }

    const onDelete = async (id: any) => {
        await LevelCrossingHelper(navigate).DeleteLevelCrossing(id);
    }

    const onUpdate = (id: any) => {
        levelCrossingStore.setLevelCrossingValues(id);
        navigate(id?.toString());
    }

    const navigateToAdd = () => {
        navigate('add');
        levelCrossingStore.resetPostData();
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
                title="Level Crossings" count={1} addBtn addBtnText='Add Level Crossing'
                onAddClick={navigateToAdd} isLoading={levelCrossingStore?.isLoading}
            />
            <CustomTable
                columns={columns} datas={levelCrossingStore?.levelCrossings}
                defaultPaginationCurrent={1} paginationCurrent={1}
                paginationTotal={1} isLoading={levelCrossingStore?.isLoading} />
            <Loader visibility={levelCrossingStore?.isLoading} />
        </div>
    </PageTransition>
}

export default observer(LevelCrossing);
