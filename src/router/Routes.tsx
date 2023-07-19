import { lazy } from 'react';
import { IRoutesProps } from '../interface/ICommon';
import RootStore from '../mobx-store/RootStore';

const Dashboard = lazy(() => import('../views/dashboard/Dashboard'));
const Display = lazy(() => import('../views/display/Display'));
const AddDisplay = lazy(() => import('../views/display/AddDisplay'));
const UpdateDisplay = lazy(() => import('../views/display/UpdateDisplay'));
const Station = lazy(() => import('../views/station/Station'));
const AddStation = lazy(() => import('../views/station/AddStation'));
const UpdateStation = lazy(() => import('../views/station/UpdateStation'));
const Admin = lazy(() => import('../views/authentication/Admins'));
const AddAdmin = lazy(() => import('../views/authentication/AddAdmin'));
const UpdateAdmin = lazy(() => import('../views/authentication/UpdateAdmin'));
const Platform = lazy(() => import('../views/platform/Platform'));
const AddPlatform = lazy(() => import('../views/platform/AddPlatform'));
const UpdatePlatform = lazy(() => import('../views/platform/UpdatePlatform'));
const Flyover = lazy(() => import('../views/flyover/Flyover'));
const AddFlyover = lazy(() => import('../views/flyover/AddFlyover'));
const UpdateFlyover = lazy(() => import('../views/flyover/UpdateFlyover'));
const Train = lazy(() => import('../views/train/Train'));
const AddTrain = lazy(() => import('../views/train/AddTrain'));
const UpdateTrain = lazy(() => import('../views/train/UpdateTrain'));
const AssignPlatform = lazy(() => import('../views/assign-platform/AssignPlatform'));
const AddAssignPlatform = lazy(() => import('../views/assign-platform/AddAssignPlatform'));
const UpdateAssignPlatform = lazy(() => import('../views/assign-platform/UpdateAssignPlatform'));
const Advertisement = lazy(() => import('../views/advertisement/Advertisement'));
const AddAddvertisement = lazy(() => import('../views/advertisement/AddAdvertisement'));
const UpdateAddvertisement = lazy(() => import('../views/advertisement/UpdateAdvertisement'));
const Language = lazy(() => import('../views/language/Language'));
const AddLanguage = lazy(() => import('../views/language/AddLanguage'));
const UpdateLanguage = lazy(() => import('../views/language/UpdateLanguage'));

const Routes: IRoutesProps[] = [
    {
        path: 'dashboard', name: 'Dashboard', element: Dashboard, icon: 'Dashboard',
        children: [], roles: ['SUPER ADMIN']
    },
    {
        path: 'station', name: 'Station', element: Station, icon: 'Station',
        children: [], roles: ['SUPER ADMIN']
    },
    {
        path: 'station/add', name: '', element: AddStation, icon: 'Station',
        children: [], roles: ['SUPER ADMIN']
    },
    {
        path: 'station/:id', name: '', element: UpdateStation, icon: 'Station',
        children: [], roles: ['SUPER ADMIN']
    },
    {
        path: 'language', name: 'Language', element: Language, icon: 'Language',
        children: [], roles: ['SUPER ADMIN']
    },
    {
        path: 'language/add', name: '', element: AddLanguage, icon: 'Language',
        children: [], roles: ['SUPER ADMIN']
    },
    {
        path: 'language/:id', name: '', element: UpdateLanguage, icon: 'Language',
        children: [], roles: ['SUPER ADMIN']
    },
    {
        path: 'admin', name: 'Admin', element: Admin, icon: 'Admin',
        children: [], roles: ['SUPER ADMIN']
    },
    {
        path: 'admin/add', name: '', element: AddAdmin, icon: 'Admin',
        children: [], roles: ['SUPER ADMIN']
    },
    {
        path: 'admin/:id', name: '', element: UpdateAdmin, icon: 'Admin',
        children: [], roles:  ['SUPER ADMIN']
    },
    {
        path: 'display', name: 'Display', element: Display, icon: 'Display',
        children: [], roles:  ['SUPER ADMIN']
    },
    {
        path: 'display/add', name: '', element: AddDisplay, icon: 'Dashboard',
        children: [], roles:  ['SUPER ADMIN']
    },
    {
        path: 'display/:id', name: '', element: UpdateDisplay, icon: 'Dashboard',
        children: [], roles:  ['SUPER ADMIN']
    },
    {
        path: 'platform', name: 'Platform', element: Platform, icon: 'Platform',
        children: [], roles: ['ADMIN']
    },
    {
        path: 'platform/add', name: '', element: AddPlatform, icon: 'Platform',
        roles: ['ADMIN']
    },
    {
        path: 'platform/:id', name: '', element: UpdatePlatform, icon: 'Platform',
        roles: ['ADMIN']
    },
    {
        path: 'flyover', name: 'Flyover', element: Flyover, icon: 'Flyover',
        children: [], roles: ['ADMIN']
    },
    {
        path: 'flyover/add', name: '', element: AddFlyover, icon: 'Flyover',
        roles: ['ADMIN']
    },
    {
        path: 'flyover/:id', name: '', element: UpdateFlyover, icon: 'Flyover',
        roles: ['ADMIN']
    },
    {
        path: 'train', name: 'Train', element: Train, icon: 'Train',
        children: [], roles: ['ADMIN']
    },
    {
        path: 'train/add', name: '', element: AddTrain, icon: 'Train',
        roles: ['ADMIN']
    },
    {
        path: 'train/:id', name: '', element: UpdateTrain, icon: 'Train',
        roles: ['ADMIN']
    },
    {
        path: 'assign-platform', name: 'Assign Platform', element: AssignPlatform, icon: 'Assign',
        children: [], roles: ['ADMIN']
    },
    {
        path: 'assign-platform/add', name: '', element: AddAssignPlatform, icon: 'Assign',
        roles: ['ADMIN']
    },
    {
        path: 'assign-platform/:id', name: '', element: UpdateAssignPlatform, icon: 'Assign',
        roles: ['ADMIN']
    },
    {
        path: 'advertisement', name: 'Advertisement', element: Advertisement, icon: 'Advertisement',
        children: [], roles: ['ADMIN']
    },
    {
        path: 'advertisement/add', name: '', element: AddAddvertisement, icon: 'Advertisement',
        roles: ['ADMIN']
    },
    {
        path: 'advertisement/:id', name: '', element: UpdateAddvertisement, icon: 'Advertisement',
        roles: ['ADMIN']
    },
];

const GetRoutes = () => {
    const { authStore } = RootStore;

    const GetByRole = () => {
        return Routes.filter((route) => route?.roles?.some((role) => role === authStore?.roleName));
    }

    return { GetByRole };
}

export default GetRoutes;
