import { IHttpRes } from "./ICommon"

export interface ISectionRes extends IHttpRes {
    data: ISectionData[]
}

export interface ISectionData {
    sectionName: string
    isActive: boolean
    createdAt: string
    updatedAt: string
    id: string
}
