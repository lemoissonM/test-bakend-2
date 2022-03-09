const express = require('express');
const routes = require('./src/route')
const { initializeData } = require('./src/data')

const app = express();

app.use(express.json());

app.use(routes);

const server = app.listen(4000, () => {
    initializeData();
    console.log('listening');
})

module.exports = {
    app,
    server
}