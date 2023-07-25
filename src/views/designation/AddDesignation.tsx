import { observer } from 'mobx-react-lite';
import { Button, Input, Select } from "antd";
import { useNavigate } from "react-router-dom";
import RootStore from '../../mobx-store/RootStore';
import { PageTransition, FormGroup, Loader } from '../../components';
import DesignationHelper from '../../helpers/DesignationHelper';
import { useEffect } from 'react';
import DepartmentHelper from '../../helpers/DepartmentHelper';
import AuthHelper from '../../helpers/AuthHelper';

let isValidForm: boolean = true;
const { Option } = Select;

const AddDesignation: React.FC = () => {
    const { designationStore, authStore, departmentStore } = RootStore;
    const navigate = useNavigate();

    useEffect(() => {
        getAll();
    }, []);

    const getAll = async () => {
        await AuthHelper().GetRoles(navigate);
        await DepartmentHelper(navigate).GetDepartments();
    }

    const onChangeValue = (event: React.ChangeEvent<any>, name: string = '') => {
        event.preventDefault();
        let { value } = event.target;

        if (name === 'name') {
            designationStore.name = value;
        }
        if (!isValidForm) {
            designationStore.isValidCreateDesignationForm();
        }
    }

    const onChangeSelectValue = (value: any, name: string = '') => {
        if (name === 'departmentId') {
            designationStore.departmentId = value;
        } else if (name === 'roleId') {
            designationStore.roleId = value;
        }
        if (!isValidForm) {
            authStore.isValidEmployeeRegistrationForm();
        }
    }

    const onCreate = async (event: any) => {
        event.preventDefault();
        if (designationStore?.isValidCreateDesignationForm()) {
            isValidForm = true;
            await DesignationHelper(navigate).CreateDesignation();
            designationStore.resetPostData();
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
                        <span style={{ color: '#000000' }}>Add New Designation</span>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label='Department' labelSpacing='mb-1' error={designationStore?.formCreateDesignationErrors?.departmentId}>
                        <Select placeholder="Select Department" className="custom-input" style={{ width: '100%' }}
                            onChange={(value) => onChangeSelectValue(value, 'departmentId')}>
                            {departmentStore.departments?.map((department, index: any) => {
                                return <Option key={index} value={department?.id}>{department?.department}</Option>
                            })}
                        </Select>
                    </FormGroup>
                </div>
                <div className="col-4">
                    <FormGroup isRequired label='Role' labelSpacing='mb-1' error={designationStore?.formCreateDesignationErrors?.roleId}>
                        <Select placeholder="Select Role" className="custom-input" style={{ width: '100%' }}
                            onChange={(value) => onChangeSelectValue(value, 'roleId')}>
                            {authStore.roles?.map((role, index: any) => {
                                return <Option key={index} value={role?.id}>{role?.role}</Option>
                            })}
                        </Select>
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label='Designation Name' labelSpacing='mb-1' error={designationStore?.formCreateDesignationErrors?.name}>
                        <Input placeholder="Name" autoComplete="off"
                            onChange={(event) => onChangeValue(event, 'name')} value={designationStore?.name} />
                    </FormGroup>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-4">
                    <Button htmlType='submit' className="custom-btn" type="primary">SAVE</Button>
                </div>
            </div>
            <Loader visibility={designationStore?.isLoading} />
        </form>
    </PageTransition>
}

export default observer(AddDesignation);
