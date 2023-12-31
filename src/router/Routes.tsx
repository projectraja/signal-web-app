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

const Designation = lazy(() => import('../views/designation/Designation'));
const AddDesignation = lazy(() => import('../views/designation/AddDesignation'));
const UpdateDesignation = lazy(() => import('../views/designation/UpdateDesignation'));

const GearType = lazy(() => import('../views/gear-type/GearType'));
const AddGearType = lazy(() => import('../views/gear-type/AddGearType'));
const UpdateGearType = lazy(() => import('../views/gear-type/UpdateGearType'));

const Gear = lazy(() => import('../views/gear/Gear'));
const AddGear = lazy(() => import('../views/gear/AddGear'));
const UpdateGear = lazy(() => import('../views/gear/UpdateGear'));

const Employee = lazy(() => import('../views/authentication/Employee'));
const AddEmployee = lazy(() => import('../views/authentication/AddEmployee'));
const UpdateEmployee = lazy(() => import('../views/authentication/UpdateEmployee'));
const LevelCrossing = lazy(() => import('../views/level-crossing/LevelCrossing'));
const AddLevelCrossing = lazy(() => import('../views/level-crossing/AddLevelCrossing'));
const UpdateLevelCrossing = lazy(() => import('../views/level-crossing/UpdateLevelCrossing'));

const Routes: IRoutesProps[] = [
    {
        path: 'section', name: 'Section', element: Section, icon: 'Sections',
        children: [], roles: ['']
    },
    {
        path: 'section/add', name: '', element: AddSection, icon: 'Sections',
        children: [], roles: ['']
    },
    {
        path: 'section/:id', name: '', element: UpdateSection, icon: 'Sections',
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
        path: 'level-crossing', name: 'Level Crossing', element: LevelCrossing, icon: 'LevelCrossing',
        children: [], roles: ['']
    },
    {
        path: 'level-crossing/add', name: '', element: AddLevelCrossing, icon: 'LevelCrossing',
        children: [], roles: ['']
    },
    {
        path: 'level-crossing/:id', name: '', element: UpdateLevelCrossing, icon: 'LevelCrossing',
        children: [], roles: ['']
    },
    {
        path: 'department', name: 'Department', element: Department, icon: 'Department',
        children: [], roles: ['']
    },
    {
        path: 'department/add', name: '', element: AddDepartment, icon: 'Department',
        children: [], roles: ['']
    },
    {
        path: 'department/:id', name: '', element: UpdateDepartment, icon: 'Department',
        children: [], roles: ['']
    },
    {
        path: 'designation', name: 'Designation', element: Designation, icon: 'Designation',
        children: [], roles: ['']
    },
    {
        path: 'designation/add', name: '', element: AddDesignation, icon: 'Designation',
        children: [], roles: ['']
    },
    {
        path: 'designation/:id', name: '', element: UpdateDesignation, icon: 'Designation',
        children: [], roles: ['']
    },
    {
        path: 'roles', name: 'Roles', element: Department, icon: 'Roles',
        children: [], roles: ['']
    },
    {
        path: 'roles/add', name: '', element: AddDepartment, icon: 'Roles',
        children: [], roles: ['']
    },
    {
        path: 'roles/:id', name: '', element: UpdateDepartment, icon: 'Roles',
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
    {
        path: 'geas-type', name: 'Gear Types', element: GearType, icon: 'GearType',
        children: [], roles: ['']
    },
    {
        path: 'geas-type/add', name: '', element: AddGearType, icon: 'GearType',
        children: [], roles: ['']
    },
    {
        path: 'geas-type/:id', name: '', element: UpdateGearType, icon: 'GearType',
        children: [], roles:  ['']
    },
    {
        path: 'gear', name: 'Gears', element: Gear, icon: 'Gear',
        children: [], roles: ['']
    },
    {
        path: 'gear/add', name: '', element: AddGear, icon: 'Gear',
        children: [], roles: ['']
    },
    {
        path: 'gear/:id', name: '', element: UpdateGear, icon: 'Gear',
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
