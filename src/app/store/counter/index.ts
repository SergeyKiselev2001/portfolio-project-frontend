import { makeAutoObservable } from 'mobx'
import { ICounterState } from './schema'
import { api } from '@app/api'

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

  async fetchData() {
    const { data } = await api.get('/number')
    console.log(data)
    this.count = data.da
  }
}

export default new Counter()
