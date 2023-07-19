import { observer } from 'mobx-react-lite';
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import RootStore from '../../mobx-store/RootStore';
import { PageTransition, FormGroup, Loader } from '../../components';
import LanguageHelper from '../../helpers/LanguageHelper';

let isValidForm: boolean = true;

const UpdatePlatform: React.FC = () => {
    const { platformStore, languageStore } = RootStore;
    const navigate = useNavigate();

    const onChangeValue = (event: React.ChangeEvent<any>, name: string = '') => {
        event.preventDefault();
        let { value } = event.target;

        if (name === 'name') {
            languageStore.name = value;
        }
        if (!isValidForm) {
            languageStore.isValidCreateLanguageForm();
        }
    }

    const onUpdate = async (event: any) => {
        event.preventDefault();
        if (languageStore?.isValidCreateLanguageForm()) {
            isValidForm = true;
            await LanguageHelper(navigate).UpdateLanguage();
            languageStore.resetPostData();
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
                        <span style={{ color: '#000000' }}>Update Platform:</span>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label='Language Name' labelSpacing='mb-1' error={languageStore?.formCreateLanguageErrors?.name}>
                        <Input placeholder="Language Name" type='text'
                            onChange={(event) => onChangeValue(event, 'name')} value={languageStore?.name} autoComplete="off" />
                    </FormGroup>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-4">
                    <Button htmlType='submit' className="custom-btn" type="primary">UPDATE</Button>
                </div>
            </div>
            <Loader visibility={platformStore?.isLoading} />
        </form>
    </PageTransition>
}

export default observer(UpdatePlatform);
