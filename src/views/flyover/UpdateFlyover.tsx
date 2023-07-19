import { observer } from 'mobx-react-lite';
import { Button, Select } from "antd";
import { useNavigate } from "react-router-dom";
import RootStore from '../../mobx-store/RootStore';
import { PageTransition, FormGroup, Loader } from '../../components';
import TextArea from 'antd/es/input/TextArea';
import PlatformHelper from '../../helpers/PlatformHelper';
import FlyoverHelper from '../../helpers/FlyoverHelper';
import { useEffect, useState } from 'react';

let isValidForm: boolean = true;
const { Option } = Select;

const UpdateFlyover: React.FC = () => {
    const { flyoverStore, platformStore } = RootStore;
    const navigate = useNavigate();
    const [platformOptions, setPlatformOptions]: any = useState([]);

    useEffect(() => {
        getPlatforms();
    }, []);

    const getPlatforms = async () => {
        let options = [];
        await PlatformHelper(navigate).GetPlatforms();
        for (const platform of platformStore?.platforms) {
            options.push({
                label: `Platform ${platform?.number}`,
                value: platform?.id
            });
        }
        setPlatformOptions(options);
    }

    const onChangeValue = (event: React.ChangeEvent<any>, name: string = '') => {
        event.preventDefault();
        let { value } = event.target;

        if (name === 'description') {
            flyoverStore.description = value;
        }
        if (!isValidForm) {
            flyoverStore.isValidCreateFlyoverForm();
        }
    }

    const onChangeMultiSelectValue = (value: number[], name: string = '') => {
        if (name === 'platformsId') {
            flyoverStore.platformsId = value;
        }
    }

    const onUpdate = async (event: any) => {
        event.preventDefault();
        if (flyoverStore?.isValidCreateFlyoverForm()) {
            isValidForm = true;
            await FlyoverHelper(navigate).UpdateFlyover();
            flyoverStore.resetPostData();
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
                        <span style={{ color: '#000000' }}>Update Flyover:</span>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label='Select Platforms' labelSpacing='mb-1' error={flyoverStore?.formCreateFlyoverErrors?.number}>
                        <Select mode="multiple" allowClear style={{ width: '100%' }} placeholder="Select platforms"
                            defaultValue={flyoverStore.platformsId} options={platformOptions}
                            onChange={(value) => onChangeMultiSelectValue(value, 'platformsId')}
                        />
                    </FormGroup>
                </div>
                <div className="col-4">
                    <FormGroup isRequired label='Display Type' labelSpacing='mb-1' error={flyoverStore?.formCreateFlyoverErrors?.type}>
                        <Select placeholder="Select Display Type" style={{ width: '100%' }}
                            defaultValue={flyoverStore.type} disabled>
                            <Option value={1}>Single</Option>
                            <Option value={2}>Dual</Option>
                        </Select>
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label='Flyover Description' labelSpacing='mb-1' error={flyoverStore?.formCreateFlyoverErrors?.description}>
                        <TextArea placeholder="Flyover Description" autoComplete="off"
                            onChange={(event) => onChangeValue(event, 'description')} value={flyoverStore?.description} />
                    </FormGroup>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-4">
                    <Button htmlType='submit' className="custom-btn" type="primary">UPDATE</Button>
                </div>
            </div>
            <Loader visibility={flyoverStore?.isLoading} />
        </form>
    </PageTransition>
}

export default observer(UpdateFlyover);
