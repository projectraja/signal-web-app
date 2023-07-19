import { FunctionComponent, SVGProps } from "react";

export interface ILayout {
    sidebarShow: boolean;
    sidebarUnfoldable: boolean;
    customColor: string;
}

export interface ILocalStorage {
    type: string,
    value: object
}

export interface INestedRoutesProps {
    category: string
    routes: INestedRouteProps[]
}

export interface INestedRouteProps {
    path: string
    name: string
    icon: string
}

export interface IRoutesProps {
    path: string
    name: string
    element?: any
    icon: string,
    children?: ITabRoutesProps[]
    roles?: string[]
}

export interface ITabRoutesProps {
    path: string
    name: string
    element?: any
    children?: ITabRoutesProps[]
    tabChildren?: ITabRoutesProps[]
    icon: string
}
