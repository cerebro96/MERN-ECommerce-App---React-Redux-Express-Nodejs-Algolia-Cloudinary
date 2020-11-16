const Order = require('../models/orderModel').Order
const Product = require('../models/productModel').product
const asynchandler =  require('express-async-handler')

const addOrderItems = asynchandler(async (req,res) =>{
    const { orderItems,shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPrice } = req.body

    if(orderItems && orderItems.lenght === 0){
        res.status(400)
        throw new Error('No Order Items')
        return
    }else{

        const order = new Order({orderItems,user: req.user._id ,shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPrice})

        const createdOrder = await order.save()

        orderItems.map(async (item) => { // Product Reduce
            const product = await Product.findById(item.product)

            if (product) {
                product.countInStock = product.countInStock - item.qty
            }

            await product.save()
            
        })

        res.status(201).json(createdOrder)
    }
})

const getOrderById = asynchandler(async (req,res) =>{
   const order = await Order.findById(req.params.id).populate('user','name email')

   if(order){
       res.json(order)
   }else{
       res.status(404)
       throw new Error('Order not Found')
   }
})

const updateOrderToPaid = asynchandler(async (req,res) =>{
    const order = await Order.findById(req.params.id)
 
    if(order){
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id:  req.body.id,
            status:  req.body.status,
            update_time:  req.body.update_time,
            email_address:  req.body.payer.email_address
        }
    const updatedOrdr = await order.save()

    res.json(updatedOrdr)
    
    }else{
        res.status(404)
        throw new Error('Order not Found')
    }
 })

 const getMyOrders = asynchandler(async (req,res) =>{
    const orders = await Order.find({user : req.user._id })
    if(orders){
        res.json(orders)
    }
    else{
        res.json('order not found')
    }
    
 })

 const getAllOrders = asynchandler(async (req,res) =>{
    const orders = await Order.find({}).populate('user','id name')
    res.json(orders)
 })

 const updateOrderToDelivered = asynchandler(async (req,res) =>{
    const order = await Order.findById(req.params.id)
 
    if(order){
        order.isDelivered = true
        order.deliveredAt = Date.now()

    const updatedOrder = await order.save()

    res.json(updatedOrder)
    
    }else{
        res.status(404)
        throw new Error('Order not Found')
    }
 })

module.exports = {addOrderItems,getOrderById,updateOrderToPaid,getMyOrders,getAllOrders,updateOrderToDelivered}