const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require("path");
const PORT = process.env.PORT || 8080

const app = express();

// middlewares
const useMiddlewares = require('./middlewares/middlewares');
useMiddlewares(app)
app.use('/public' , express.static('public'));

// For Deployment
app.use(express.static(path.join(__dirname, "client", "build")))

// Using ROutes
const useRoutes = require('./routes/routes');
useRoutes(app)


// For Deployment
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// Connect with mongoDB
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.11tp6.mongodb.net/${process.env.DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
.then(()=>{
    console.log('Database Connected');
    app.listen(PORT , ()=>{
        console.log(`Server is connected at http://localhost:${PORT}`)
    })
})
.catch(e=>{
    console.log(e);
})