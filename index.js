const PORT = 3000
const axios = require('axios')
const cheerio = require('cheerio')
const { compareDocumentPosition } = require('domutils')
const { response } = require('express')
const express = require('express')

const app = express()


const url = 'https://www.minneapolis.org/calendar/'
axios(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const events = []
        $('.card__main',html).each(function(){
            const month = $(this).find('.cal-date__month').text()
            const day = $(this).find('.cal-date__day').text()
            const url = $(this).find('a').attr('href')
            events.push({
                month,
                day,
                url
            })
            
        })
        console.log(events)
    }).catch(err => console.log(err))
app.listen(PORT, function(){
    console.log('server running on PORT ' + PORT)
} )