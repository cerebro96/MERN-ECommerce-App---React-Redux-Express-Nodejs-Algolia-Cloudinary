const Product = require('../models/productModel').product
const asynchandler =  require('express-async-handler')
const { product } = require('../models/productModel')
const index = require('../config/algoliaLogin').index
const { cloudinary } = require('../config/CloudinaryAuth')
const fs = require("fs")
const path = require("path")

const getProducts = asynchandler(async (req,res) =>{
    const pageSize = Number(req.query.pageSize) || 5
    const page = Number(req.query.pageNumber) || 1

    const count = await Product.countDocuments({})
    const products = await Product.find({}).limit(pageSize).skip(pageSize * (page - 1))
    res.json({products, page , pages: Math.ceil(count / pageSize)})
})

const getProductById = asynchandler(async (req,res) =>{
    const product =  await Product.findById(req.params.id)

    if(product){
        res.json(product)
    }else{
        res.status(404).json({message: 'Product Not Found'})
    }
})

const deleteProduct = asynchandler(async (req,res) =>{
    const product =  await Product.findById(req.params.id)
    
    if(product){
        await product.remove()

        //ALGOLIA DELETE PRODUCT START
        index.deleteObject(req.params.id).then(() => { 
            console.log('Product Deleted')
        })
        //ALGOLIA DELETE PRODUCT END

        res.json({message: 'Product Removed'})
    }else{
        res.status(404)
        throw new Error('Product Not Found')
    }
})

const createProduct = asynchandler(async (req,res) =>{ // create product
    let {name,price,image,brand,category,countInStock,description,imageBase64} = req.body

    //console.log(process.env.CLOUDINARY_FOLDER) //base64 encoded image
    // CLOUDINARY IMAGE UPLOAD
        try {
            const uploadresponse = await cloudinary.uploader.upload(imageBase64, {
                upload_preset: process.env.CLOUDINARY_FOLDER,
                width: 300,
                height: 300,
            })
            //console.log(uploadresponse)

            if(uploadresponse.url != undefined || uploadresponse.url != ""){
                const pathToFile = image
        
                try {
                fs.unlinkSync(path.join(__dirname, "/../../"+ pathToFile))
                console.log("Successfully deleted the file.")
                } catch(err) {
                throw err
                }
                console.log(uploadresponse.url)
                image = uploadresponse.url
            }

            } catch (error) {
                console.log(error)
            }
   
        // CLOUDINARY IMAGE UPLOAD

    const product = await Product.create({
        user: req.user._id,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description
    })
    
    // Algolia Search Push
    // START
    const api_product = [
        {
            _id: product._id,
            name: product.name,
            image: product.image,
            brand: product.brand,
            category: product.category,
            description: product.description,
            price: product.price,
            countInStock: product.countInStock,
            rating: product.rating,
            objectID: product._id,
        }
    ]

    index
    .saveObjects(api_product,{ autoGenerateObjectIDIfNotExist: true })
    .then(({ objectIDs }) => {
        console.log(objectIDs)
    })
    .catch(err => {
        console.log(err)
    })

    // END
    
    if(product){
        res.status(201).json(product)
    }else{
        res.status(400)
        throw new Error('Invalid Product data')
    }
})

const productUpdate = asynchandler(async (req,res) =>{
    
    const {name,price,image,brand,category,countInStock,description,imageBase64} = req.body

    //console.log(imageBase64) // image OK

    const prodcuct = await Product.findById(req.params.id)

    if(prodcuct){
        prodcuct.name = name ||  prodcuct.name
        prodcuct.price = price || prodcuct.price

        //IMAGE START

        if(imageBase64 === undefined || imageBase64 === ""){
            prodcuct.image = image  || prodcuct.image
        }else{

             // CLOUDINARY IMAGE UPLOAD
            try {
            const uploadresponse = await cloudinary.uploader.upload(imageBase64, {
                upload_preset: process.env.CLOUDINARY_FOLDER,
                width: 300,
                height: 300,
            })
            
            
            if(uploadresponse.url != undefined || uploadresponse.url != ""){
                const pathToFile = image
        
                try {
                fs.unlinkSync(path.join(__dirname, "/../../"+ pathToFile))
                console.log("Successfully deleted the file.")
                } catch(err) {
                throw err
                }
                prodcuct.image = uploadresponse.url
            }

            } catch (error) {
                console.log(error)
            }
   
            // CLOUDINARY IMAGE UPLOAD
        }

        //IMAGE END

        prodcuct.brand = brand  || prodcuct.brand 
        prodcuct.category = category || prodcuct.category
        prodcuct.countInStock = countInStock || prodcuct.countInStock
        prodcuct.description = description || prodcuct.description

        const api_product = 
            {
                _id: prodcuct._id,
                name: prodcuct.name,
                image: prodcuct.image,
                brand: prodcuct.brand,
                category: prodcuct.category,
                description: prodcuct.description,
                price: prodcuct.price,
                countInStock: prodcuct.countInStock,
                rating: prodcuct.rating,
                objectID: prodcuct._id,
            }
        

        index.partialUpdateObject(api_product)
        index.partialUpdateObject(api_product, {
            // All the following parameters are optional
            createIfNotExists: true,
            // + any requestOptions
        })
        .catch(err => {
            console.log(err)
        })

        const updatedProduct = await prodcuct.save()

        res.json(updatedProduct)
    }else{
     res.status(404)
     throw new Error('Product Not Found')
    }
 })

 const createProductReview = asynchandler(async (req,res) =>{
    
    const {rating,comment} = req.body
    const product = await Product.findById(req.params.id)
    if(product){
       //console.log(req.user._id)
       const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
       if(alreadyReviewed){
        res.status(404)
        throw new Error('Product already reviewed')
       }

       const review = {
           name: req.user.name,
           rating: Number(rating),
           comment,
           user: req.user._id,
       }


       product.reviews.push(review)

       product.numReviews = product.reviews.length
       product.rating = product.reviews.reduce((acc,item) => item.rating + acc, 0) / product.reviews.length

       await product.save()
       res.status(201).json({message: 'Review added'})

    }else{
     res.status(404)
     throw new Error('Product Not Found')
    }
 })

 const getTopRatedProduct = asynchandler(async (req,res) =>{

    const products = await Product.find({}).sort({rating: -1}).limit(5)
    res.json(products)
    
 })

module.exports = {getProducts,getProductById,deleteProduct,createProduct,productUpdate,createProductReview,getTopRatedProduct}