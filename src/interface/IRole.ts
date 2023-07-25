import { IHttpRes } from "./ICommon"

export interface IRoleRes extends IHttpRes {
    data: IRoleData[]
}

export interface IRoleData {
    role: string
    isActive: boolean
    createdBy: string
    updatedBy: string
    createdAt: string
    updatedAt: string
    id: string
}
