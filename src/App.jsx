import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Companies from './components/Companies'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Companies/>
    </>
  )
}

export default App
