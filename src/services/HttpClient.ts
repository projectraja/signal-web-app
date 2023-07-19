import { message } from 'antd';
import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';
import Messages from '../constant/Messages';
import RootStore from '../mobx-store/RootStore';
import FunctionUtil from '../utils/Function-Util';
import Endpoints from './Endpoints';

const HttpClient = (navigate: NavigateFunction | any = null) => {
    const { advertisementStore, authStore } = RootStore;

    const GetResponse = async (endpoint: string) => {
        let retResp: any = {};
        let resGetData: any = null;
        let getMsg: any = null;
        let getResp: any;

        getResp = await Get(endpoint);
        if (getResp == null) {
            return null;
        }
        try {
            resGetData = await getResp.json();
            if (resGetData) {
                getMsg = resGetData?.message;
            }
            if (getResp.ok) {
                retResp = resGetData;
            } else {
                retResp['status'] = getResp?.statusText;
                retResp['code'] = getResp?.status;
                retResp['message'] = getMsg;
                if (getResp.status === 400) {
                    message.warning(getMsg ? getMsg : "Invalid input data", 5);
                } else if (getResp.status === 409) {
                    message.warning(getMsg ? getMsg : "User already exists", 5);
                } else if (getResp.status === 401) {
                    message.warning(getMsg ? getMsg : "Unauthorized user details", 5);
                    FunctionUtil.logout(navigate);
                } else if (getResp.status === 403) {
                    message.warning(getMsg ? getMsg : "You do not have permission", 5);
                } else if (getResp.status === 404) {
                    message.warning(getMsg ? getMsg : "User not found!!!", 5);
                } else if (getResp.status === 500) {
                    message.warning(getMsg ? getMsg : "Something went wrong, Please try again later", 5);
                }
            }
        } catch (e) {
            retResp = {};
        }
        return retResp;
    }

    const PostResponse = async (endpoint: string, method: string, body: any, isFormData: boolean = false) => {
        let retResp: any = {};
        let resPostData: any = null;
        let postResp: any = null;
        let postMsg: any = null;

        postResp = await Post(endpoint, method, body, isFormData);
        if (postResp === null) {
            return null;
        }
        try {
            resPostData = await postResp.json();
            if (resPostData) {
                postMsg = resPostData?.message;
            }
            if (postResp.ok) {
                retResp = resPostData;
            } else {
                retResp['status'] = postResp?.statusText;
                retResp['code'] = postResp?.status;
                retResp['message'] = postMsg;
                if (postResp.status === 400) {
                    message.warning(postMsg ? postMsg : "Invalid input data", 5);
                } else if (postResp.status === 409) {
                    message.warning(postMsg ? postMsg : "User already exists", 5);
                } else if (postResp.status === 401) {
                    message.warning(postMsg ? postMsg : "Unauthorized user details", 5);
                    FunctionUtil.logout(navigate);
                } else if (postResp.status === 403) {
                    message.warning(postMsg ? postMsg : "You do not have permission", 5);
                } else if (postResp.status === 404) {
                    message.warning(postMsg ? postMsg : "User not found!!!", 5);
                } else if (postResp.status === 500) {
                    message.warning(postMsg ? postMsg : "Something went wrong, Please try again later", 5);
                }
            }
        } catch (e) {
            retResp = {};
        }
        return retResp;
    }

    const Get = async (endpoint: string) => {
        let config: any = {
            //mode: "no-cors",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        if (authStore?.accessToken) {
            config.headers["Authorization"] = `Bearer ${authStore?.accessToken}`;
        }
        return HttpFetch(endpoint, config);
    }

    const Post = async (endpoint: string, method: string, body: object, isFormData: boolean) => {
        let config: any = {
            //  mode: "no-cors",
            method: method,
            headers: {},
            body: isFormData ? body : JSON.stringify(body),
        }
        if (!isFormData) {
            config.headers["Content-Type"] = "application/json";
        }
        if (authStore?.accessToken) {
            config.headers["Authorization"] = `Bearer ${authStore?.accessToken}`;
        }
        return HttpFetch(endpoint, config);
    }

    const PostFile = async (endpoint: string, method: string, data: object) => {
        let response: any = null;
        const url: string = Endpoints.BaseURL + '/api' + endpoint;
        let headers: any = {}
        if (authStore?.accessToken) {
            headers["Authorization"] = `Bearer ${authStore?.accessToken}`;
        }

        try {
            response = await axios({
                headers: headers, method: method, url: url, data: data,
                onUploadProgress: (progressEvent: any) => {
                    const progressPercentage = Math.round((progressEvent?.loaded * 100) / progressEvent?.total);
                    advertisementStore.uploadPercentage = progressPercentage;
                }
            });
        } catch (err: any) {
            message.warning(err?.message, 5);
        }

        return response;
    }

    const Timeout = (ms: any, promise: any) => {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                reject(new Error("timeout"));
            }, ms);
            promise.then(resolve, reject);
        });
    }

    const HttpFetch = async (endpoint: string, config: any) => {
        let response: any = null;

        if (FunctionUtil.isNetworkAvailable()) {
            let url: string = Endpoints.BaseURL + '/api' + endpoint;
            try {
                response = await Timeout(Endpoints.Timeout, fetch(url, config));
            } catch (err: any) {
                message.warning(err?.message, 5);
            }
        } else {
            message.warning(Messages.NoInternet, 5);
        }

        return response;
    }

    return { GetResponse, PostResponse, PostFile };
}

export default HttpClient;
