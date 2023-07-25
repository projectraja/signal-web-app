import { FormGroup, Loader, PageTransition } from "../../components";
import { Images } from "../../constant/Images";
import { Button, Input } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import AuthHelper from "../../helpers/AuthHelper";
import { observer } from 'mobx-react-lite';
import RootStore from "../../mobx-store/RootStore";
import { useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";

let isValidForm: boolean = true;

const Login: React.FC = () => {
    let { authStore } = RootStore;
    let navigate = useNavigate();
    const logoutCb = useLogout();

    const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        var { name, value } = event.target;

        if (name === 'empId') {
            authStore.empId = value;
        }
        if (!isValidForm) {
            authStore.isValidLoginForm();
        }
    }

    const onSubmitLogin = async (event: any) => {
        event.preventDefault()
        if (authStore?.isValidLoginForm()) {
            isValidForm = true;
            await AuthHelper().Login(navigate, logoutCb);
        } else {
            isValidForm = false;
        }
    }

    return <PageTransition>
        <div className="login-container flex-row align-items-center">
            <div className="container">
                <div className="row justify-content-end">
                    <div className="col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4">
                        <div className="card px-3 py-2 m-0" style={{ border: 'none' }}>
                            <div className="card-body">
                                <form onSubmit={onSubmitLogin}>
                                    <div className="row justify-content-center">
                                        <img src={Images.BrandLogoWithName} alt="Login Logo" style={{ width: '220px', height: '180px' }} />
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="text-center mb-3 mt-2 text-secondary">Generate OTP</div>
                                    </div>

                                    <FormGroup isRequired label='Employee Id' error={authStore?.formLoginErrors?.empId}>
                                        <Input name='empId' placeholder="Employee Id" prefix={<UserOutlined />}
                                            className='login-input' autoComplete="off" onChange={onChangeValue} value={authStore?.empId}
                                        />
                                    </FormGroup>

                                    <div className="row mt-4">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                            <Button htmlType='submit' className="login-btn" type="primary" block>GENERATE OTP</Button>
                                        </div>
                                    </div>
                                    <Loader visibility={false} />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Loader visibility={authStore?.isLoading} />
        </div>
    </PageTransition>
}

export default observer(Login);
