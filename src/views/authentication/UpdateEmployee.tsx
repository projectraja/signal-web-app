import { observer } from 'mobx-react-lite';
import { Button, Input, Select } from "antd";
import { useNavigate } from "react-router-dom";
import RootStore from '../../mobx-store/RootStore';
import { PageTransition, FormGroup, Loader } from '../../components';
import AuthHelper from '../../helpers/AuthHelper';
import { useEffect } from 'react';

let isValidForm: boolean = true;
const { Option } = Select;

const UpdateEmployee: React.FC = () => {
    const { authStore, stationStore } = RootStore;
    const navigate = useNavigate();

    useEffect(() => {
        getAll();

        return () => {
            stationStore.searchStr = '';
        }
    }, []);

    const getAll = async () => {
        await AuthHelper().GetRoles(navigate);
    }

    const onChangeValue = (event: any, name: string) => {
        event.preventDefault();
        let { value } = event.target;
        if (name === 'name') {
            authStore.userName = value;
        } else if (name === 'empId') {
            authStore.userEmpId = value;
        }else if (name === 'phone') {
            authStore.userMobile = value;
        }else if (name === 'email') {
            authStore.userMail = value;
        } else if (name === 'password') {
            authStore.userPassword = value;
        } else if (name === 'confirmPassword') {
            authStore.userConfirmPassword = value;
        }
        if (!isValidForm) {
            authStore.isValidEmployeeRegistrationForm();
        }
    }

    const onChangeSelectValue = (value: any, name: string = '') => {
        if (name === 'roleId') {
            authStore.userRoleId = value;
        }
        if (!isValidForm) {
            authStore.isValidEmployeeRegistrationForm();
        }
    }

    const onUpdate = async (event: any) => {
        event.preventDefault();
        if (authStore?.isValidEmployeeRegistrationForm()) {
            isValidForm = true;
            await AuthHelper().UpdateEmployee(navigate);
            authStore.resetLoginPostData();
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
                        <span style={{ color: '#000000' }}>Update Employee:</span>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label='Role' labelSpacing='mb-1' error={authStore?.formEmployeeRegistrationErrors?.userRoleId}>
                        <Select placeholder="Select Role" className="custom-input" style={{ width: '100%' }}
                            onChange={(value) => onChangeSelectValue(value, 'roleId')}>
                            {authStore.roles?.map((role: any, index: any) => {
                                return <Option key={index} value={role?.id}>{role?.roleName}</Option>
                            })}
                        </Select>
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label='Name' labelSpacing='mb-1' error={authStore?.formEmployeeRegistrationErrors?.userName}>
                        <Input placeholder="Name" style={{ width: '100%' }} value={authStore.userName}
                            onChange={(event) => onChangeValue(event, 'name')} />
                    </FormGroup>
                </div>
                <div className="col-4">
                    <FormGroup isRequired label='Employee Id' labelSpacing='mb-1' error={authStore?.formEmployeeRegistrationErrors?.userEmpId}>
                        <Input placeholder="Employee Id" style={{ width: '100%' }} value={authStore.userEmpId}
                            onChange={(event) => onChangeValue(event, 'empId')} />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label='Phone' labelSpacing='mb-1' error={authStore?.formEmployeeRegistrationErrors?.userMobile}>
                        <Input type='tel' placeholder="Phone" style={{ width: '100%' }} value={authStore.userMobile}
                            onChange={(event) => onChangeValue(event, 'phone')} />
                    </FormGroup>
                </div>
                <div className="col-4">
                    <FormGroup isRequired label='Email' labelSpacing='mb-1' error={authStore?.formEmployeeRegistrationErrors?.userMail}>
                        <Input type='email' placeholder="Email" style={{ width: '100%' }} value={authStore.userMail}
                            onChange={(event) => onChangeValue(event, 'email')} />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label='Password' labelSpacing='mb-1' error={authStore?.formEmployeeRegistrationErrors?.userPassword}>
                        <Input placeholder="Password" style={{ width: '100%' }} value={authStore.userPassword}
                            onChange={(event) => onChangeValue(event, 'password')} />
                    </FormGroup>
                </div>
                <div className="col-4">
                    <FormGroup isRequired label='Confirm Password' labelSpacing='mb-1' error={authStore?.formEmployeeRegistrationErrors?.userConfirmPassword}>
                        <Input placeholder="Confirm Password" style={{ width: '100%' }} value={authStore.userConfirmPassword}
                            onChange={(event) => onChangeValue(event, 'confirmPassword')} />
                    </FormGroup>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-4">
                    <Button htmlType='submit' className="custom-btn" type="primary">UPDATE</Button>
                </div>
            </div>
            <Loader visibility={authStore?.isLoading} />
        </form>
    </PageTransition>
}

export default observer(UpdateEmployee);
