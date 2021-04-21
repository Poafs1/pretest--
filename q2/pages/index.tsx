import Head from 'next/head'
import fetch from 'node-fetch'
import { useEffect, useState } from 'react'

const Index = () => {
  const [filter, setFilter] = useState<string>('')
  const [text, setText] = useState<string[]>([])
  const [display, setDisplay] = useState<string[]>([])

  // Fetching data on page load
  useEffect(() => {
    getData()
  }, [])

  // Display filter data on text input change
  useEffect(() => {
    const result = text.filter(t => t.toLowerCase().includes(filter.toLowerCase()))
    setDisplay([...result])
  }, [filter])

  // Fetch data from uri
  const getData = async () => {
    const res = await fetch('https://api.publicapis.org/categories')
    const data = await res.json()
    setText([...data])
    setDisplay([...data])
  }

  // Handle user change input (filter)
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setFilter(value)
  }

  return(
    <div className='container'>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='main'>
        {/* Input form */}
        <div>
          <input type="text" placeholder="Filter" value={filter} onChange={handleFilterChange}/></div>
        <div>
          {/* Table for display array from fetching data */}
          <table>
            <tbody>
              {display.map(x => (
                <tr key={x.toLowerCase()}><td>{x}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Index