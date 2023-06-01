import { makeAutoObservable } from 'mobx'
import { IHeader } from './schema'
import { RouterPaths } from '@app/config/router'

class HeaderPage implements IHeader {
  currentPage = ''

  constructor() {
    makeAutoObservable(this)
  }

  setCurrentPage(newPage: RouterPaths | string) {
    this.currentPage = newPage
  }
}

export default new HeaderPage()
