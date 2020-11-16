import {createStore,combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productListReducer,productDetailReducer,productDeleteReducer,productCreateReducer,productUpdateReducer,productReviewCreateReducer,productTopRatedReducer} from './reducers/productReducers'
import {cartReducer} from './reducers/cartReducers'
import {userLoginReducer,userRegisterReducer,userDetailsReducer,userUpdateProfileReducer,userListReducer,userDeleteReducer,userUpdateReducer} from './reducers/userReducers'
import {orderCreateReducer,orderDetailsReducer,orderPayReducer,orderListReducer,orderListAdminReducer,orderDeliverReducer} from './reducers/orderReducers'
import {GetAlgolioAPIReducer} from './reducers/AlgolioGetAPIReducers'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMyList: orderListReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate : userUpdateReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate:productUpdateReducer,
    orderList: orderListAdminReducer,
    orderDeliver: orderDeliverReducer,
    productReviewCreate: productReviewCreateReducer,
    AlgolioAPI:GetAlgolioAPIReducer,
    productTopRated: productTopRatedReducer,
})

const cartItemFromStroge = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStroge = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressFromStroge = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart: {cartItems: cartItemFromStroge , shippingAddress: shippingAddressFromStroge },
    userLogin : {userInfo:userInfoFromStroge },
}

const middleware = [thunk]

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store