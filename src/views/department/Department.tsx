import { Modal, Tag, Tooltip } from "antd";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { Icons } from "../../constant/Icons";
import { CustomTable, Loader, PageTransition, SubHeader } from "../../components";
import { ITableColumn } from "../../interface/IComponent";
import RootStore from "../../mobx-store/RootStore";
import DepartmentHelper from "../../helpers/DepartmentHelper";

const { confirm } = Modal;

const Department: React.FC = () => {
    const { departmentStore } = RootStore;
    const navigate = useNavigate();
    const columns: ITableColumn[] = [
        {
            key: "",
            title: "#",
            width: '5%',
            align: 'center'
        },
        {
            key: "department",
            title: "Department Name",
            width: '66%',
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
        GetDepartmentss();
    }, []);

    const GetDepartmentss = async () => {
        await DepartmentHelper(navigate).GetDepartments();
    }

    const onDelete = async (id: any) => {
        await DepartmentHelper(navigate).DeleteDepartment(id);
    }

    const onUpdate = (id: any) => {
        departmentStore.setDepartmentValues(id);
        navigate(id?.toString());
    }

    const navigateToAdd = () => {
        navigate('add');
        departmentStore.resetPostData();
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
                title="Departments" count={1} addBtn addBtnText='Add Department'
                search onAddClick={navigateToAdd} isLoading={departmentStore?.isLoading}
            />
            <CustomTable
                columns={columns} datas={departmentStore?.departments}
                defaultPaginationCurrent={1} paginationCurrent={1}
                paginationTotal={1} isLoading={departmentStore?.isLoading} />
            <Loader visibility={departmentStore?.isLoading} />
        </div>
    </PageTransition>
}

export default observer(Department);
