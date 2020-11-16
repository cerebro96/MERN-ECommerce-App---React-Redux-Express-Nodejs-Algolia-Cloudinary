import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Row,Col,Button, Form, Table} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/loader'
import {getUserDetails,updateUserProfile} from '../actions/userActions'
import {USER_UPDATE__PROFILE_RESET} from '../constants/userConstants'
import {listMyOrder} from '../actions/orderAction'
import {LinkContainer} from 'react-router-bootstrap'

const ProfileScreen = ({ history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message_reg, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading,user,error } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderMyList = useSelector((state) => state.orderMyList)
    const { loading:loadingOrder,orders,error:errorOrders } = orderMyList


   useEffect(() => {
        if(!userInfo){
            history.push('/login')
        }else{
            if(!user.name || success){
                //dispatch({type: USER_UPDATE__PROFILE_RESET})
                setTimeout(() => dispatch({type: USER_UPDATE__PROFILE_RESET}), 1500)
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrder()) // list the orders in client screen
            }
            else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    },[dispatch,history,userInfo,user,success])
    
    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Password do not match')
        }else{
            dispatch(updateUserProfile({ id: user._id , name, email, password}))
        }
        
    }
   return (

       <Row>
           <Col md={3}>
           <h2><strong>User Profile</strong></h2>
           {message_reg && <Message variant='danger'>{message_reg}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>Successfully Updated</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>

            <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='name' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>       
            </Form.Group>
            
            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>       
            </Form.Group>

            <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
            </Form.Group> 

            <Form.Group controlId='confirmPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
            </Form.Group> 

            <Button type='submit' variant='primary'>
                    Update
            </Button>

            </Form>
            
           </Col>
           <Col md={9}>
                <h2><strong>My Orders</strong></h2>
                {loadingOrder ? <Loader /> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> : (
                        <Table striped hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ORDER ID</th>
                                        <th>DATE</th>
                                        <th>TOTAL</th>
                                        <th>PAID</th>
                                        <th>DELIVERED</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.createdAt.substring(0,10)}</td>
                                            <td>{order.totalPrice}</td>
                                            <td>{order.isPaid ? (
                                                order.paidAt.substring(0,10)
                                            ): (
                                                <i className='fas fa-times' style={{ color : 'red' }}></i>
                                            )}</td>
                                            <td>{order.isDelivered ? (
                                                order.deliveredAt.substring(0,10)
                                            ): (
                                                <i className='fas fa-times' style={{ color : 'red' }}></i>
                                            )}</td>
                                            <td>
                                                <LinkContainer to={`/order/${order._id}`}>
                                                    <Button variant='light' className='btn-sm'>Details</Button>
                                                </LinkContainer>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                        </Table>
                )}
           </Col>

       </Row>
    )
}

export default ProfileScreen
