import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Button, Form,Row,Col,Image} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/loader'
import {listProductsDetails,updateProduct} from '../actions/productAction'
import { CLEAR_PRODUCT_DETAILS, PRODUCT_UPDATE_CLEAR } from '../constants/productConstants'
import axios from 'axios'

const ProductEditScreen = ({match,history}) => {

    const productId = match.params.id
  
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)
    const [imageBase64,setImageBase64] = useState('')

    const dispatch = useDispatch()
    
    const productDetails = useSelector(state => state.productDetails)
    const { loading,error,product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading:loadingUpdate,error:errorUpdate,success:successUpdate } = productUpdate

    useEffect(() => {
        if(successUpdate){
            dispatch({type: PRODUCT_UPDATE_CLEAR})
            dispatch({type: CLEAR_PRODUCT_DETAILS})
            history.push('/admin/productlist');
        }else{
            if(!product.name || product._id !== productId)
            {
                dispatch(listProductsDetails(productId))
            }else{
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
    }, [dispatch,match,productId,product,successUpdate,history])

    const uploadFilehandler = async (e) => {
        const file = e.target.files[0]

        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setImageBase64(reader.result)
        }

        const formData = new FormData()
        formData.append('image',file)
        setUploading(true)
        try {
            const config = {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            }
    
            const { data } = await axios.post(`/api/upload`, formData ,config)
            console.log(data)
            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description,
            imageBase64,
        }))
        //dispatch({type: PRODUCT_UPDATE_CLEAR})
    }

    const backhandler = () => {
        dispatch({type: CLEAR_PRODUCT_DETAILS})
    }

    return (
        <>
             <Link to='/admin/productlist' className='btn btn-light my-3' onClick={backhandler}>
       Go Back
       </Link>
       
        <Row>
        <Col md={8}>
        <h3>Update Product</h3>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : ( 
              <Form onSubmit={submitHandler}>

              <Form.Group controlId='name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type='name' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>       
              </Form.Group>
  
              <Form.Group controlId='price'>
                  <Form.Label>Price</Form.Label>
                  <Form.Control type='number' placeholder='Enter Price' value={price} onChange={(e) => setPrice(e.target.value)}></Form.Control>       
              </Form.Group>
  
              <Form.Group controlId='image'>
                  <Form.Label>Image</Form.Label>
                  <Form.Control type='text' placeholder='Enter Image Url' disabled value={image} onChange={(e) => setImage(e.target.value)}></Form.Control> 
                  <Form.File id='image-file' label='Choose File' custom onChange={uploadFilehandler}></Form.File>  
                  {uploading && <Loader />}    
              </Form.Group>
  
              <Form.Group controlId='brand'>
                  <Form.Label>Brand</Form.Label>
                  <Form.Control type='text' placeholder='Enter Brand' value={brand} onChange={(e) => setBrand(e.target.value)}></Form.Control>       
              </Form.Group>
  
              <Form.Group controlId='category'>
                  <Form.Label>Category</Form.Label>
                  <Form.Control type='text' placeholder='Enter Category' value={category} onChange={(e) => setCategory(e.target.value)}></Form.Control>       
              </Form.Group>
  
              <Form.Group controlId='countInStock'>
                  <Form.Label>Count In Stock</Form.Label>
                  <Form.Control type='number' placeholder='Enter Countinstock' value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></Form.Control>       
              </Form.Group>
  
              <Form.Group controlId='description'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control type='text' placeholder='Enter Description' value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>       
              </Form.Group>
              
              
  
              <Button type='submit' variant='primary'>
                      Update
              </Button>
  
              </Form>
        )}  
       </Col>
       <Col md={4}>
        <Image src={image} thumbnail />
       </Col>
       </Row> 
       
            
        </>
    )
}

export default ProductEditScreen
