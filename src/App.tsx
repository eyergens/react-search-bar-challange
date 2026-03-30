import { useState } from 'react'
import './App.css'
import Quotes from './pages/Quotes'

function App() {
  const [quotes, setQuotes] = useState<string[]>([]);

  function addQuote(newQuote: string) {
    setQuotes((quotes) => [...quotes, newQuote])
  }

  return (
    <>
      <Quotes quotes={quotes} addQuote={addQuote} />
    </>
  )
}

export default App
