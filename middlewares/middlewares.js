const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const middlewares = [
    express.urlencoded({extended:true}),
    express.json(),
    express.static('public'),
    morgan('dev'),
    cors()
]

module.exports = (app) =>{
    middlewares.map(mid =>{
        return app.use(mid)
    })
}