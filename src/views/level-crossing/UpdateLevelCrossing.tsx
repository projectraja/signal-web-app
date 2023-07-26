import { observer } from 'mobx-react-lite';
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import RootStore from '../../mobx-store/RootStore';
import { PageTransition, FormGroup, Loader } from '../../components';
import LevelCrossingHelper from '../../helpers/LevelCrossingHelper';

let isValidForm: boolean = true;

const UpdateLevelCrossing: React.FC = () => {
    const { levelCrossingStore } = RootStore;
    const navigate = useNavigate();

    const onChangeValue = (event: React.ChangeEvent<any>, name: string = '') => {
        event.preventDefault();
        let { value } = event.target;

        if (name === 'name') {
            levelCrossingStore.name = value;
        }
        if (!isValidForm) {
            levelCrossingStore.isValidCreateLevelCrossingForm();
        }
    }

    const onUpdate = async (event: any) => {
        event.preventDefault();
        if (levelCrossingStore?.isValidCreateLevelCrossingForm()) {
            isValidForm = true;
            await LevelCrossingHelper(navigate).UpdateLevelCrossing();
            levelCrossingStore.resetPostData();
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
                        <span style={{ color: '#000000' }}>Update Level Crossing</span>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label='LevelCrossing Name' labelSpacing='mb-1' error={levelCrossingStore?.formCreateLevelCrossingErrors?.name}>
                        <Input placeholder="Name" autoComplete="off"
                            onChange={(event) => onChangeValue(event, 'name')} value={levelCrossingStore?.name} />
                    </FormGroup>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-4">
                    <Button htmlType='submit' className="custom-btn" type="primary">UPDATE</Button>
                </div>
            </div>
            <Loader visibility={levelCrossingStore?.isLoading} />
        </form>
    </PageTransition>
}

export default observer(UpdateLevelCrossing);
