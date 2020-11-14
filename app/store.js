import { configure, makeAutoObservable, toJS } from "mobx"

configure({ enforceActions: "observed" })


class Store {
  //
  // STATE
  counter = 1

  constructor() {
    makeAutoObservable(this)
  }


  //
  // COMPUTED VALUES
  get counterPlusOne () {
    return this.counter + 1
  }


  //
  // ACTIONS
  incrementCounter = () => {
    this.counter++
  }

  addToCounter = (value) =>{
    this.counter += value
  }
}


const store = new Store()

export default store
