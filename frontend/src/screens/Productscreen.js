import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {Row,Col,Image,ListGroup,Card,Button, Form, Alert} from 'react-bootstrap'
import Rating from '../components/Rating'
import {listProductsDetails,clearProductDetails,createProductReview} from '../actions/productAction'
import {PRODUCT_CREATE_REVIEW_CLEAR} from '../constants/productConstants'
import Message from '../components/Message'
import Loader from '../components/loader'
import Meta from '../components/Meta'
import {addToCart} from '../actions/cartActions'
import ModalTemplate from '../components/ModalTemplate'

const Productscreen = ({match, history}) => {
    const [show, setShow] = useState(false) // alert https://react-bootstrap.github.io/components/alerts/
    
    const [addProduct,setAddProduct] = useState(false) 
    const handleClose = () => setAddProduct(false)
    const handleShow = () => setAddProduct(true)
    
    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart
    let check

    const [qty,setQty] = useState(0)

    const [rating,setRating] = useState(0)
    const [comment,setComment] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading,error,product } = productDetails

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const { error:errorProductReview,success:successProductReview } = productReviewCreate

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    //console.log(product)
    useEffect(() => {
        if(successProductReview){
            alert('Review Submitted')
            setRating(0)
            setComment('')
            dispatch({type:PRODUCT_CREATE_REVIEW_CLEAR })
        }
        
        dispatch(listProductsDetails(match.params.id))
        return () => {
            dispatch(clearProductDetails()); //for clear the data
          }
  //{loading ? <Loader /> : error ? <Meassage variant='danger'>{error}</Meassage> : ()}
    }, [dispatch,match,successProductReview]) //https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects

//const product = []
    const addToCartHandler = () => {

        //const cart = useSelector()
        //if(state.cartItems.
        //const result_temp = [JSON.stringify(cart.cartItems)]
        const cart_obj = JSON.stringify(cartItems)
        var stringify = JSON.parse(cart_obj);
        
        for (var i = 0; i < stringify.length; i++) {
            if(stringify[i]['product'] === product._id)
            {
                //console.log(stringify[i]['product']);
                check = true
            }
            
        }
        //console.log(check)
        if(!check){
        var temp_qty = qty
        if(temp_qty === 0)
            temp_qty = 1
        //history.push(`/cart/${match.params.id}?qty=${temp_qty}`)
        dispatch(addToCart(match.params.id,temp_qty))
        handleShow(true)
        }else{
            setShow(true)
        }
        //console.log(cart_obj)
        //const result = result_temp.find(({ product }) => product === '5f93d28ecde9a13554df593a')
        ///console.log(result)


       
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(match.params.id,{
            rating,
            comment
        }))
    }

    return (
        
        <>
        <Link className='btn btn-light my-3' to='/'>
            Go Back
        </Link>
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <>
            <Meta title={product.name}/>
            <Row>
            <Col md={6}>
                {show && <Alert variant="danger" onClose={() => setShow(false)} dismissible>Product is already added to the cart</Alert>}
                <Image src={product.image} alt={product.name}   style={{height:'auto',width:'100%'}}>
                </Image>
            </Col>
            <Col md={3}>
                <ListGroup variant='flush'>
                   <ListGroup.Item>
                       <h3>{product.name}</h3>
                       </ListGroup.Item> 
                       <ListGroup.Item>
                        <Rating value={product.rating} text={`${product.numReviews} reviews`}/>  
                       </ListGroup.Item>
                       <ListGroup.Item>
                           Price: Rs. {product.price}
                       </ListGroup.Item>
                       <ListGroup.Item className='list-group-item d-flex justify-content-between align-items-center'>
                            Description: {product.description}
                       </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={3}>
                <Card variant='flush'>
                <ListGroup.Item>
                    <Row>    
                    <Col>Price:
                    </Col>
                    <strong>Rs. {product.price}</strong>
                    <Col>
                    </Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>    
                    <Col>Status:
                    </Col>
                    <strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
                    <Col>
                    </Col>
                    </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                    <ListGroup.Item>
                        <Row>
                            <Col>Qty:</Col>
                            <Col>
                            <Form.Control as='select' value={qty} onChange={(e) =>{setQty(e.target.value)}}>
                                {
                                    [...Array(product.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                            {x+1}
                                        </option>
                                    ))
                                }
                            </Form.Control>
                            </Col>
                        </Row>
                        <Row>
                            <Col>Total:</Col>
                            <Col>
                            <strong>
                                Rs. {qty === 0 ? Math.round(((product.price*1) + Number.EPSILON) * 100) / 100 :  Math.round(((product.price*qty) + Number.EPSILON) * 100) / 100}
                            </strong>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                   
                )}

                <ListGroup.Item>
                    <Button onClick={addToCartHandler} className='btn-block' type='button' disabled={product.countInStock === 0}>
                        Add to cart
                    </Button>
                </ListGroup.Item>
                </Card>
            </Col>
        </Row>
        <br></br>
        <Row>
            <Col md={6}>
                <h2>Reviews</h2>
                {product.reviews.length === 0 &&  <Message>No Reviews</Message> }
                <ListGroup variant='flush'>
                    {product.reviews.map(review => (
                        <ListGroup.Item key={review._id}>
                            <strong>{review.name}</strong>
                            <Rating value={review.rating}/>
                    <p>{review.createdAt.substring(0,10)}</p>
                    <p>{review.comment}</p>
                        </ListGroup.Item> 
                    ))}
                    <ListGroup.Item>
                        <h2>Write a customer review</h2>  
                        {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                        {userInfo ? (
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId='rating'>
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                                        <option value=''>Select..</option>
                                        <option value='1'>1 - Poor</option>
                                        <option value='2'>2 - Fair</option>
                                        <option value='3'>3 - Good</option>
                                        <option value='4'>4 - Very Good</option>
                                        <option value='5'>5 - Excellent</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId='comment'>
                                    <Form.Label>Comment</Form.Label>
                                    <Form.Control as='textarea' row='3' value={comment} onChange={(e) => setComment(e.target.value)}></Form.Control>
                                </Form.Group>
                                <Button type='submit' variant='primary'>Submit</Button>
                            </Form>
                        ) : (
                            <Message>Please <Link to='/login'>sign in</Link> to write a review
                            {' '}
                            </Message>
                        )}  
                    </ListGroup.Item>                           
                </ListGroup>
            </Col>
        </Row>
        </>
        
        )}
        <ModalTemplate addProduct={addProduct} handleShow={handleShow} handleClose={handleClose} cartItems={cartItems}/>
        
        </>
    )
}

export default Productscreen
