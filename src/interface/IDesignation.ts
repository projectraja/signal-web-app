import { IHttpRes } from "./ICommon"

export interface IDesignationRes extends IHttpRes {
    data: IDesignationData[]
}

export interface IDesignationData {
    designation: string
    roleId: string
    departmentId: string
    isActive: boolean
    createdAt: string
    updatedAt: string
    id: string
}
