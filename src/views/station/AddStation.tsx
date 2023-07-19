import { observer } from 'mobx-react-lite';
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import RootStore from '../../mobx-store/RootStore';
import { PageTransition, FormGroup, Loader } from '../../components';
import TextArea from 'antd/es/input/TextArea';
import StationHelper from '../../helpers/StationHelper';

let isValidForm: boolean = true;

const AddStation: React.FC = () => {
    const { stationStore } = RootStore;
    const navigate = useNavigate();

    const onChangeValue = (event: React.ChangeEvent<any>, name: string = '') => {
        event.preventDefault();
        let { value } = event.target;

        if (name === 'code') {
            stationStore.code = value?.toUpperCase();
        } else if (name === 'name') {
            stationStore.name = value;
        } else if (name === 'welcomeNotes') {
            stationStore.welcomeNotes = value;
        } else if (name === 'adContact') {
            stationStore.adContact = value;
        }
        if (!isValidForm) {
            stationStore.isValidCreateStationForm();
        }
    }

    const onCreate = async (event: any) => {
        event.preventDefault();
        if (stationStore?.isValidCreateStationForm()) {
            isValidForm = true;
            await StationHelper(navigate).CreateStation();
            stationStore.resetPostData();
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
                        <span style={{ color: '#000000' }}>Add New Station</span>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label='Station Code' labelSpacing='mb-1' error={stationStore?.formCreateStationErrors?.code}>
                        <Input placeholder="MDU" autoComplete="off"
                            onChange={(event) => onChangeValue(event, 'code')} value={stationStore?.code} />
                    </FormGroup>
                </div>
                <div className="col-4">
                    <FormGroup isRequired label='Station Name' labelSpacing='mb-1' error={stationStore?.formCreateStationErrors?.name}>
                        <Input placeholder="Name" autoComplete="off"
                            onChange={(event) => onChangeValue(event, 'name')} value={stationStore?.name} />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup label='Advertisement Contact' labelSpacing='mb-1'>
                        <Input placeholder="Contact" autoComplete="off" autoCapitalize='true'
                            onChange={(event) => onChangeValue(event, 'adContact')} value={stationStore?.adContact} />
                    </FormGroup>
                </div>
                <div className="col-4">
                    <FormGroup label='Welcome Notes' labelSpacing='mb-1'>
                        <TextArea placeholder="Welcome Notes" autoComplete="off"
                            onChange={(event) => onChangeValue(event, 'welcomeNotes')} value={stationStore?.welcomeNotes} />
                    </FormGroup>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-4">
                    <Button htmlType='submit' className="custom-btn" type="primary">SAVE</Button>
                </div>
            </div>
            <Loader visibility={stationStore?.isLoading} />
        </form>
    </PageTransition>
}

export default observer(AddStation);
