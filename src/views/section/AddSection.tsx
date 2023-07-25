import { observer } from 'mobx-react-lite';
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import RootStore from '../../mobx-store/RootStore';
import { PageTransition, FormGroup, Loader } from '../../components';
import SectionHelper from '../../helpers/SectionHelper';

let isValidForm: boolean = true;

const AddSection: React.FC = () => {
    const { sectionStore } = RootStore;
    const navigate = useNavigate();

    const onChangeValue = (event: React.ChangeEvent<any>, name: string = '') => {
        event.preventDefault();
        let { value } = event.target;

        if (name === 'name') {
            sectionStore.name = value;
        }
        if (!isValidForm) {
            sectionStore.isValidCreateSectionForm();
        }
    }

    const onCreate = async (event: any) => {
        event.preventDefault();
        if (sectionStore?.isValidCreateSectionForm()) {
            isValidForm = true;
            await SectionHelper(navigate).CreateSection();
            sectionStore.resetPostData();
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
                        <span style={{ color: '#000000' }}>Add New Section</span>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label='Section Name' labelSpacing='mb-1' error={sectionStore?.formCreateSectionErrors?.name}>
                        <Input placeholder="Name" autoComplete="off"
                            onChange={(event) => onChangeValue(event, 'name')} value={sectionStore?.name} />
                    </FormGroup>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-4">
                    <Button htmlType='submit' className="custom-btn" type="primary">SAVE</Button>
                </div>
            </div>
            <Loader visibility={sectionStore?.isLoading} />
        </form>
    </PageTransition>
}

export default observer(AddSection);
