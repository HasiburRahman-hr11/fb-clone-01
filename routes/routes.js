const authRoute = require('./authRoute');
const postRoute = require('./postRoute');
const profileRoute = require('./profileRoute');
const homeRoute = require('./homeRoute');
const searchRoute = require('./searchRoute');

const routes = [
    {
        path: '/api/auth',
        handler: authRoute
    },
    {
        path: '/api/posts',
        handler: postRoute
    },
    {
        path: '/api/profile',
        handler: profileRoute
    },
    {
        path: '/api/search',
        handler:searchRoute
    },
    {
        path:'/api',
        handler:homeRoute
    },
    
]

module.exports = (app) =>{
    routes.map(route =>{
        if(route.path == '/'){
            return app.get(route.path , route.handler)
        }else{
            return app.use(route.path , route.handler)
        }
    })
}