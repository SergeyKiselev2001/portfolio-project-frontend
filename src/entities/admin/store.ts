import { makeAutoObservable } from 'mobx'
import { IAdminState, IReportsAdminPage, IUserAdminPage } from './schema'
import { getApiHeader, tryRequest } from '@shared/utils'
import { api } from '@app/api'

class Admin implements IAdminState {
  usersList = [] as IUserAdminPage[]
  reportsList = [] as IReportsAdminPage[]
  dashboard = {
    id: '',
  }

  constructor() {
    makeAutoObservable(this)
  }

  loadUsers = () => {
    tryRequest(async () => {
      const { data } = await api.get('/users/all', getApiHeader())
      this.usersList = data
    })
  }

  loadReports = () => {
    tryRequest(async () => {
      const { data } = await api.get('/reports/all', getApiHeader())
      this.reportsList = data
    })
  }

  deleteReport = (report_id: number) => {
    tryRequest(async () => {
      await api.delete(`/reports/${report_id}`, getApiHeader())
      this.reportsList = this.reportsList.filter(
        (report) => report.id != report_id
      )
    })
  }
}

export default new Admin()
