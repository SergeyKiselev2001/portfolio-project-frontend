import { makeAutoObservable } from 'mobx'
import { IBlockSideInfo } from './schema'

class BlockSideInfo implements IBlockSideInfo {
  showLoginModal = false

  constructor() {
    makeAutoObservable(this)
  }

  toggleLoginModal() {
    this.showLoginModal = !this.showLoginModal
  }
}

export default new BlockSideInfo()
