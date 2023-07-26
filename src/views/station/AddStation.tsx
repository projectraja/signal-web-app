import { observer } from 'mobx-react-lite';
import { Button, Input, Select } from "antd";
import { useNavigate } from "react-router-dom";
import RootStore from '../../mobx-store/RootStore';
import { PageTransition, FormGroup, Loader } from '../../components';
import StationHelper from '../../helpers/StationHelper';
import { useEffect } from 'react';
import SectionHelper from '../../helpers/SectionHelper';

let isValidForm: boolean = true;
const { Option } = Select;

const AddStation: React.FC = () => {
    const { stationStore, sectionStore } = RootStore;
    const navigate = useNavigate();

    useEffect(() => {
        getSections();
    }, [])

    const getSections = async () => {
        await SectionHelper(navigate).GetSections();
    }

    const onChangeValue = (event: React.ChangeEvent<any>, name: string = '') => {
        event.preventDefault();
        let { value } = event.target;

        if (name === 'code') {
            stationStore.code = value?.toUpperCase();
        } else if (name === 'name') {
            stationStore.name = value;
        } else if (name === 'sectionId') {
            stationStore.sectionId = value;
        }
        if (!isValidForm) {
            stationStore.isValidCreateStationForm();
        }
    }

    const onChangeSelectValue = (value: any, name: string = '') => {
        if (name === 'sectionId') {
            stationStore.sectionId = value;
        }
        if (!isValidForm) {
            stationStore.isValidCreateStationForm();
        }
    }

    const onCreate = async (event: any) => {
        event.preventDefault();
        if (stationStore?.isValidCreateStationForm()) {
            isValidForm = true;
            await StationHelper(navigate).CreateStation();
            stationStore.resetPostData();
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
                        <span style={{ color: '#000000' }}>Add New Station</span>
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
                                return <Option key={index} value={1}>{section?.sectionName}</Option>
                            })}
                        </Select>
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label='Station Code' labelSpacing='mb-1' error={stationStore?.formCreateStationErrors?.code}>
                        <Input placeholder="MDU" autoComplete="off"
                            onChange={(event) => onChangeValue(event, 'code')} value={stationStore?.code} />
                    </FormGroup>
                </div>
                <div className="col-4">
                    <FormGroup isRequired label='Station Name' labelSpacing='mb-1' error={stationStore?.formCreateStationErrors?.name}>
                        <Input placeholder="Name" autoComplete="off"
                            onChange={(event) => onChangeValue(event, 'name')} value={stationStore?.name} />
                    </FormGroup>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-4">
                    <Button htmlType='submit' className="custom-btn" type="primary">SAVE</Button>
                </div>
            </div>
            <Loader visibility={stationStore?.isLoading} />
        </form>
    </PageTransition>
}

export default observer(AddStation);
