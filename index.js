const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')

const PORT = process.env.PORT || 3000



const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'public')))
app.use(todoRoutes)
const options = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  };

async function start() {
try {
    await mongoose.connect('mongodb+srv://Alexander:1234@cluster0.vm4cphp.mongodb.net/todos', options)
    app.listen(PORT, () => {
        console.log('Server has been started')
    })
} catch (e) {
    console.log(e)
}

}

start()