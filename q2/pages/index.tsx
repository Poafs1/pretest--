import Head from 'next/head'
import fetch from 'node-fetch'
import { useEffect, useState } from 'react'

const Index = () => {
  const [filter, setFilter] = useState<string>('')
  const [text, setText] = useState<string[]>([])
  const [display, setDisplay] = useState<string[]>([])

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    const result = text.filter(t => t.toLowerCase().includes(filter.toLowerCase()))
    setDisplay([...result])
  }, [filter])

  const getData = async () => {
    const res = await fetch('https://api.publicapis.org/categories')
    const data = await res.json()
    setText([...data])
    setDisplay([...data])
  }

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
        <div>
          <input type="text" placeholder="Filter" value={filter} onChange={handleFilterChange}/></div>
        <div>
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