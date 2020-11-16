import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Button,Table,Row,Col} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/loader'
import {LinkContainer} from 'react-router-bootstrap'
import {listProducts,deleteProduct} from '../actions/productAction'
import Paginate from '../components/Paginate'

const ProductListScreen = ({history,match}) => {    
    const pageNumber = match.params.pageNumber || 1
    const pageSize = 10

    const dispatch = useDispatch()

    const listProduct_temp = useSelector(state => state.productList)
    const { loading,error,products, page ,pages} = listProduct_temp

    const productDelete = useSelector(state => state.productDelete)
    const { loading:loadingDelete,error:errorDelete,success:successDelete } = productDelete

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            history.push('/login');
          } else {
        dispatch(listProducts(pageNumber,pageSize))
          }
    }, [dispatch,history,userInfo,successDelete,pageNumber,pageSize])



    const deleteHandler = (id) => {
        if(window.confirm('Are you Sure')){
          dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {
        console.log('create')
        history.push(`/admin/product/create`)
    }

    return (
        <>
        <Row className='align-items-center'>
            <Col>
            <h1>Products</h1>
            </Col>
            <Col className='text-right'>
                <Button className='my-3' onClick={createProductHandler}>
                   <i className='fas fa-plus'></i> Create Product
                </Button>
            </Col>
        </Row>
        {loadingDelete && <Loader />}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <>
             <Table striped hover responsive className='table-sm'>
                 <thead>
                     <tr>
                     <th>ID</th>
                     <th>Name</th>
                     <th>PRICE</th>
                     <th>CATEGORY</th>
                     <th>BRAND</th>
                     <th></th>
                     </tr>
                 </thead>
                 <tbody>
                 {products.map((product) => (
                      <tr key={product._id}>
                        <td>{product._id}</td>
                        <td width="350" >{product.name}</td>
                        <td>Rs. {product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>

    
                            <td>
                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                            <Button variant='light' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>   
                            </LinkContainer>
                            <Button variant='danger' className='btn-sm' onClick={() => {deleteHandler(product._id)}}>
                                    <i className='fas fa-trash'></i>
                                 </Button>
                            </td>


                      </tr>
                    
                 ))}
                 </tbody>
             </Table>
             <Paginate pages={pages} page={page} isAdmin={true}/>
             </>
         )}
        </>
    )
}

export default ProductListScreen
