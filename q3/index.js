const fetch = require('node-fetch')
const cheerio = require('cheerio')

let req = process.argv.slice(2)[0]

const getData = async () => {
  const response = await fetch('https://codequiz.azurewebsites.net/', {
    headers: {
      cookie: 'hasCookie=true'
    }
  })
  const data = await response.text()
  return data
}

(async () => {
  const result = await getData()
  const $ = cheerio.load(result)
  $('tbody > tr').slice(1).each((i, elem) => {
    const tdArr = $(elem).children().toArray()
    if ($(tdArr[0]).text().trim() == req) {
      console.log($(tdArr[1]).text())
      return
    }
  })
})()
