import { Modal, Tag, Tooltip } from "antd";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { CustomTable, Loader, PageTransition, SubHeader } from "../../components";
import { ITableColumn } from "../../interface/IComponent";
import RootStore from "../../mobx-store/RootStore";
import DisplayHelper from "../../helpers/DisplayHelper";
import { Icons } from "../../constant/Icons";

const { confirm } = Modal;

const Display: React.FC = () => {
    const { displayStore } = RootStore;
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
            width: '12%',
            isTrim: true
        },
        {
            key: "deviceId",
            title: "Device Id",
            width: '15%',
            isTrim: true
        },
        {
            key: "userId",
            title: "Login Id",
            width: '12%',
        },
        {
            key: "password",
            title: "Password",
            width: '12%',
        },
        {
            key: "isFlyover",
            title: "Is Flyover",
            width: '7%',
            render: (isFlyover: any) => (
                <Tag color={isFlyover ? "#10e92b" : "#108ee9"}>{isFlyover ? 'YES' : 'NO'}</Tag>
            )
        },
        {
            key: "platformId",
            title: "Platform Key",
            width: '8%',
            align: 'center'
        },
        {
            key: "isOnline",
            title: "Status",
            width: '11%',
            align: 'center',
            render: (isOnline: any) => (
                <Tag color={isOnline ? "#87d068" : "#e91056"}>{isOnline ? 'ONLINE' : 'OFFLINE'}</Tag>
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
        getDisplays();

        return () => {
            displayStore.page = 0;
            displayStore.searchStr = '';
        }
    }, []);

    const getDisplays = async () => {
        await DisplayHelper(navigate).GetDisplays();
    }

    const onChangePage = async (page: number) => {
        displayStore.page = page - 1;
        await DisplayHelper(navigate).GetDisplays();
    }

    const onChangeSearch = async (event: any) => {
        displayStore.searchStr = event?.target?.value;
    }

    const onSubmitSearch = async (searchStr: string = '') => {
        if (displayStore?.searchStr) {
            if (searchStr === '') {
                displayStore.searchStr = '';
            }
            await DisplayHelper(navigate).GetDisplays();
        }
    }

    const onDelete = async (id: any) => {
        await DisplayHelper(navigate).DeleteDisplay(id);
    }

    const onUpdate = (id: any) => {
        displayStore.setDisplayValues(id);
        navigate(id?.toString());
    }

    const navigateToAdd = () => {
        navigate('add');
        displayStore.resetPostData();
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
                title="Displays" count={displayStore.size} addBtn addBtnText='Add Display'
                search onAddClick={navigateToAdd} isLoading={displayStore?.isLoading}
                searchStr={displayStore?.searchStr} onChangeSearch={onChangeSearch}
                onSubmitSearch={onSubmitSearch}
            />
            <CustomTable
                columns={columns} datas={displayStore?.displays}
                defaultPaginationCurrent={1} paginationCurrent={displayStore?.page}
                paginationTotal={displayStore?.totalItems}
                onPageChange={onChangePage} isLoading={displayStore?.isLoading} />
            <Loader visibility={displayStore?.isLoading} />
        </div>
    </PageTransition>
}

export default observer(Display);
