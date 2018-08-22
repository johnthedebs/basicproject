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
        <p>Counter is at: {store.counter}</p>
        <button onClick={store.incrementCounter}>
          Increment counter
        </button>
        <p>Clicking the button will set the counter to: {store.counterPlusOne}</p>
      </div>
    )
  }
}


export default App
