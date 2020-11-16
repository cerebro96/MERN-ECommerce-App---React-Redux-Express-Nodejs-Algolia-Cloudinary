const express = require('express')
const {authUser,getUserProfile,registerUser,updateUserProfile,getUsers,deleteUsers,getUsersById,updateUser} = require('../controllers/userController')
const {protect,admin} = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login',authUser)
router.route('/profile').get(protect, getUserProfile).put(protect,updateUserProfile)
router.route('/:id').delete(protect, admin, deleteUsers).get(protect, admin,getUsersById).put(protect, admin,updateUser)

exports.router = router