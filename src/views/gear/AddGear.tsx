import { observer } from 'mobx-react-lite';
import { Button, Input, Select } from "antd";
import { useNavigate } from "react-router-dom";
import RootStore from '../../mobx-store/RootStore';
import { PageTransition, FormGroup, Loader } from '../../components';
import GearHelper from '../../helpers/GearHelper';
import { useEffect } from 'react';
import StationHelper from '../../helpers/StationHelper';
import GearTypeHelper from '../../helpers/GearTypeHelper';
import SectionHelper from '../../helpers/SectionHelper';

let isValidForm: boolean = true;
const { Option } = Select;

const AddGear: React.FC = () => {
    const { gearStore, gearTypeStore, stationStore, sectionStore } = RootStore;
    const navigate = useNavigate();

    useEffect(() => {
        getSections();
    }, [])

    const getSections = async () => {
        await SectionHelper(navigate).GetSections();
    }

    const getAll = async () => {
        await StationHelper(navigate).GetStations();
        await GearTypeHelper(navigate).GetGearTypes();
    }

    const onChangeValue = (event: React.ChangeEvent<any>, name: string = '') => {
        event.preventDefault();
        let { value } = event.target;

        if (name === 'name') {
            gearStore.name = value;
        }
        if (!isValidForm) {
            gearStore.isValidCreateGearForm();
        }
    }

    const onChangeSelectValue = (value: any, name: string = '') => {
        if(name === 'sectionId') {
            stationStore.selectedSectionId = value;
            getAll();
        }else if (name === 'stationId') {
            gearStore.stationId = value;
        } else if (name === 'gearTypeId') {
            gearStore.gearTypeId = value;
        }
        if (!isValidForm) {
            gearStore.isValidCreateGearForm();
        }
    }

    const onCreate = async (event: any) => {
        event.preventDefault();
        if (gearStore?.isValidCreateGearForm()) {
            isValidForm = true;
            await GearHelper(navigate).CreateGear();
            gearStore.resetPostData();
            navigate(-1);
        } else {
            isValidForm = false;
        }
    }

    return <PageTransition>
        <form onSubmit={onCreate}>
            <div className="row mb-2">
                <div className="col-4">
                    <div className="col" style={{ fontWeight: '600', fontSize: '18px' }}>
                        <span style={{ color: '#000000' }}>Add New Gear</span>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label='Select Section' labelSpacing='mb-1'
                        error={stationStore?.formCreateStationErrors?.platformId}>
                        <Select placeholder='Select Section' className="custom-input"
                            style={{ width: '100%' }} onChange={(value) => onChangeSelectValue(value, 'sectionId')}>
                            {sectionStore.sections?.map((section, index: any) => {
                                return <Option key={index} value={section?.id}>{section?.sectionName}</Option>
                            })}
                        </Select>
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label='Select Station' labelSpacing='mb-1'
                        error={gearStore?.formCreateGearErrors?.stationId}>
                        <Select placeholder='Select Station' className="custom-input"
                            style={{ width: '100%' }} onChange={(value) => onChangeSelectValue(value, 'stationId')}>
                            {stationStore.stations?.map((station, index: any) => {
                                return <Option key={index} value={station?.id}>{station?.stationName}</Option>
                            })}
                        </Select>
                    </FormGroup>
                </div>
                <div className="col-4">
                    <FormGroup isRequired label='Select Gear Type' labelSpacing='mb-1'
                        error={gearStore?.formCreateGearErrors?.gearTypeId}>
                        <Select placeholder='Select Geat Type' className="custom-input"
                            style={{ width: '100%' }} onChange={(value) => onChangeSelectValue(value, 'gearTypeId')}>
                            {gearTypeStore.gearTypes?.map((gearType, index: any) => {
                                return <Option key={index} value={gearType?.id}>{gearType?.gearType}</Option>
                            })}
                        </Select>
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label='Gear Name' labelSpacing='mb-1' error={gearStore?.formCreateGearErrors?.name}>
                        <Input placeholder="Name" autoComplete="off"
                            onChange={(event) => onChangeValue(event, 'name')} value={gearStore?.name} />
                    </FormGroup>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-4">
                    <Button htmlType='submit' className="custom-btn" type="primary">SAVE</Button>
                </div>
            </div>
            <Loader visibility={gearStore?.isLoading} />
        </form>
    </PageTransition>
}

export default observer(AddGear);
