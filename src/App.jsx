import { useState } from "react"

import Sorting from "./Sorting"

export function arrayRandomizer(length) {
  let newArray = []
  for(let i = 0 ; i < length ; i++) {
    newArray.push({
      isActive: false,
      value: Math.floor(Math.random() * 9 ) + 1
    })
  }
  return newArray
}

function App() {
  const [array, setArray] = useState([...arrayRandomizer(10)])

  return (
    <>
      <div className="container flex gap-1 m-auto p-2 flex-col min-h-screen justify-center">
        <Sorting array={array} setArray={setArray} />
      </div>
    </>
  )
}

export default App
