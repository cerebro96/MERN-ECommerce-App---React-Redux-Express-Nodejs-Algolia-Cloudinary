const User = require('../models/userModel').user
const asynchandler =  require('express-async-handler')
const generateToken = require('../util/generateToken').generateToken

const authUser = asynchandler(async (req,res) =>{
    const {email,password} = req.body
    const user = await User.findOne({email})
    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error('Invalid email or Password')
    }
})

const registerUser = asynchandler(async (req,res) =>{
    const {name,email,password} = req.body

    const userExsists = await User.findOne({email})
    if(userExsists){
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid User data')
    }
})

const getUserProfile = asynchandler(async (req,res) =>{
   //
   const user = await User.findById(req.user._id)
   if(user){
       res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
       })
   }else{
    res.status(404)
    throw new Error('User Not Found')
   }
   //res.send('success')
})

const updateUserProfile = asynchandler(async (req,res) =>{
    //
    const user = await User.findById(req.user._id)
    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password){
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else{
     res.status(404)
     throw new Error('User Not Found')
    }
    //res.send('success')
 })

 const getUsers = asynchandler(async (req,res) =>{
    const users = await User.find({})
    res.json(users)
 })


 const deleteUsers = asynchandler(async (req,res) =>{
    const user = await User.findById(req.params.id)
    if(user){
        await user.remove()
        res.json({message: 'User removed'})
    }else{
        res.status(404)
        throw new Error('User not found')
    }
  
 })

 const getUsersById = asynchandler(async (req,res) =>{
    const user = await User.findById(req.params.id).select('-password')
    if(user){
        res.json(user)
    }else{
        res.status(404)
        throw new Error('User not found')
    }
    
 })

 const updateUser = asynchandler(async (req,res) =>{
    //
    const user = await User.findById(req.params.id)
    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin =  req.body.isAdmin 

        const updatedUser = await user.save()

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    }else{
     res.status(404)
     throw new Error('User Not Found')
    }
    //res.send('success')
 })

module.exports = {authUser,getUserProfile,registerUser,updateUserProfile,getUsers,deleteUsers,getUsersById,updateUser}