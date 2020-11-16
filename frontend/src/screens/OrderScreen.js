import React,{useState,useEffect} from 'react' //useState
import {useDispatch,useSelector} from 'react-redux'
import { Row, Col , ListGroup, Image ,Card,Button} from 'react-bootstrap'
//import FormContainer from '../components/FormContainer'
import Loader from '../components/loader'
import Message from '../components/Message'
import {Link} from 'react-router-dom'
import {getOrderDetails,payOrder,deliveredOrder} from '../actions/orderAction'
import axios from 'axios'
import {PayPalButton} from 'react-paypal-button-v2'
import { ORDER_PAY_RESET,ORDER_DELIVER_RESET } from '../constants/orderConstants'

import {listMyOrder} from '../actions/orderAction'
import {cartReset} from '../actions/cartActions'
//import { CART_RESET_ITEM } from '../constants/cartConstants'

const OrderScreen = ({match,history}) => {
    const [sdkReady,setSdkReady] = useState(false)
    const orderId = match.params.id
    const dispatch = useDispatch()

    const addDecimals = (num) => {
        return (Math.round(num * 100)/100).toFixed(2)
    }

    const orderDetails = useSelector(state => state.orderDetails)
    const { order,loading,error } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading:loadingPay,success:successPay } = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading:loadingDeliver,success:successDeliver } = orderDeliver

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if(!userInfo){
            history.pushState('/login')
        }
        const addPaypalScript = async () => {
            const { data : clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        //addPaypalScript()
        if(!order || order._id !== orderId || successPay || successDeliver) {
            dispatch({ type: ORDER_PAY_RESET})
            dispatch({ type: ORDER_DELIVER_RESET})

            dispatch(cartReset())
            
            dispatch(getOrderDetails(orderId))
        }else if(!order.isPaid){
            if(!window.paypal){
                addPaypalScript()
            }else{
                setSdkReady(true)
            }
        }
       //dispatch(getOrderDetails(orderId))
    }, [dispatch,orderId,order,successPay,successDeliver,history,userInfo])

   const successPaymentHandler = (paymentResult) => {
       //console.log(paymentResult)
       dispatch(payOrder(orderId,paymentResult))
   }

   const backButtonHandler = () => {
       console.log("back")
        
        dispatch(listMyOrder())        
        
       
   }

   const deliverHandler = () => {
       dispatch(deliveredOrder(order))
   }

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
    <>
        <h1>Order {order._id}</h1>
        {!userInfo.isAdmin ? (
            <Link className='btn btn-dark my-3' onClick={backButtonHandler} to='/profile'>
            Go Back
        </Link>
        ) : (
            <Link className='btn btn-dark my-3' to='/admin/orderlist'>
            Go Back
        </Link>
        )}
        
        
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <strong>Name : </strong>{' '}{order.user.name} <br></br>
                    <strong>Email : </strong>{' '}{order.user.email} <br></br>
                    <p>
                        <strong>Address :</strong><br></br>
                        {order.shippingAddress.address}, <br></br>{order.shippingAddress.city}{' '}<br></br>
                        {order.shippingAddress.postalcode},{' '}<br></br>
                        {order.shippingAddress.country}
                    </p>
                    {order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt}</Message> : <Message variant='danger'>Not Delivered</Message>}
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <p>
                        <strong>Method: </strong>
                        {order.paymentMethod}
                    </p>
                    {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> : <Message variant='danger'>Not Paid</Message>}
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Order Items</h2>
                    {order.orderItems === 0 ? <Message>Order is empty</Message> : (
                        <ListGroup variant='flush'>
                           {order.orderItems.map((item,index) => (
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col>
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>
                                        </Col>
                                        <Col md={5}>
                                            {item.qty} x {item.price} = Rs. {addDecimals(item.qty * item.price)} 
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>Rs. {order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>Rs. {order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>Rs. {order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>Rs. {order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                      {!order.isPaid && !userInfo.isAdmin && (
                          <ListGroup.Item>
                              {loadingPay && <Loader />}
                              {!sdkReady ? <Loader /> : (
                                  <PayPalButton amount={order.totalPrice}  onSuccess={successPaymentHandler}/>
                              )}
                          </ListGroup.Item>
                      )}
                    {loadingDeliver && <Loader />}
                    {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                        <ListGroup.Item>
                            <Button type='button' className='btn btn-block' onClick={deliverHandler}>
                                Mark As Delivered
                            </Button>
                        </ListGroup.Item>
                    )}
                    </ListGroup>

                </Card>
            </Col>
            </Row>
    </>
}

export default OrderScreen
