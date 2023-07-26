import { IHttpRes } from "./ICommon"

export interface ILevelCrossingRes extends IHttpRes {
    data: ILevelCrossingData[]
}

export interface ILevelCrossingData {
    lc: string
    isActive: boolean
    createdAt: string
    updatedAt: string
    id: string
}
