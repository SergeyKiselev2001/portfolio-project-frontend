import { makeAutoObservable } from 'mobx'
import { IMainPage } from './schema'

class MainPage implements IMainPage {
  showLoginModal = false

  constructor() {
    makeAutoObservable(this)
  }

  toggleLoginModal() {
    this.showLoginModal = !this.showLoginModal
  }
}

export default new MainPage()
