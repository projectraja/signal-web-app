import { observer } from 'mobx-react-lite';
import { Button, Input, Progress, Switch } from "antd";
import { useNavigate } from "react-router-dom";
import RootStore from '../../mobx-store/RootStore';
import { PageTransition, FormGroup, Loader } from '../../components';
import AdvertisementHelper from '../../helpers/AdvertisementHelper';

let isValidForm: boolean = true;

const UpdateAdvertisement: React.FC = () => {
    const { advertisementStore } = RootStore;
    const navigate = useNavigate();

    const onChangeValue = (event: React.ChangeEvent<any>, name: string = '') => {
        event.preventDefault();
        let { value, files } = event.target;

        if (name === 'title') {
            advertisementStore.title = value;
        } else if (name === 'file') {
            advertisementStore.file = files[0];
        }
        if (!isValidForm) {
            advertisementStore.isValidCreateAdForm();
        }
    }

    const toggleStatus = (checked: boolean, name: string = '') => {
        if (name === 'isActive') {
            advertisementStore.isActive = checked;
        }
    }

    const onRemoveVideoPath = () => {
        advertisementStore.videoPath = '';
    }

    const onUpdate = async (event: any) => {
        event.preventDefault();
        if (advertisementStore?.isValidCreateAdForm()) {
            isValidForm = true;
            await AdvertisementHelper(navigate).UpdateAd();
            advertisementStore.resetPostData();
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
                        <span style={{ color: '#000000' }}>Update Ad:</span>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label='Title' labelSpacing='mb-1' error={advertisementStore?.formCreateAdErrors?.title}>
                        <Input placeholder="Title" autoComplete="off"
                            onChange={(event) => onChangeValue(event, 'title')} value={advertisementStore?.title} />
                    </FormGroup>
                </div>
                <div className="col-4">
                    <FormGroup isRequired label='Video' labelSpacing='mb-1' error={advertisementStore?.formCreateAdErrors?.file}>
                        {advertisementStore.videoPath ?
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <div style={{ fontSize: '14px' }}>{advertisementStore.videoPath}</div>
                                <div className="ms-2 cancel-btn" onClick={onRemoveVideoPath}>x</div>
                            </div>
                            :
                            <>
                                <Input placeholder="Video" autoComplete="off" type='file' accept='video/*'
                                    onChange={(event) => onChangeValue(event, 'file')} />
                                {advertisementStore?.isLoading &&
                                    <Progress percent={advertisementStore.uploadPercentage}
                                        strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} />
                                }
                            </>
                        }
                    </FormGroup>
                </div>
            </div>
            <div className='row'>
                <div className="col-4">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div className="custom-label">Status</div>
                        <div>
                            {advertisementStore?.isActive ?
                                <span style={{ fontSize: '12px', color: '#304FFE' }}>Active</span>
                                :
                                <span style={{ fontSize: '12px', color: '#F6C451' }}>Inactive</span>
                            }
                            <Switch className={`ms-1 ${advertisementStore?.isActive ? 'custom-switch-active' : 'custom-switch'}`}
                                size='small' checked={advertisementStore?.isActive} onChange={(checked) => toggleStatus(checked, 'isActive')} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-4">
                    <Button htmlType='submit' className="custom-btn" type="primary">UPDATE</Button>
                </div>
            </div>
            <Loader visibility={advertisementStore?.isLoading} />
        </form>
    </PageTransition>
}

export default observer(UpdateAdvertisement);
