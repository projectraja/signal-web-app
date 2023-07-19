import { observer } from 'mobx-react-lite';
import { Button, Checkbox, Input, Select, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import RootStore from '../../mobx-store/RootStore';
import { PageTransition, FormGroup, Loader } from '../../components';
import DisplayHelper from '../../helpers/DisplayHelper';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useEffect, useState } from 'react';
import PlatformHelper from '../../helpers/PlatformHelper';
import FlyoverHelper from '../../helpers/FlyoverHelper';
import StationHelper from '../../helpers/StationHelper';

let isValidForm: boolean = true;
const { Option } = Select;

const AddDisplay: React.FC = () => {
    const { displayStore, platformStore, flyoverStore, authStore, stationStore } = RootStore;
    const navigate = useNavigate();
    const [platformOrFlyovers, setPlatformOrFlyovers]: any = useState([]);

    useEffect(() => {
        getAll();
    }, [])

    const getAll = async () => {
        await PlatformHelper(navigate).GetPlatforms();
        await FlyoverHelper(navigate).GetFlyovers();
        setPlatformOrFlyovers(platformStore.platforms);
    }

    const onChangeValue = (event: React.ChangeEvent<any>, name: string = '') => {
        event.preventDefault();
        let { value } = event.target;

        if (name === 'name') {
            displayStore.name = value;
        }
        if (!isValidForm) {
            displayStore.isValidCreateDisplayForm();
        }
    }

    const onChangeCheckbox = (event: CheckboxChangeEvent, name: string = '') => {
        if (name === 'isFlyover') {
            if (event.target?.checked) {
                setPlatformOrFlyovers(flyoverStore.flyovers);
            } else {
                setPlatformOrFlyovers(platformStore.platforms);
            }
            displayStore.isFlyover = event.target?.checked;
        }
    }

    const onChangeSelectValue = (value: any, name: string = '') => {
        if (name === 'platformId') {
            displayStore.platformId = value;
        }
        if (!isValidForm) {
            displayStore.isValidCreateDisplayForm();
        }
    }

    const onCreate = async (event: any) => {
        event.preventDefault();
        if (displayStore?.isValidCreateDisplayForm()) {
            isValidForm = true;
            await DisplayHelper(navigate).CreateDisplay();
            displayStore.resetPostData();
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
                        <span style={{ color: '#000000' }}>Add New Display:</span>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label='Display Name' labelSpacing='mb-1' error={displayStore?.formCreateDisplayErrors?.name}>
                        <Input placeholder="Display Name" type='text'
                            onChange={(event) => onChangeValue(event, 'name')} value={displayStore?.name} autoComplete="off" />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup>
                        <Checkbox checked={displayStore.isFlyover} onChange={(event) => onChangeCheckbox(event, 'isFlyover')}>Is Flyover</Checkbox>
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label={`${displayStore.isFlyover ? 'Flyover' : 'Platform'} Id`} labelSpacing='mb-1'
                        error={displayStore?.formCreateDisplayErrors?.platformId}>
                        <Select placeholder={`Select ${displayStore.isFlyover ? 'Flyover' : 'Platform'} Id`} className="custom-input"
                            style={{ width: '100%' }} onChange={(value) => onChangeSelectValue(value, 'platformId')}>
                            {platformOrFlyovers?.map((platformOrFly: any, index: any) => {
                                return <Option key={index} value={platformOrFly?.id}>{`Platform ${platformOrFly?.number}`}</Option>
                            })}
                        </Select>
                    </FormGroup>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-4">
                    <Button htmlType='submit' className="custom-btn" type="primary">SAVE</Button>
                </div>
            </div>
            <Loader visibility={displayStore?.isLoading} />
        </form>
    </PageTransition>
}

export default observer(AddDisplay);
