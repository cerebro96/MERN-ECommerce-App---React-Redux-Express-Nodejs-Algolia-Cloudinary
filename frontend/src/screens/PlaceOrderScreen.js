import React,{useEffect} from 'react' //useState
import {useDispatch,useSelector} from 'react-redux'
import {Button, Row, Col , ListGroup, Image ,Card} from 'react-bootstrap'
//import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'
import {Link} from 'react-router-dom'
import {createOrder} from '../actions/orderAction'

const PlaceOrderScreen = ({history}) => {
    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)

    //const userLogin = useSelector((state) => state.userLogin)
    //const { userInfo } = userLogin

    //Calculate Prices
    const addDecimals = (num) => {
        return (Math.round(num * 100)/100).toFixed(2)
    }
    cart.ItemsPrice = addDecimals(cart.cartItems.reduce((acc,item) => acc + item.price * item.qty, 0 ))
    cart.ShippingPrice = addDecimals(cart.ItemsPrice < 100 ? 0 : 100)
    cart.TaxPrice = addDecimals(Number((0.15*cart.ItemsPrice).toFixed(2)))
    cart.TotalPrice = addDecimals(Number(cart.ItemsPrice) + Number(cart.ShippingPrice) + Number(cart.TaxPrice))

    const orderCreate = useSelector(state => state.orderCreate)
    const { order,success,error } = orderCreate

    useEffect(() => {
        if(success){
            history.push(`/order/${order._id}`)
        }
       
    }, [history,success,order])

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.ItemsPrice,
            shippingPrice: cart.ShippingPrice,
            taxPrice: cart.TaxPrice,
            totalPrice: cart.TotalPrice,//totalPrice
        })
        )
        console.log('Go')
    }

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p>
                        <strong>Address :</strong><br></br>
                        {cart.shippingAddress.address}, <br></br>{cart.shippingAddress.city}{' '}<br></br>
                        {cart.shippingAddress.postalcode},{' '}<br></br>
                        {cart.shippingAddress.country}
                    </p>
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <p>
                        <strong>Method: </strong>
                        {cart.paymentMethod}
                    </p>
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Order Items</h2>
                    {cart.cartItems === 0 ? <Message>Your Cart is empty</Message> : (
                        <ListGroup variant='flush'>
                           {cart.cartItems.map((item,index) => (
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
                                <Col>Rs. {cart.ItemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>Rs. {cart.ShippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>Rs. {cart.TaxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>Rs. {cart.TotalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                        {error && <Message variant='danger'>{error}</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='btn btn-primary btn-block' disabled={cart.cartItems === 0} onClick={placeOrderHandler}>Place Order</Button>    
                        </ListGroup.Item>
                    </ListGroup>

                </Card>
            </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen
