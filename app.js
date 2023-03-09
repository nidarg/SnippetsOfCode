
const path = require('path')
const express = require('express')
require('dotenv').config()

// extra security packages

const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

require('express-async-errors')
const connectDB = require('./db/connectDB')

const app = express()

const notFoundRouteMiddleware = require('./middleware/not-route-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const authenticationMiddleware = require('./middleware/authentication')
const authRoutes = require('./routes/authRoutes')
const snippetRoutes = require('./routes/snippetRoutes')

// If you are behind a proxy/load balancer (usually the case with most hosting services, e.g. Heroku, Bluemix, AWS ELB, Nginx, Cloudflare, Akamai, Fastly, Firebase Hosting, Rackspace LB, Riverbed Stingray, etc.)
app.set('trust proxy', 1)
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100,
}))
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())

app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/snippets', authenticationMiddleware, snippetRoutes)

app.use(express.static(path.join(__dirname, './client/build')))

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'client','build', 'index.html'))
})

app.use(notFoundRouteMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>console.log(`Server is listening on port ${port}`))
    } catch (error) {
        console.log(error);
    }
}

start()


