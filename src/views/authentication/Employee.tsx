import { Modal, Tag, Tooltip } from "antd";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { Icons } from "../../constant/Icons";
import { CustomTable, Loader, PageTransition, SubHeader } from "../../components";
import { ITableColumn } from "../../interface/IComponent";
import RootStore from "../../mobx-store/RootStore";
import AuthHelper from "../../helpers/AuthHelper";

const { confirm } = Modal;

const Employee: React.FC = () => {
    const { authStore } = RootStore;
    const navigate = useNavigate();
    const columns: ITableColumn[] = [
        {
            key: "",
            title: "#",
            width: '5%',
            align: 'center'
        },
        {
            key: "empId",
            title: "Employee Id",
            width: '15%'
        },
        {
            key: "name",
            title: "Employee Name",
            width: '28%'
        },
        {
            key: "phone",
            title: "Mobile No",
            width: '20%'
        },
        {
            key: "email",
            title: "E-mail",
            width: '23%'
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
        await AuthHelper().GetEmployees(navigate);
    }

    const onChangePage = async (page: number) => {
        authStore.page = page - 1;
        await AuthHelper().GetEmployees(navigate);
    }

    const onDelete = async (id: any) => {
        // await AuthHelper().DeleteAdminUser(id);
    }

    const onUpdate = (id: any) => {
        authStore.setEmployeeValues(id);
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
                title="Employees" count={authStore.size} addBtn addBtnText='Create New Employee'
                onAddClick={navigateToAdd} isLoading={authStore?.isLoading}
            />
            <CustomTable columns={columns}
                datas={authStore?.employees}
                defaultPaginationCurrent={1} paginationCurrent={authStore?.page}
                paginationTotal={authStore?.totalItems}
                onPageChange={onChangePage} isLoading={authStore?.isLoading} />
            <Loader visibility={authStore?.isLoading} />
        </div>
    </PageTransition>
}

export default observer(Employee);
