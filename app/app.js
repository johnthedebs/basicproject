import React, { Component } from "react"
import ReactDOM from "react-dom"
import { observer } from "mobx-react"

import "./app.sass"

import store from "./store"


@observer
class App extends Component {
  render() {
    return (
      <div>
        <h1>Cool Counter</h1>
        <p className="counter-state">Counter is at: {store.counter}</p>
        <button onClick={store.incrementCounter}>
          Increment counter
        </button>
        <p className="next-counter-state">
          Clicking the button will set the counter to: {store.counterPlusOne}
        </p>
      </div>
    )
  }
}


export default App
