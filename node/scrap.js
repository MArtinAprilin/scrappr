const {mama} = require('./react/react.js')
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()
const path = require('path')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

var num = 1
const url = '&pg='
const PORT = process.env.PORT || 3005;

for (let i = 0; i <= 7; i++) {

    var baseURL = 'https://www.list.am/category?q=traktr' + url + num
    console.log(baseURL);
    axios(baseURL, { headers: { "Accept-Encoding": "gzip,deflate,compress" } }).then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        var list = []

        $('a').each(function () {
            const csvWriter = createCsvWriter({
                path: 'file.csv',
                header: [
                    { id: 'title', title: 'TITLE' },
                    { id: 'price', title: 'PRICE' },
                    { id: 'location', title: 'LOCATION' },
                    { id: 'pageURL', title: 'PAGeURL' },
                    { id: 'image', title: 'IMAGE' },
                    { id: 'jpg', title: 'JPG' }
                ]
            })

            const a = $(this).children('img').attr('src')
            const b = $(this).children('img').attr('data-original')
            const title = $(this).find('a>div>div:first-child').text()
            const v = "https:"
            const image = v + a
            const jpg = v + b
            const price = $(this).find(".p").text()
            const location = $(this).find('.at').text()
            list.push({
                title: title,
                price: price,
                location: location,
                image: image,
                jpg: jpg
            })
            //console.log(list);

            var filtered = list.filter(function (x) {
                return x !== "https:undefined";
            });

            console.log(filtered);

            csvWriter.writeRecords(filtered)      
                .then(() => {
                    console.log('...Done');
                });

            app.get('/list', (req, res) => {
                res.sendFile(path.resolve("file.csv"), null, 4)
            })

        })

    })

    num = + i
//  

}
app.listen(PORT, () => console.log(`server runing on PORT: ${PORT}`))

console.log();

/*
//axios.get('https://www.list.am/item/16793715', { headers: { "Accept-Encoding": "gzip,deflate,compress" } }).then(html => {
*/