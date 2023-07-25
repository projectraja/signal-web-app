import { observer } from 'mobx-react-lite';
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import RootStore from '../../mobx-store/RootStore';
import { PageTransition, FormGroup, Loader } from '../../components';
import DepartmentHelper from '../../helpers/DepartmentHelper';

let isValidForm: boolean = true;

const UpdateDepartment: React.FC = () => {
    const { departmentStore } = RootStore;
    const navigate = useNavigate();

    const onChangeValue = (event: React.ChangeEvent<any>, name: string = '') => {
        event.preventDefault();
        let { value } = event.target;

        if (name === 'name') {
            departmentStore.name = value;
        }
        if (!isValidForm) {
            departmentStore.isValidCreateDepartmentForm();
        }
    }

    const onUpdate = async (event: any) => {
        event.preventDefault();
        if (departmentStore?.isValidCreateDepartmentForm()) {
            isValidForm = true;
            await DepartmentHelper(navigate).UpdateDepartment();
            departmentStore.resetPostData();
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
                        <span style={{ color: '#000000' }}>Add New Department</span>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label='Department Name' labelSpacing='mb-1' error={departmentStore?.formCreateDepartmentErrors?.name}>
                        <Input placeholder="Name" autoComplete="off"
                            onChange={(event) => onChangeValue(event, 'name')} value={departmentStore?.name} />
                    </FormGroup>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-4">
                    <Button htmlType='submit' className="custom-btn" type="primary">UPDATE</Button>
                </div>
            </div>
            <Loader visibility={departmentStore?.isLoading} />
        </form>
    </PageTransition>
}

export default observer(UpdateDepartment);
