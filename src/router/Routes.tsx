import { lazy } from 'react';
import { IRoutesProps } from '../interface/ICommon';
import RootStore from '../mobx-store/RootStore';
const Section = lazy(() => import('../views/section/Section'));
const AddSection = lazy(() => import('../views/section/AddSection'));
const UpdateSection = lazy(() => import('../views/section/UpdateSection'));
const Station = lazy(() => import('../views/station/Station'));
const AddStation = lazy(() => import('../views/station/AddStation'));
const UpdateStation = lazy(() => import('../views/station/UpdateStation'));
const Department = lazy(() => import('../views/department/Department'));
const AddDepartment = lazy(() => import('../views/department/AddDepartment'));
const UpdateDepartment = lazy(() => import('../views/department/UpdateDepartment'));
const Employee = lazy(() => import('../views/authentication/Employee'));
const AddEmployee = lazy(() => import('../views/authentication/AddEmployee'));
const UpdateEmployee = lazy(() => import('../views/authentication/UpdateEmployee'));

const Routes: IRoutesProps[] = [
    {
        path: 'section', name: 'Section', element: Section, icon: 'Station',
        children: [], roles: ['']
    },
    {
        path: 'section/add', name: '', element: AddSection, icon: 'Station',
        children: [], roles: ['']
    },
    {
        path: 'section/:id', name: '', element: UpdateSection, icon: 'Station',
        children: [], roles: ['']
    },
    {
        path: 'station', name: 'Station', element: Station, icon: 'Station',
        children: [], roles: ['']
    },
    {
        path: 'station/add', name: '', element: AddStation, icon: 'Station',
        children: [], roles: ['']
    },
    {
        path: 'station/:id', name: '', element: UpdateStation, icon: 'Station',
        children: [], roles: ['']
    },
    {
        path: 'department', name: 'Department', element: Department, icon: 'Station',
        children: [], roles: ['']
    },
    {
        path: 'department/add', name: '', element: AddDepartment, icon: 'Station',
        children: [], roles: ['']
    },
    {
        path: 'department/:id', name: '', element: UpdateDepartment, icon: 'Station',
        children: [], roles: ['']
    },
    {
        path: 'employee', name: 'Employee', element: Employee, icon: 'Admin',
        children: [], roles: ['']
    },
    {
        path: 'employee/add', name: '', element: AddEmployee, icon: 'Admin',
        children: [], roles: ['']
    },
    {
        path: 'employee/:id', name: '', element: UpdateEmployee, icon: 'Admin',
        children: [], roles:  ['']
    },
];

const GetRoutes = () => {
    const { authStore } = RootStore;

    const GetByRole = () => {
        return Routes;
        // return Routes.filter((route) => route?.roles?.some((role) => role === authStore?.roleName));
    }

    return { GetByRole };
}

export default GetRoutes;
