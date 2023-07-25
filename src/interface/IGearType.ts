import { IHttpRes } from "./ICommon"

export interface IGearTypeRes extends IHttpRes {
    data: IGearTypeData[]
}

export interface IGearTypeData {
    gearType: string
    isActive: boolean
    createdAt: string
    updatedAt: string
    id: string
}
