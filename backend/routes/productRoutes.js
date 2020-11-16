const express = require('express')
const {getProducts,getProductById,deleteProduct,createProduct,productUpdate,createProductReview,getTopRatedProduct} = require('../controllers/productController')
const {protect,admin} = require('../middleware/authMiddleware')
//const Product = require('../models/productModel').product
//const asynchandler =  require('express-async-handler')
const router = express.Router()

router.route('/').get(getProducts).post(protect , admin, createProduct)
router.route('/:id/reviews').post(protect, createProductReview)
router.get('/top',getTopRatedProduct)
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, productUpdate)
/*router.get('/',asynchandler(async (req,res) => {
    const products = await Product.find({})
    res.json(products)
}))

router.get('/:id',asynchandler(async (req,res) => {
    const product =  await Product.findById(req.params.id)

    if(product){
        res.json(product)
    }else{
        res.status(404).json({message: 'Product Not Found'})
    }
}))*/

exports.router = router