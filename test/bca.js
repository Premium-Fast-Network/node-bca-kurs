const BCA = require('../src/bca');

const currency = new BCA();

currency.getCurrency()
    .then((res) => console.log(JSON.stringify(res)))
    .catch((err) => {
        console.error(err)
    })