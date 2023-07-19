import { observer } from 'mobx-react-lite';
import { Button, Input, Select, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import RootStore from '../../mobx-store/RootStore';
import { PageTransition, FormGroup, Loader } from '../../components';
import AuthHelper from '../../helpers/AuthHelper';
import StationHelper from '../../helpers/StationHelper';
import { useEffect } from 'react';

let isValidForm: boolean = true;
const { Option } = Select;

const AddAdmin: React.FC = () => {
    const { authStore, stationStore } = RootStore;
    const navigate = useNavigate();

    useEffect(() => {
        getAll();

        return () => {
            stationStore.searchStr = '';
        }
    }, []);

    const getAll = async () => {
        await StationHelper(navigate).GetStations();
    }

    const onChangeValue = (event: any, name: string) => {
        event.preventDefault();
        let { value } = event.target;
        if (name === 'name') {
            authStore.adminName = value;
        } else if (name === 'empId') {
            authStore.adminEmpId = value;
        } else if (name === 'password') {
            authStore.adminPassword = value;
        } else if (name === 'confirmPassword') {
            authStore.adminConfirmPassword = value;
        }
        if (!isValidForm) {
            authStore.isValidAdminRegistrationForm();
        }
    }

    const onChangeSelectValue = (value: any, name: string = '') => {
        if (name === 'stationId') {
            authStore.adminStationId = value;
        }
        if (!isValidForm) {
            authStore.isValidAdminRegistrationForm();
        }
    }

    const onSearch = async (value: string, name: string) => {
        if (name === 'station') {
            stationStore.searchStr = value;
            await StationHelper(navigate).GetStations();
        }
    }

    const onCreate = async (event: any) => {
        event.preventDefault();
        if (authStore?.isValidAdminRegistrationForm()) {
            isValidForm = true;
            await AuthHelper().AddAdmin(navigate);
            authStore.resetLoginPostData();
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
                        <span style={{ color: '#000000' }}>Create New Admin:</span>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label='Name' labelSpacing='mb-1' error={authStore?.formRegistrationErrors?.adminName}>
                        <Input placeholder="Name" style={{ width: '100%' }} value={authStore.adminName}
                            onChange={(event) => onChangeValue(event, 'name')} />
                    </FormGroup>
                </div>
                <div className="col-4">
                    <FormGroup isRequired label='Employee Id' labelSpacing='mb-1' error={authStore?.formRegistrationErrors?.adminEmpId}>
                        <Input placeholder="Employee Id" style={{ width: '100%' }} value={authStore.adminEmpId}
                            onChange={(event) => onChangeValue(event, 'empId')} />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label='Password' labelSpacing='mb-1' error={authStore?.formRegistrationErrors?.adminPassword}>
                        <Input placeholder="Password" style={{ width: '100%' }} value={authStore.adminPassword}
                            onChange={(event) => onChangeValue(event, 'password')} />
                    </FormGroup>
                </div>
                <div className="col-4">
                    <FormGroup isRequired label='Confirm Password' labelSpacing='mb-1' error={authStore?.formRegistrationErrors?.adminConfirmPassword}>
                        <Input placeholder="Confirm Password" style={{ width: '100%' }} value={authStore.adminConfirmPassword}
                            onChange={(event) => onChangeValue(event, 'confirmPassword')} />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label='Station Code' labelSpacing='mb-1' error={authStore?.formRegistrationErrors?.adminStationId}>
                        <Select placeholder="Select Station" className="custom-input" style={{ width: '100%' }}
                            onChange={(value) => onChangeSelectValue(value, 'stationId')} showSearch onSearch={(value) => onSearch(value, 'station')}
                            notFoundContent={authStore.isLoading ? <Spin size="small" /> : 'Not found'} filterOption={false}
                        >
                            {stationStore.stations?.map((station: any, index: any) => {
                                return <Option key={index} value={station?.id}>{station?.code}</Option>
                            })}
                        </Select>
                    </FormGroup>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-4">
                    <Button htmlType='submit' className="custom-btn" type="primary">SAVE</Button>
                </div>
            </div>
            <Loader visibility={authStore?.isLoading} />
        </form>
    </PageTransition>
}

export default observer(AddAdmin);
