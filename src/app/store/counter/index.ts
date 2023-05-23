import { makeAutoObservable } from 'mobx'
import { ICounterState } from './schema'

class Counter implements ICounterState {
  count = 1

  constructor() {
    makeAutoObservable(this)
  }

  increment() {
    this.count = this.count + 1
  }

  decrement() {
    this.count = this.count - 1
  }
}

export default new Counter()
