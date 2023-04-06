const axios = require('axios')
const cheerio = require('cheerio')
var baseURL = 'https://www.list.am/category?q=bnakaran'

axios(baseURL, { headers: { "Accept-Encoding": "gzip,deflate,compress" } }).then(response => {
    const html = response.data
    const $ = cheerio.load(html)
    var list = []

    $('.dl > a').each(function (index, elem) {
        const imgURL = $(this).children('img').attr('src')
        console.log(imgURL)
    })

    /*$('a', html).each(function () {
        const a = $(this)
        const imgURL = $(this).find('img').attr('src')
        const title = $(this).find('a>div>div:first-child').text()
        var URl = $(this).attr('href')
        const listURL = 'https://www.list.am'
        const pageURL = listURL + URl
        const price = $(this).find(".p").text()
        const location = $(this).find('.at').text()
        list.push({ title, price, location, pageURL, imgURL })
        //console.log(list, 'kuku');

    })*/

})




/*

//axios.get('https://www.list.am/item/16793715', { headers: { "Accept-Encoding": "gzip,deflate,compress" } }).then(html => {
*/