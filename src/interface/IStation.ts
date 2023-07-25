import { IHttpRes } from "./ICommon"

export interface IStationRes extends IHttpRes {
    data: IStationData[]
}

export interface IStationData {
    stationName: string
    stationCode: string
    sectionId: string
    isActive: boolean
    createdAt: string
    updatedAt: string
    id: string
}
