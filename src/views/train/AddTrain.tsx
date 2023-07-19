import { observer } from 'mobx-react-lite';
import { Button, Input, Select } from "antd";
import { useNavigate } from "react-router-dom";
import RootStore from '../../mobx-store/RootStore';
import { PageTransition, FormGroup, Loader } from '../../components';
import TrainHelper from '../../helpers/TrainHelper';
import { useEffect, useRef, useState } from 'react';
import CustomTab from '../../components/CustomTab';
import LanguageHelper from '../../helpers/LanguageHelper';

let isValidForm: boolean = true;
const { Option } = Select;

const AddTrain: React.FC = () => {
    const { trainStore, languageStore } = RootStore;
    const navigate = useNavigate();
    const [filteredStations, setFilteredStations] = useState<any>([]);
    const coachInputRef: any = useRef<any>([]);
    const stationInputRef: any = useRef<any>([]);

    useEffect(() => {
        getLanguages();
    }, []);

    const getLanguages = async () => {
        await LanguageHelper(navigate).GetLanguages();
        trainStore.languageId = languageStore.languages[0]?.id;
        trainStore.trainName[0].languageId = languageStore.languages[0]?.id;
        trainStore.trainName[0].trainName = '';

        trainStore.stations[0].languageId = languageStore.languages[0]?.id;
        trainStore.stations[0].name = '';
        const filteredStation: any[] = trainStore.stations.filter((stationObj) => stationObj?.languageId === languageStore.languages[0]?.id);
        setFilteredStations(filteredStation);
    }

    const onChangeValue = (event: React.ChangeEvent<any>, name: string = '', index: any = '') => {
        event.preventDefault();
        let { value } = event.target;

        if (name === 'number') {
            trainStore.number = value;
        } else if (name === 'name') {
            let selectedTrainNameObj = trainStore.trainName.find((trainNameObj) => {
                return trainNameObj.languageId === trainStore.languageId;
            });
            selectedTrainNameObj!.trainName = value?.toUpperCase();
            trainStore.languageWiseTrainName = value?.toUpperCase();
        } else if (name === 'fromStation') {
            trainStore.fromStation = value?.toUpperCase();
        } else if (name === 'toStation') {
            trainStore.toStation = value?.toUpperCase();
        } else if (name === 'coachNumber') {
            trainStore.coaches[index].serialNumber = index + 1;
            trainStore.coaches[index].coachNumber = value?.toUpperCase();
        } else if (name === 'stationName') {
            trainStore.stations.filter((stationObj) => stationObj?.languageId === trainStore.languageId)[index].name = value;
        }
        if (!isValidForm) {
            trainStore.isValidCreateTrainForm();
        }
    }

    const onChangeSelectValue = (dataObj: any, name: string = '') => {
        if (name === 'type') {
            trainStore.type = dataObj?.value;
        }
        if (!isValidForm) {
            trainStore.isValidCreateTrainForm();
        }
    }

    const onAddCoach = async (event: any, coachIndex: any) => {
        if (event?.key === 'Enter') {
            event.preventDefault();
            if (event?.target?.value) {
                const coachObj = { serialNumber: 1, coachNumber: '' };
                await trainStore.coaches.push(coachObj);
                coachInputRef.current[coachIndex + 1]?.focus();
            }
        }
    }

    const onRemoveCoach = (index: number) => {
        trainStore.coaches.splice(index, 1);
    }

    const onAddStation = async (event: any, stationIndex: any) => {
        if (event?.key === 'Enter') {
            event.preventDefault();
            if (event?.target?.value) {
                const stationObj = { name: '', languageId: trainStore.languageId };
                await trainStore.stations.push(stationObj);
                const filteredStation = trainStore.stations.filter((stationObj) => stationObj?.languageId === trainStore.languageId);
                setFilteredStations(filteredStation);
                stationInputRef.current[stationIndex + 1]?.focus();
            }
        }
    }

    const onRemoveStation = (index: number) => {
        const filteredStation = trainStore.stations.filter((stationObj) => stationObj?.languageId === trainStore.languageId);
        filteredStation.splice(index, 1);
        trainStore.stations = trainStore.stations.filter((station) => station.languageId !== trainStore.languageId);
        setFilteredStations(filteredStation);
        trainStore.stations = [...trainStore.stations, ...filteredStation];
    }

    const onCreate = async (event: any) => {
        event.preventDefault();
        if (trainStore?.isValidCreateTrainForm()) {
            isValidForm = true;
            await TrainHelper(navigate).CreateTrain();
            trainStore.resetPostData();
            navigate(-1);
        } else {
            isValidForm = false;
        }
    }

    const onSelectLanguage = (key: number) => {
        trainStore.languageId = key;
        const filteredTrainName = trainStore.trainName.filter((nameObj) => nameObj?.languageId === key);
        let filteredStation: any[] = trainStore.stations.filter((stationObj) => stationObj?.languageId === key);
        if (filteredTrainName?.length === 0) {
            const trainNameObj = { trainName: '', languageId: key };
            trainStore.trainName.push(trainNameObj);
        }
        trainStore.languageWiseTrainName = trainStore.trainName.find((nameObj) => nameObj.languageId === key)?.trainName || '';

        if (filteredStation?.length === 0) {
            const stationObj = { name: '', languageId: key };
            trainStore.stations.push(stationObj);
            filteredStation = trainStore.stations.filter((stationObj) => stationObj?.languageId === key);
        }
        setFilteredStations(filteredStation);
    }

    return <PageTransition>
        <form onSubmit={onCreate}>
            <div className="row mb-2">
                <div className="col-4">
                    <div className="col" style={{ fontWeight: '600', fontSize: '18px' }}>
                        <span style={{ color: '#000000' }}>Add New Train:</span>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label='Train Number' labelSpacing='mb-1' error={trainStore?.formCreateTrainErrors?.number}>
                        <Input placeholder="Train Number" type='number' autoComplete="off"
                            onChange={(event) => onChangeValue(event, 'number')} value={trainStore?.number} />
                    </FormGroup>
                </div>
                <div className="col-4">
                    <FormGroup isRequired label='Train Type' labelSpacing='mb-1' error={trainStore?.formCreateTrainErrors?.type}>
                        <Select placeholder="Select Train Type" style={{ width: '100%' }} labelInValue
                            onChange={(value) => onChangeSelectValue(value, 'type')} defaultValue={parseInt(trainStore.type)}
                            options={trainStore.trainTypes} />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label='From Station Code' labelSpacing='mb-1' error={trainStore?.formCreateTrainErrors?.fromStation}>
                        <Input placeholder="MDU" autoComplete="off"
                            onChange={(event) => onChangeValue(event, 'fromStation')} value={trainStore?.fromStation} />
                    </FormGroup>
                </div>
                <div className="col-4">
                    <FormGroup isRequired label='To Station Code' labelSpacing='mb-1' error={trainStore?.formCreateTrainErrors?.toStation}>
                        <Input placeholder="MS" autoComplete="off"
                            onChange={(event) => onChangeValue(event, 'toStation')} value={trainStore?.toStation} />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label='Coach Position' labelSpacing='mb-1' error={trainStore?.formCreateTrainErrors?.coaches}>
                        <div className="d-flex align-items-center flex-wrap">
                            {trainStore.coaches.map((coach, coachIndex) => {
                                return <div key={coachIndex} className="col-6 p-0 d-flex align-items-center">
                                    <FormGroup label='' labelSpacing='mb-1'>
                                        <Input ref={el => coachInputRef.current[coachIndex] = el} placeholder="Coach Name..."
                                            value={coach?.coachNumber} autoComplete="off" onKeyDown={(e) => onAddCoach(e, coachIndex)}
                                            onChange={(event) => onChangeValue(event, 'coachNumber', coachIndex)} />
                                    </FormGroup>
                                    <div className="ms-2 cancel-btn" onClick={() => onRemoveCoach(coachIndex)}>x</div>
                                </div>
                            })}
                        </div>
                    </FormGroup>
                </div>
            </div>
            <CustomTab items={languageStore.languages} onSelectTab={onSelectLanguage}>
                <div className="row">
                    <div className="row">
                        <div className="col-4 d-flex flex-column">
                            <FormGroup isRequired label='Train Name' labelSpacing='mb-1' error={trainStore?.formCreateTrainErrors?.name}>
                                <Input placeholder="Train Name" autoComplete="off"
                                    onChange={(event) => onChangeValue(event, 'name')} value={trainStore.languageWiseTrainName} />
                            </FormGroup>
                        </div>
                        <div className="col-4 d-flex flex-column">
                            <FormGroup isRequired label='Intermediate Stations' labelSpacing='mb-1' error={trainStore?.formCreateTrainErrors?.stations}>
                                <div className="d-flex align-items-center flex-wrap">
                                    {filteredStations.map((station: any, stationIndex: number) => {
                                        return <div key={stationIndex} className="col-6 ps-1 d-flex align-items-center">
                                            <FormGroup label='' labelSpacing='mb-1'>
                                                <Input ref={el => stationInputRef.current[stationIndex] = el} placeholder="Station Name..."
                                                    value={station?.name} autoComplete="off" onKeyDown={(e) => onAddStation(e, stationIndex)}
                                                    onChange={(event) => onChangeValue(event, 'stationName', stationIndex)} />
                                            </FormGroup>
                                            <div className="ms-2 cancel-btn" onClick={() => onRemoveStation(stationIndex)}>x</div>
                                        </div>
                                    })}
                                </div>
                            </FormGroup>
                        </div>
                    </div>
                </div>
            </CustomTab>
            <div className="row mt-2">
                <div className="col-4">
                    <Button htmlType='submit' className="custom-btn" type="primary">SAVE</Button>
                </div>
            </div>
            <Loader visibility={trainStore?.isLoading} />
        </form>
    </PageTransition>
}

export default observer(AddTrain);
