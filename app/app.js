import { observer } from "mobx-react-lite"
import styled from "styled-components"


const Header = styled.h1`
  color: purple;
`


const App = observer(({store}) => {
  return (
    <div>
      <Header>Cool Counter</Header>
      <p className="counter-state">Counter is at: {store.counter}</p>
      <button onClick={store.incrementCounter}>
        Increment counter
      </button>
      <p className="next-counter-state">
        Clicking the button will set the counter to: {store.counterPlusOne}
      </p>
    </div>
  )
})


export default App
