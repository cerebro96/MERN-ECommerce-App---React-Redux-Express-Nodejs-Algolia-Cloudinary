const mongoose =require('mongoose')
const dotenv = require('dotenv')
const colors = require('colors')
const products = require('./data/products')
const users = require('./data/users')
const user = require('./models/userModel').user
const product = require('./models/productModel').product
const order = require('./models/orderModel').order
const connectDB = require('./config/db')
const { indexOf } = require('./data/products')

dotenv.config();

connectDB.connectDB();

const importdata = async () => {
    try{
        await product.deleteMany();
        await user.deleteMany();
        await order.deleteMany();

        const crateuser = await user.insertMany(users)
        const adminuser =  crateuser[0]._id
        const sampleproduct = products.map(product => {
            return {...product,user: adminuser}
        })

        await product.insertMany(sampleproduct)
        console.log('Data Imported'.green.inverse)
        process.exit()
    }catch(error){
        console.log(`${error}`.red.inverse)
        process.exit(1)
    }
}

const destroydata = async () => {
    try{
        await order.deleteMany();
        await product.deleteMany();
        await user.deleteMany();

        console.log('Data Destroyed'.green.inverse)
        process.exit()
    }catch(error){
        console.log(`${error}`.red.inverse)
        process.exit(1)
    }
}

if(process.argv[2] === '-d')
{
    destroydata()
}else{
    importdata()   
}
