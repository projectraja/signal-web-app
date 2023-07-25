import { IHttpRes } from "./ICommon"

export interface IEmployeesRes extends IHttpRes {
    data: IEmployeesData[]
}

export interface IEmployeesData {
    empId: number
    name: string
    designationId: string
    email: string
    phone: string
    isActive: boolean
    createdBy?: string
    updatedBy?: string
    createdAt: string
    updatedAt: string
    id: string
}
