import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteImg from './assets/vite.svg'
import './App.css'

import { Button } from '@chakra-ui/react'

function App() {
  const [count, setCount] = useState(0)

  const setCountThenPrint = () => {
    setCount((count) => count + 1)
    console.log('count', count)
    console.log(import.meta.env.VITE_SOME_KEY) // 123
    console.log(import.meta.env.VITE_APP_TITLE)
    console.log(import.meta.env.DB_PASSWORD) // undefined
  }
  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteImg} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={setCountThenPrint}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <Button colorScheme="blue">Button</Button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
