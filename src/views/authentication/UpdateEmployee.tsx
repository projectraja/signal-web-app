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
            authStore.resetEmployeeCreatePostData();
        }
    }, []);

    const getAll = async () => {
        await AuthHelper().GetDesignations(navigate);
    }

    const onChangeValue = (event: any, name: string) => {
        event.preventDefault();
        let { value } = event.target;
        if (name === 'name') {
            authStore.employeeName = value;
        } else if (name === 'empId') {
            authStore.employeeId = value;
        }else if (name === 'phone') {
            authStore.employeeMobile = value;
        }else if (name === 'email') {
            authStore.employeeMail = value;
        }
        if (!isValidForm) {
            authStore.isValidEmployeeRegistrationForm();
        }
    }

    const onChangeSelectValue = (value: any, name: string = '') => {
        if(name === 'designationId') {
            authStore.employeeDesignationId = value;
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
            authStore.resetEmployeeCreatePostData();
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
                    <FormGroup isRequired label='Designation' labelSpacing='mb-1' error={authStore?.formEmployeeRegistrationErrors?.employeeDesignationId}>
                        <Select placeholder="Select Designation" className="custom-input" style={{ width: '100%' }}
                            onChange={(value) => onChangeSelectValue(value, 'designationId')} defaultValue={authStore?.employeeDesignationId}>
                            {authStore.designations?.map((designation, index: any) => {
                                return <Option key={index} value={designation?.id}>{designation?.designation}</Option>
                            })}
                        </Select>
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label='Name' labelSpacing='mb-1' error={authStore?.formEmployeeRegistrationErrors?.employeeName}>
                        <Input placeholder="Name" style={{ width: '100%' }} value={authStore.employeeName}
                            onChange={(event) => onChangeValue(event, 'name')} />
                    </FormGroup>
                </div>
                <div className="col-4">
                    <FormGroup isRequired label='Employee Id' labelSpacing='mb-1' error={authStore?.formEmployeeRegistrationErrors?.employeeId}>
                        <Input placeholder="Employee Id" style={{ width: '100%' }} value={authStore.employeeId}
                            onChange={(event) => onChangeValue(event, 'empId')} />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label='Phone' labelSpacing='mb-1' error={authStore?.formEmployeeRegistrationErrors?.employeeMobile}>
                        <Input type='tel' placeholder="Phone" style={{ width: '100%' }} value={authStore.employeeMobile}
                            onChange={(event) => onChangeValue(event, 'phone')} />
                    </FormGroup>
                </div>
                <div className="col-4">
                    <FormGroup isRequired label='Email' labelSpacing='mb-1' error={authStore?.formEmployeeRegistrationErrors?.employeeMail}>
                        <Input type='email' placeholder="Email" style={{ width: '100%' }} value={authStore.employeeMail}
                            onChange={(event) => onChangeValue(event, 'email')} />
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
