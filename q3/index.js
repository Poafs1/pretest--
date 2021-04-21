const fetch = require('node-fetch')
const cheerio = require('cheerio')

// Get search fund argument
let req = process.argv.slice(2)[0]

// Fetcing HTML data from uri *note that we need to send hasCookie=true to allow login
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
  // Load html into cheerio
  const $ = cheerio.load(result)
  // Loop table
  $('tbody > tr').slice(1).each((i, elem) => {
    const tdArr = $(elem).children().toArray()
    // If found equal fund => return NAV
    if ($(tdArr[0]).text().trim() == req) {
      console.log($(tdArr[1]).text())
      return
    }
  })
})()
