import { IHttpRes } from "./ICommon"

export interface IGearRes extends IHttpRes {
    data: IGearData[]
}

export interface IGearData {
    gear: string
    gearTypeId: string
    stationId: string
    isActive: boolean
    createdAt: string
    updatedAt: string
    id: string
}
