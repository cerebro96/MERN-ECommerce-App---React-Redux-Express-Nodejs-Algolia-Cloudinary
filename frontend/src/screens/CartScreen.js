import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import {addToCart,removeFromCart} from '../actions/cartActions'
import {Row,Col,ListGroup,Image,Form,Button,Card} from 'react-bootstrap'

const CartScreen = ({match,location,history}) => {

    const productid = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    console.log(cartItems)

    const addDecimals = (num) => {
        return (Math.round(num * 100)/100).toFixed(2)
    }

    useEffect(() => {
        if(productid){
            dispatch(addToCart(productid,qty))
            
        }
        
    }, [dispatch,productid,qty])

    const remoreItemFromhandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        //console.log('checkout')
        history.push('/login?redirect=shipping')
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (<Message variant='red'>Your cart is empty<Link to='/'> Go Back</Link></Message>) : (
                    <ListGroup variant='flush'>
                            {cartItems.map(item => (
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded/>
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={2}><strong>Rs. {item.price}</strong></Col>
                                        <Col md={2}>
                                        <Form.Control as='select' value={item.qty} onChange={(e) => dispatch(addToCart(item.product,Number(e.target.value)))}>
                                        {
                                            [...Array(item.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x+1}
                                            </option>
                                            ))
                                        }
                            </Form.Control>
                                        </Col>
                                    <Col md={2}>Rs. {addDecimals(item.price*item.qty)}</Col>
                                        <Col md={1}>
                                            <Button type='button' variant='light' onClick={() => remoreItemFromhandler(item.product)}><i className='fas fa-trash'></i></Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>SubTotal ({cartItems.reduce((acc,item) => acc + item.qty, 0)}) items</h2>
                                Rs. {cartItems.reduce((acc,item) => acc + item.qty * item.price,0).toFixed(2)}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type='Button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                                    Proceed To Checkout 
                                </Button>
                            </ListGroup.Item>
                    </ListGroup>                       
                </Card>
                                   
            </Col>
                                        
        </Row>
    )
}

export default CartScreen
