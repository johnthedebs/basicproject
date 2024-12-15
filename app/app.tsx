import "twin.macro"
import { observer } from "mobx-react"
import store from "./store"


const App = () => {
  return (
    <div tw="p-4 m-5">
      <h1 tw="mb-4 text-3xl font-semibold">Cool Counter</h1>
      <p>Counter is at: {store.counter}</p>
      <div tw="flex gap-2 mt-2 mb-2">
        <button
          tw="p-1 px-4 text-white bg-blue-600 rounded active:bg-blue-500 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={store.incrementCounter}
          disabled={store.loading}
        >
          {store.loading ? "Incrementing..." : "Increment counter"}
        </button>
      </div>
      <p>
        Clicking the increment button will set the counter to: {store.counterPlusOne}
      </p>
      <div tw="flex gap-2 mt-2 mb-2">
        <button
          tw="p-1 px-4 text-white bg-red-600 rounded active:bg-red-500 hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={store.resetCounter}
          disabled={store.loading}
        >
          {store.loading ? "Resetting..." : "Reset counter"}
        </button>
      </div>
    </div>
  )
}


export default observer(App)
