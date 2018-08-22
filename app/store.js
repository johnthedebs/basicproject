import { action, configure, computed, observable, toJS } from "mobx"

configure({ enforceActions: true })


class Store {
  //
  // STATE
  //

  @observable counter = 1


  //
  // COMPUTED VALUES
  //

  @computed get counterPlusOne() {
    return this.counter + 1
  }


  //
  // ACTIONS
  //

 @action incrementCounter = () => {
    this.counter++
  }

  @action addToCounter = (value) => {
    this.counter += value
  }
}


const store = new Store()

export default store
