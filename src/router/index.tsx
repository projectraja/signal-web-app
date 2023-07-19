import { lazy, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Layout from "../layout";
import RootStore from "../mobx-store/RootStore";
import { observer } from "mobx-react-lite";
import _routes from "./Routes";
import CustomSuspense from "../components/CustomSuspense";
import Loader from "../views/common/Loader";
import FunctionUtil from "../utils/Function-Util";
import io from 'socket.io-client';
import Endpoints from "../services/Endpoints";

const Login = lazy(() => import("../views/authentication/Login"));
const OTPVerification = lazy(() => import("../views/authentication/OTPVerification"));
const NotFound = lazy(() => import("../components/NotFound"));

const Router = () => {
  let { authStore } = RootStore;
  let navigate = useNavigate();

  // useEffect(() => {
  //   const socket = io(Endpoints.BaseURL, { transports: ['websocket', 'polling', 'flashsocket'] });

  //   socket.on('connect', () => {
  //     console.log('Connected to Socket.io server');
  //   });

  //   socket.on('disconnect', () => {
  //     console.log('Disconnected from Socket.io server');
  //   });

  //   socket.on('tableUpdated', updatedData => {
  //     console.log("------updated", updatedData);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  useEffect(() => {
    if (authStore?.isLoggedIn) {
      navigate('/employee');
    }
  }, []);

  return <Routes>
    <Route path='login' element={<CustomSuspense><Login /></CustomSuspense>} />
    <Route path='otp-verification' element={<CustomSuspense><OTPVerification /></CustomSuspense>} />
    <Route path='loader' element={<CustomSuspense><Loader visibility={true} /></CustomSuspense>} />
    {/* <Route path='/' element={(authStore.isLoggedIn && FunctionUtil.isValidJWTToken()) ? <Layout /> : <Navigate to={'login'} replace />}> */}
    <Route path='/' element={<Layout />}>
      {_routes()?.GetByRole() && _routes()?.GetByRole()?.map((route, routeIndex) => {
        return <Route key={routeIndex} path={route?.path} element={<CustomSuspense><route.element /></CustomSuspense>} />
      })}
      <Route path="/" element={<Navigate to={'employee'} replace />} />
    </Route>
    <Route path='*' element={<CustomSuspense><NotFound /></CustomSuspense>} />
  </Routes>
}

export default observer(Router);
