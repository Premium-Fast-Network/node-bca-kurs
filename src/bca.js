const axios = require('axios')
const cheerio = require('cheerio')
const cheerioTableparser = require('cheerio-tableparser')

class BCA {
    constructor(url, debug = false) {
        this.url = 'https://www.bca.co.id/id/informasi/kurs'

        if (url) {
            this.url = url
        }

        this.debug = debug;
    }

    getCurrency() {
        return new Promise((resolve, reject) => {
            axios.get(this.url)
                .then((res) => {

                    // loaded result to cheerio
                    const $ = cheerio.load(res.data)

                    // loaded cheerio to tableparser
                    cheerioTableparser($)
                    const html = $('table').parsetable(true, true, true);

                    // parse date
                    const checkDate = html[1][0]
                    const dateAndTime = checkDate.replace('e-Rate ', '')
                    const dateOnly = dateAndTime.replace(' / ', ' ')

                    // make variable for save kurs
                    const dataKurs = {}

                    for (let i = 0; i < html[0].length; i++) {

                        // check if data isset
                        if (html[0][i + 2]) {

                            const currency = html[0][i + 2]
                            const buy = html[1][i + 2]
                            const sell = html[2][i + 2]

                            dataKurs[currency] = { buy, sell }
                        }
                    }

                    const result = {
                        check: dateOnly,
                        data: dataKurs
                    }

                    resolve(result)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
}

module.exports = BCA