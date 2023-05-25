export interface IAuthorizationState {
  auth: {
    token: string
    refresh_token: string
  }
}

export interface IFetchTokenDto {
  login: string
  password: string
  rememberMe: boolean
}
