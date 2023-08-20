import { SystemRoles } from '@entities/user'

export interface IAdminState {
  usersList: IUserAdminPage[]
  reportsList: IReportsAdminPage[]
  dashboard: {
    id: string
  }
}

export interface IUserAdminPage {
  id: number
  login: string
  systemRole: SystemRoles
  avatar: {
    src: string
    alt: string
  }
}

export interface IReportsAdminPage {
  id: number
  post_id: number
  post_title: string
  user_login: string
}
