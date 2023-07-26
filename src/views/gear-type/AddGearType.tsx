import { observer } from 'mobx-react-lite';
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import RootStore from '../../mobx-store/RootStore';
import { PageTransition, FormGroup, Loader } from '../../components';
import GearTypeHelper from '../../helpers/GearTypeHelper';

let isValidForm: boolean = true;

const AddGearType: React.FC = () => {
    const { gearTypeStore } = RootStore;
    const navigate = useNavigate();

    const onChangeValue = (event: React.ChangeEvent<any>, name: string = '') => {
        event.preventDefault();
        let { value } = event.target;

        if (name === 'name') {
            gearTypeStore.name = value;
        }
        if (!isValidForm) {
            gearTypeStore.isValidCreateGearTypeForm();
        }
    }

    const onCreate = async (event: any) => {
        event.preventDefault();
        if (gearTypeStore?.isValidCreateGearTypeForm()) {
            isValidForm = true;
            await GearTypeHelper(navigate).CreateGearType();
            gearTypeStore.resetPostData();
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
                        <span style={{ color: '#000000' }}>Add New Gear Type</span>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label='Gear Type' labelSpacing='mb-1' error={gearTypeStore?.formCreateGearTypeErrors?.name}>
                        <Input placeholder="Name" autoComplete="off"
                            onChange={(event) => onChangeValue(event, 'name')} value={gearTypeStore?.name} />
                    </FormGroup>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-4">
                    <Button htmlType='submit' className="custom-btn" type="primary">SAVE</Button>
                </div>
            </div>
            <Loader visibility={gearTypeStore?.isLoading} />
        </form>
    </PageTransition>
}

export default observer(AddGearType);
