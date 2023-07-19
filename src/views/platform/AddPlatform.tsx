import { observer } from 'mobx-react-lite';
import { Button, Input, Select } from "antd";
import { useNavigate } from "react-router-dom";
import RootStore from '../../mobx-store/RootStore';
import { PageTransition, FormGroup, Loader } from '../../components';
import TextArea from 'antd/es/input/TextArea';
import PlatformHelper from '../../helpers/PlatformHelper';

let isValidForm: boolean = true;
const { Option } = Select;

const AddPlatform: React.FC = () => {
    const { platformStore } = RootStore;
    const navigate = useNavigate();

    const onChangeValue = (event: React.ChangeEvent<any>, name: string = '') => {
        event.preventDefault();
        let { value } = event.target;

        if (name === 'number') {
            platformStore.number = value;
        } else if (name === 'description') {
            platformStore.description = value;
        }
        if (!isValidForm) {
            platformStore.isValidCreatePlatformForm();
        }
    }

    const onChangeSelectValue = (value: any, name: string = '') => {
        if (name === 'type') {
            platformStore.type = value;
        }
        if (!isValidForm) {
            platformStore.isValidCreatePlatformForm();
        }
    }

    const onCreate = async (event: any) => {
        event.preventDefault();
        if (platformStore?.isValidCreatePlatformForm()) {
            isValidForm = true;
            await PlatformHelper(navigate).CreatePlatform();
            platformStore.resetPostData();
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
                        <span style={{ color: '#000000' }}>Add New Platform:</span>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label='Platform Number' labelSpacing='mb-1' error={platformStore?.formCreatePlatformErrors?.number}>
                        <Input placeholder="Platform Number" type='number'
                            onChange={(event) => onChangeValue(event, 'number')} value={platformStore?.number} autoComplete="off" />
                    </FormGroup>
                </div>
                <div className="col-4">
                    <FormGroup isRequired label='Display Type' labelSpacing='mb-1' error={platformStore?.formCreatePlatformErrors?.type}>
                        <Select placeholder="Select Display Type" style={{ width: '100%' }} disabled
                            onChange={(value) => onChangeSelectValue(value, 'type')} defaultValue={platformStore.type}>
                            <Option value={1}>Single</Option>
                            <Option value={2}>Dual</Option>
                        </Select>
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label='Platform Description' labelSpacing='mb-1' error={platformStore?.formCreatePlatformErrors?.description}>
                        <TextArea placeholder="Platform Description"  autoComplete="off"
                            onChange={(event) => onChangeValue(event, 'description')} value={platformStore?.description} />
                    </FormGroup>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-4">
                    <Button htmlType='submit' className="custom-btn" type="primary">SAVE</Button>
                </div>
            </div>
            <Loader visibility={platformStore?.isLoading} />
        </form>
    </PageTransition>
}

export default observer(AddPlatform);
