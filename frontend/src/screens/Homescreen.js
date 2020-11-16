import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Row,Col } from 'react-bootstrap'
import Product from '../components/Product'
import {listProducts} from '../actions/productAction'
import Message from '../components/Message'
import Loader from '../components/loader'
import ProductCarousel from '../components/ProductCarousel'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'
import {algolioGetAPIDet} from '../actions/AlgolioActions'

const Homescreen = ({match}) => {

    const pageNumber = match.params.pageNumber || 1
    const pageSize = 5
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {loading,error,products, page ,pages} = productList

    const AlgolioAPI = useSelector(state => state.AlgolioAPI)
    const {api_data,api_key,api_que_sugg} = AlgolioAPI

    useEffect(() => {
        if(!api_data){
            dispatch(algolioGetAPIDet()) 
        }
            
            const script = document.createElement('script') 
            script.type = 'text/javascript'
            script.src = `http://localhost:3000/AlgoliaAutoSearch.js` //Pls find the method for the hardcorded creds of algolia api and if port changes please change it
            //script.async = true
            script.id = 'API'
            document.body.appendChild(script)    
        dispatch(listProducts(pageNumber,pageSize))

    },[dispatch,pageNumber,api_data])


    //const products = []
    return (
        <>
        <Meta />
        <Row>
            <Col md={12}>
          
            <input type="hidden" value={`${api_data}`} id='api_key'/>
            <input type="hidden" value={`${api_key}`} id='api_key_long'/>
            <input type="hidden" value={`${api_que_sugg}`} id='api_sugg'/>
            <div className="aa-input-container" id="aa-input-container">
                <input type="search" id="aa-search-input" className="aa-input-search" placeholder='Search for players or teams...' name="search" autoComplete='off' />
                <svg className="aa-input-icon" viewBox="654 -372 1664 1664">
                    <path d="M1806,332c0-123.3-43.8-228.8-131.5-316.5C1586.8-72.2,1481.3-116,1358-116s-228.8,43.8-316.5,131.5  C953.8,103.2,910,208.7,910,332s43.8,228.8,131.5,316.5C1129.2,736.2,1234.7,780,1358,780s228.8-43.8,316.5-131.5  C1762.2,560.8,1806,455.3,1806,332z M2318,1164c0,34.7-12.7,64.7-38,90s-55.3,38-90,38c-36,0-66-12.7-90-38l-343-342  c-119.3,82.7-252.3,124-399,124c-95.3,0-186.5-18.5-273.5-55.5s-162-87-225-150s-113-138-150-225S654,427.3,654,332  s18.5-186.5,55.5-273.5s87-162,150-225s138-113,225-150S1262.7-372,1358-372s186.5,18.5,273.5,55.5s162,87,225,150s113,138,150,225  S2062,236.7,2062,332c0,146.7-41.3,279.7-124,399l343,343C2305.7,1098.7,2318,1128.7,2318,1164z" />
                </svg>
            </div>
            </Col>
        </Row>
        <br></br>
        <ProductCarousel />
        <br></br>
            <h1>Latest Products</h1>
            {loading ? <Loader /> : error ? <Message variant='red'>{error}</Message> :  
            <>    
            
                {products.lenght !== 0 ? ( 
                    <Row>
                        {products.map(product => (
                            <Col sm={12} md={6} lg={4} key={product._id}>
                                 <Product product={product}/>
                            </Col> 
                         ))}
                         </Row>
                ) : <Message variant='red'>{'501'}</Message> }
                
            
            <Paginate pages={pages} page={page}/>
            </>
            }
        </>
    )
}

export default Homescreen
