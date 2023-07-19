import { observer } from 'mobx-react-lite';
import { Button, Input, Select, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import RootStore from '../../mobx-store/RootStore';
import { PageTransition, FormGroup, Loader } from '../../components';
import AssignPlatformHelper from '../../helpers/AssignPlatformHelper';
import { useEffect } from 'react';
import PlatformHelper from '../../helpers/PlatformHelper';
import TrainHelper from '../../helpers/TrainHelper';

let isValidForm: boolean = true;
const { Option } = Select;

const UpdateAssignPlatform: React.FC = () => {
    const { platformStore, trainStore, assignPlatformStore } = RootStore;
    const navigate = useNavigate();

    useEffect(() => {
        getAll();

        return () => {
            trainStore.searchStr = '';
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
        } else if (name === 'engineDirection') {
            assignPlatformStore.engineDirection = value;
        }
        if (!isValidForm) {
            assignPlatformStore.isValidCreateAssignPlatformForm();
        }
    }

    const onChangeValue = (event: any, name: string) => {
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

    const onUpdate = async (event: any) => {
        event.preventDefault();
        if (assignPlatformStore?.isValidCreateAssignPlatformForm()) {
            isValidForm = true;
            await AssignPlatformHelper(navigate).UpdateAssignPlatform();
            assignPlatformStore.resetPostData();
            navigate(-1);
        } else {
            isValidForm = false;
        }
    }

    return <PageTransition>
        <form onSubmit={onUpdate}>
            <div className="row mb-2">
                <div className="col-4">
                    <div className="col" style={{ fontWeight: '600', fontSize: '18px' }}>
                        <span style={{ color: '#000000' }}>Update Assign Platform:</span>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label='Platform' labelSpacing='mb-1' error={assignPlatformStore?.formCreateAssignPlatformErrors?.selectedPlatformId}>
                        <Select placeholder="Select Platform" className="custom-input" style={{ width: '100%' }}
                            onChange={(value) => onChangeSelectValue(value, 'platformId')} defaultValue={assignPlatformStore?.platformNumber}
                            showSearch onSearch={(value) => onSearch(value, 'platform')}
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
                        <Select placeholder="Select Train" className="custom-input" style={{ width: '100%' }} defaultValue={assignPlatformStore?.trainNumber}
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
            <div className="row mt-2">
                <div className="col-4">
                    <Button htmlType='submit' className="custom-btn" type="primary">UPDATE</Button>
                </div>
            </div>
            <Loader visibility={assignPlatformStore?.isLoading} />
        </form>
    </PageTransition>
}

export default observer(UpdateAssignPlatform);
