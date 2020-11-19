import { observer } from "mobx-react"

import "./app.css"


const App = observer(({store}) => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold mb-4">Cool Counter</h1>
      <p>Counter is at: {store.counter}</p>
      <button
        className="bg-blue-600 rounded p-1 px-4 text-white active:bg-blue-500 hover:bg-blue-700 transition-colors"
        onClick={store.incrementCounter}
      >
        Increment counter
      </button>
      <p>
        Clicking the button will set the counter to: {store.counterPlusOne}
      </p>
    </div>
  )
})


export default App
