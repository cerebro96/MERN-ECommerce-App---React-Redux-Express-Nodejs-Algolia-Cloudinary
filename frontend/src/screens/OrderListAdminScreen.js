import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Button,Table} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/loader'
import {LinkContainer} from 'react-router-bootstrap'
import {listOrders} from '../actions/orderAction'

const OrderListAdminScreen = ({history}) => {
     
    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orderList)
    const { loading,error,orders } = orderList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
      if (userInfo && userInfo.isAdmin) {
        dispatch(listOrders())
      } else {
        history.push('/login')
      }
        //dispatch(listUsers())
    }, [dispatch,userInfo,history])



    return (
        <>
         <h1>Orders</h1>   
         {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
             <Table striped hover responsive className='table-sm'>
                 <thead>
                     <tr>
                     <th>ID</th>
                     <th>Name</th>
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
                           <td>{order.user && order.user.name}</td>
                           <td>{order.createdAt.substring(0, 10)}</td>
                           <td>Rs. {order.totalPrice}</td>
                           <td>{order.isPaid ? (
                                order.paidAt.substring(0,10)
                                            ): (
                                                <i className='fas fa-times' style={{ color : 'red' }}></i>
                                )}
                            </td>
                            
                            <td>{order.isDelivered ? (
                                order.deliveredAt.substring(0,10)
                                            ): (
                                                <i className='fas fa-times' style={{ color : 'red' }}></i>
                                )}</td>
                            <td>
                            <LinkContainer to={`/order/${order._id}`}>
                            <Button variant='light' className='btn-sm'>
                                                Details
                                            </Button>   
                            </LinkContainer>
                            
                            </td>
                      </tr>
                    
                 ))}
                 </tbody>
             </Table>
         )}
            
        </>
    )
}

export default OrderListAdminScreen
