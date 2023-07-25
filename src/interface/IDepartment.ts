import { IHttpRes } from "./ICommon"

export interface IDepartmentRes extends IHttpRes {
    data: IDepartmentData[]
}

export interface IDepartmentData {
    department: string
    isActive: boolean
    createdAt: string
    updatedAt: string
    id: string
}
