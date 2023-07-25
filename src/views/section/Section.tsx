import { Modal, Tag, Tooltip } from "antd";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { Icons } from "../../constant/Icons";
import { CustomTable, Loader, PageTransition, SubHeader } from "../../components";
import { ITableColumn } from "../../interface/IComponent";
import RootStore from "../../mobx-store/RootStore";
import SectionHelper from "../../helpers/SectionHelper";

const { confirm } = Modal;

const Section: React.FC = () => {
    const { sectionStore } = RootStore;
    const navigate = useNavigate();
    const columns: ITableColumn[] = [
        {
            key: "",
            title: "#",
            width: '5%',
            align: 'center'
        },
        {
            key: "sectionName",
            title: "Section Name",
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
        GetSectionss();
    }, []);

    const GetSectionss = async () => {
        await SectionHelper(navigate).GetSections();
    }

    const onDelete = async (id: any) => {
        await SectionHelper(navigate).DeleteSection(id);
    }

    const onUpdate = (id: any) => {
        sectionStore.setSectionValues(id);
        navigate(id?.toString());
    }

    const navigateToAdd = () => {
        navigate('add');
        sectionStore.resetPostData();
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
                title="Sections" count={1} addBtn addBtnText='Add Section'
                search onAddClick={navigateToAdd} isLoading={sectionStore?.isLoading}
            />
            <CustomTable
                columns={columns} datas={sectionStore?.sections}
                defaultPaginationCurrent={1} paginationCurrent={1}
                paginationTotal={1} isLoading={sectionStore?.isLoading} />
            <Loader visibility={sectionStore?.isLoading} />
        </div>
    </PageTransition>
}

export default observer(Section);
