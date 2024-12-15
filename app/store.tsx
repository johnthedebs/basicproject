import { configure, makeAutoObservable, runInAction } from "mobx"
import { getCookie } from "./utils"

configure({ enforceActions: "observed" })


class Store {
  //
  // STATE
  counter = 1
  loading = false

  constructor() {
    makeAutoObservable(this)
    this.fetchCounter()
  }


  //
  // COMPUTED VALUES
  get counterPlusOne () {
    return this.counter + 1
  }


  //
  // ACTIONS
  fetchCounter = async () => {
    try {
      const response = await fetch("/api/counter")
      const data = await response.json()
      runInAction(() => {
        this.counter = data.value
      })
    } catch (error) {
      console.error("Failed to fetch counter:", error)
    }
  }

  incrementCounter = async () => {
    if (this.loading) return
    
    this.loading = true
    try {
      const response = await fetch("/api/counter/increment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie("csrftoken") || "",
        },
      })
      const data = await response.json()
      runInAction(() => {
        this.counter = data.value
        this.loading = false
      })
    } catch (error) {
      console.error("Failed to increment counter:", error)
      runInAction(() => {
        this.loading = false
      })
    }
  }
}


const store = new Store()

export default store
