import { observer } from 'mobx-react-lite';
import { Button, Checkbox, Input, Select, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import RootStore from '../../mobx-store/RootStore';
import { PageTransition, FormGroup, Loader } from '../../components';
import AssignPlatformHelper from '../../helpers/AssignPlatformHelper';
import { useEffect, useState } from 'react';
import PlatformHelper from '../../helpers/PlatformHelper';
import TrainHelper from '../../helpers/TrainHelper';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

let isValidForm: boolean = true;
const { Option } = Select;

const AddAssignPlatform: React.FC = () => {
    const { assignPlatformStore, platformStore, trainStore, displayStore } = RootStore;
    const navigate = useNavigate();
    const [coaches, setCoaches] = useState<any>([]);

    useEffect(() => {
        getAll();

        return () => {
            trainStore.searchStr = '';
            platformStore.searchStr = '';
        }
    }, []);

    const getAll = async () => {
        await PlatformHelper(navigate).GetPlatforms();
        await TrainHelper(navigate).GetTrains();
    }

    const onChangeSelectValue = (value: any, name: string = '') => {
        if (name === 'platformId') {
            assignPlatformStore.selectedPlatformId = value;
        } else if (name === 'trainId') {
            assignPlatformStore.selectedTrainId = value;
            const selectedTain = trainStore.trains.find((train) => train.id === value)?.coaches;
            setCoaches(selectedTain);
        } else if (name === 'engineDirection') {
            assignPlatformStore.engineDirection = value;
        }
        if (!isValidForm) {
            assignPlatformStore.isValidCreateAssignPlatformForm();
        }
    }

    const onChangeValue = (event: any, name: string, index: any = '') => {
        event.preventDefault();
        let { value } = event.target;
        if (name === 'arrivalTime') {
            assignPlatformStore.arrivalTime = value;
        } else if (name === 'departureTime') {
            assignPlatformStore.departureTime = value;
        }
        if (!isValidForm) {
            assignPlatformStore.isValidCreateAssignPlatformForm();
        }
    }

    const onSearch = async (value: string, name: string) => {
        if (name === 'platform') {
            platformStore.searchStr = value;
            await PlatformHelper(navigate).GetPlatforms();
        } else if (name === 'train') {
            trainStore.searchStr = value;
            await TrainHelper(navigate).GetTrains();
        }
    }

    const onChangeCheckbox = (event: CheckboxChangeEvent, name: string = '') => {
        if (name === 'isFocus') {
            // if (event.target?.checked) {
            //     setPlatformOrFlyovers(flyoverStore.flyovers);
            // } else {
            //     setPlatformOrFlyovers(platformStore.platforms);
            // }
            // trainStore.isFlyover = event.target?.checked;
        }
    }

    const onCreate = async (event: any) => {
        event.preventDefault();
        if (assignPlatformStore?.isValidCreateAssignPlatformForm()) {
            isValidForm = true;
            await AssignPlatformHelper(navigate).CreateAssignPlatform();
            assignPlatformStore.resetPostData();
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
                        <span style={{ color: '#000000' }}>Assign New Platform:</span>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label='Platform' labelSpacing='mb-1' error={assignPlatformStore?.formCreateAssignPlatformErrors?.selectedPlatformId}>
                        <Select placeholder="Select Platform" className="custom-input" style={{ width: '100%' }}
                            onChange={(value) => onChangeSelectValue(value, 'platformId')} showSearch onSearch={(value) => onSearch(value, 'platform')}
                            notFoundContent={platformStore.isLoading ? <Spin size="small" /> : 'Not found'} filterOption={false}
                        >
                            {platformStore.platforms?.map((platform: any, index: any) => {
                                return <Option key={index} value={platform?.id}>{`Platform ${platform?.number}`}</Option>
                            })}
                        </Select>
                    </FormGroup>
                </div>
                <div className="col-4">
                    <FormGroup isRequired label='Train' labelSpacing='mb-1' error={assignPlatformStore?.formCreateAssignPlatformErrors?.selectedTrainId}>
                        <Select placeholder="Select Train" className="custom-input" style={{ width: '100%' }}
                            onChange={(value) => onChangeSelectValue(value, 'trainId')} showSearch onSearch={(value) => onSearch(value, 'train')}
                            notFoundContent={trainStore.isLoading ? <Spin size="small" /> : 'Not found'} filterOption={false}
                        >
                            {trainStore.trains?.map((train: any, index: any) => {
                                return <Option key={index} value={train?.id}>{train?.number}</Option>
                            })}
                        </Select>
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label='Arrival Time' labelSpacing='mb-1' error={assignPlatformStore?.formCreateAssignPlatformErrors?.arrivalTime}>
                        <Input placeholder="Arrival Time" style={{ width: '100%' }} value={assignPlatformStore.arrivalTime}
                            onChange={(event) => onChangeValue(event, 'arrivalTime')} />
                    </FormGroup>
                </div>
                <div className="col-4">
                    <FormGroup isRequired label='Departure Time' labelSpacing='mb-1' error={assignPlatformStore?.formCreateAssignPlatformErrors?.departureTime}>
                        <Input placeholder="Departure Time" style={{ width: '100%' }} value={assignPlatformStore.departureTime}
                            onChange={(event) => onChangeValue(event, 'departureTime')} />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label='Engine Direction' labelSpacing='mb-1'>
                        <Select placeholder="Engine Direction" className="custom-input" style={{ width: '100%' }}
                            onChange={(value) => onChangeSelectValue(value, 'engineDirection')} defaultValue={assignPlatformStore.engineDirection}
                        >
                            <Option value='down'>DOWN</Option>
                            <Option value='up'>UP</Option>
                        </Select>
                    </FormGroup>
                </div>
            </div>
            {/* <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label='Coach Position' labelSpacing='mb-1' error={trainStore?.formCreateTrainErrors?.coaches}>
                        <div className="d-flex align-items-center flex-wrap">
                            {coaches?.map((coach: any, coachIndex: any) => {
                                return <div key={coachIndex} className="col-12 p-0 d-flex align-items-center">
                                    <div className='col-5'>
                                        <FormGroup label='' labelSpacing='mb-1'>
                                            <Input placeholder="Coach Name..."
                                                value={coach?.coachNumber} autoComplete="off"
                                                onChange={(event) => onChangeValue(event, 'coachNumber', coachIndex)} />
                                        </FormGroup>
                                    </div>
                                    <div className='col-5 mx-2'>
                                        <Select placeholder="Select Device" className="custom-input" style={{ width: '100%' }}
                                            onChange={(value) => onChangeSelectValue(value, 'displayId')}
                                        >
                                            {displayStore.displays?.map((display: any, index: any) => {
                                                return <Option key={index} value={display?.id}>{display?.name}</Option>
                                            })}
                                        </Select>
                                    </div>
                                    <div className="col-2">
                                        <FormGroup>
                                            <Checkbox checked={coach.isFocus} onChange={(event) => onChangeCheckbox(event, 'isFocus')} />
                                        </FormGroup>
                                    </div>
                                </div>
                            })}
                        </div>
                    </FormGroup>
                </div>
            </div> */}
            <div className="row mt-2">
                <div className="col-4">
                    <Button htmlType='submit' className="custom-btn" type="primary">SAVE</Button>
                </div>
            </div>
            <Loader visibility={assignPlatformStore?.isLoading} />
        </form>
    </PageTransition>
}

export default observer(AddAssignPlatform);
