const mongoose = require('mongoose')

const connectDB = async () => {

    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{
        
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })

        console.log(`MongoDB Connected : ${conn.connection.host}`.cyan.underline.bold)
    }catch(error){
        console.log(`Error: ${error}`.red.underline.bold)
        process.exit(1)
    }

    
}

exports.connectDB =  connectDB;