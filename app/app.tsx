import "twin.macro"
import { observer } from "mobx-react"
import store from "./store"


const App = () => {
  return (
    <div tw="p-4 m-5" css={`background: blue;`}>
      <h1 tw="mb-4 text-3xl font-semibold">Cool Counter</h1>
      <p>Counter is at: {store.counter}</p>
      <button
        tw="p-1 px-4 text-white bg-blue-600 rounded active:bg-blue-500 hover:bg-blue-700 transition-colors"
        onClick={store.incrementCounter}
      >
        Increment counter
      </button>
      <p>
        Clicking the button will set the counter to: {store.counterPlusOne}
      </p>
    </div>
  )
}


export default observer(App)
