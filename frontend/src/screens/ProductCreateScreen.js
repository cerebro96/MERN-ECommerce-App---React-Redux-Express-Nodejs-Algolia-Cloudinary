import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import {Button, Form} from 'react-bootstrap'
import {createProduct} from '../actions/productAction'
import Message from '../components/Message'
import Loader from '../components/loader'
import { PRODUCT_CREATE_CLEAR } from '../constants/productConstants'
import axios from 'axios'

const ProductCreateScreen = ({history}) => {
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
    
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const productCreate = useSelector(state => state.productCreate)
    const {loading:loadingUpdate,error:errorUpdate ,success:successUpdate} = productCreate

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            history.push('/login');
          } else {
            if(successUpdate){
                dispatch({type: PRODUCT_CREATE_CLEAR})
                history.push('/admin/productlist')
            }
        }
    }, [dispatch,userInfo,history,successUpdate])


    const uploadFilehandler = async (e) => {
        const file = e.target.files[0]
        //console.log(e)
        // for encoding base64
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
            //console.log(data)
            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        //console.log(imageBase64) 
        dispatch(createProduct(name,price,image,brand,category,countInStock,description,imageBase64))
    }
    return (
        <>
        <Link to='/admin/productlist' className='btn btn-light my-3'>
       Go Back
       </Link>
       <FormContainer>
        <h3>Create Product</h3>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        
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
                <Form.Control type='text' placeholder='Enter Image Url' value={image} onChange={(e) => setImage(e.target.value)}></Form.Control>   
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
                    Create
            </Button>

            </Form>
        
          
       </FormContainer>
            
        </>
    )
}

export default ProductCreateScreen
