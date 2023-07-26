import { Modal, Tag, Tooltip } from "antd";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { Icons } from "../../constant/Icons";
import { CustomTable, Loader, PageTransition, SubHeader } from "../../components";
import { ITableColumn } from "../../interface/IComponent";
import RootStore from "../../mobx-store/RootStore";
import GearHelper from "../../helpers/GearHelper";
import GearTypeHelper from "../../helpers/GearTypeHelper";

const { confirm } = Modal;

const Gear: React.FC = () => {
    const { gearStore, gearTypeStore } = RootStore;
    const navigate = useNavigate();
    const columns: ITableColumn[] = [
        {
            key: "",
            title: "#",
            width: '6%',
            align: 'center'
        },
        {
            key: "gear",
            title: "Gear",
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
        GetGearss();
    }, []);

    const GetGearss = async () => {
        await GearTypeHelper(navigate).GetGearTypes();
        if (gearTypeStore.gearTypes?.length > 0) {
            gearStore.selectedGearTypeId = gearTypeStore.gearTypes[0]?.id;
            await GearHelper(navigate).GetGears();
        }
    }

    const onChangeSection = async (value: any) => {
        console.log(value)
        gearStore.selectedGearTypeId = value;
        await GearHelper(navigate).GetGears();
    }

    const onUpdate = (id: any) => {
        gearStore.setGearValues(id);
        navigate(id?.toString());
    }

    const navigateToAdd = () => {
        navigate('add');
        gearStore.resetPostData();
    }

    return <PageTransition>
        <div>
            <SubHeader
                title="Gears" count={1} addBtn addBtnText='Add New Gear'
                onAddClick={navigateToAdd} isLoading={gearStore?.isLoading}
                dropdown dropdownText="Gear Type" dropdownList={gearTypeStore.gearTypes || []}
                dropdownValue={gearStore.selectedGearTypeId}
                dropdownKey={'id'} dropdownLabel={'gearType'} onChangeDropdown={onChangeSection}
            />
            <CustomTable
                columns={columns} datas={gearStore?.gears}
                defaultPaginationCurrent={1} paginationCurrent={1}
                paginationTotal={1} isLoading={gearStore?.isLoading} />
            <Loader visibility={gearStore?.isLoading} />
        </div>
    </PageTransition>
}

export default observer(Gear);
