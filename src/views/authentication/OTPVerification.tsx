import { FormGroup, Loader, PageTransition } from "../../components";
import { Images } from "../../constant/Images";
import { Button, Input } from 'antd';
import AuthHelper from "../../helpers/AuthHelper";
import { observer } from 'mobx-react-lite';
import RootStore from "../../mobx-store/RootStore";
import { useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";

let isValidForm: boolean = true;

const OTPVerification: React.FC = () => {
    let { authStore } = RootStore;
    let navigate = useNavigate();
    const logoutCb = useLogout();

    const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        var { name, value } = event.target;

        if (name === 'loginOTP') {
            authStore.loginOTP = value;
        }

        if (!isValidForm) {
            authStore.isValidLoginForm();
        }
    }

    const onSubmitVerifyOTP = async (event: any) => {
        event.preventDefault()
        if (authStore?.isValidLoginOTPForm()) {
            isValidForm = true;
            await AuthHelper().OTPVerification(navigate, logoutCb);
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
                                <form onSubmit={onSubmitVerifyOTP}>
                                    <div className="row justify-content-center">
                                        <img src={Images.BrandLogoWithName} alt="Login Logo" style={{ width: '220px', height: '180px' }} />
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="text-center mb-3 mt-2 text-secondary">OTP Verification</div>
                                    </div>

                                    <FormGroup isRequired label='OTP' error={authStore?.formLoginOTPErrors.loginOTP}>
                                        <Input name='loginOTP' placeholder="Login OTP" maxLength={5}
                                            className='login-input' autoComplete="off" onChange={onChangeValue} value={authStore?.loginOTP}
                                        />
                                    </FormGroup>

                                    <div className="row mt-4">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                            <Button htmlType='submit' className="login-btn" type="primary" block>SIGN IN</Button>
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

export default observer(OTPVerification);
