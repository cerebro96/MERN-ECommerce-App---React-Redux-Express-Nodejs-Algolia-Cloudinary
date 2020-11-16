const express =require('express');
const dotenv = require('dotenv')
const colors = require('colors')
const path = require('path')
const morgan = require('morgan')
const connectDB = require('./config/db')
//const products = require('./data/products')
const productRoutes =  require('./routes/productRoutes').router
const usertRoutes =  require('./routes/userRouter').router
const orderRoutes =  require('./routes/orderRoutes').router
const uploadRoutes =  require('./routes/uploadRoutes').router
//const {notFound,errorHandler} = require('./middleware/errorMiddleware')

const app = express();

app.use(morgan('dev'))

app.use(express.json())

dotenv.config();

connectDB.connectDB();

app.use('/api/products',productRoutes)
app.use('/api/users',usertRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/upload',uploadRoutes)

app.get('/api/config/paypal',(req,res) => 
    res.send(process.env.PAYPAL_CLIENT_ID)
)


app.get('/api/config/algolia',(req,res) => 
    res.json({
        app_id: process.env.ALGOLIA_APP_ID,
        search_api_key: process.env.ALGOLIA_WEB_API_KEY,
        index_id: process.env.ALGOLIA_INDEX_ID,
        ALGOLIA_PRICE_DESC: process.env.ALGOLIA_PRICE_DESC,
        ALGOLIA_PRICE_ASC:process.env.ALGOLIA_PRICE_ASC,
        ALGOLIA_QUERY_SUGGESTIONS:process.env.ALGOLIA_QUERY_SUGGESTIONS,
    })
)

__dirname = path.resolve() // check const __dirname
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))

if(process.env.NODE_ENV === "Production"){
    app.use(express.static(path.join(__dirname,'/frontend/build')))

    app.get('*',(req,res) => res.sendFile(__dirname,'frontend','build','index.html'))
}else{
    app.get('/',(req,res) => {
        res.send('API Running....')
    })
}

app.use(require('./middleware/errorMiddleware').notFound)

app.use(require('./middleware/errorMiddleware').errorHandler)

const port = process.env.PORT || 5000

app.listen(5000,console.log(`${process.env.NODE_ENV} server running on ${port}...`.yellow.bold))