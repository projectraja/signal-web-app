import { IHttpRes } from "./ICommon"

export interface IUserInfo {
  userId: number
  accessToken: string
  refreshToken: string
  name: string
  empId: string
  roleName: string
}

export interface ILoginRes extends IHttpRes {
  data?: ILoginData
}

export interface ILoginData {
  _id: string
}

export interface IOTPVerificationRes extends IHttpRes {
  data?: IOTPVerificationData
}

export interface IOTPVerificationData {
  id: string
  empId: number
  isActive: boolean
  designationId: string
  accessToken: string
  refreshToken: string
}
