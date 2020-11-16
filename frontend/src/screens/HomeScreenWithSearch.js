import algoliasearch from 'algoliasearch/lite'
import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  ClearRefinements,
  RefinementList,
  Configure,
  NumericMenu,
  RatingMenu,
  Highlight,
  RangeInput,
  Stats,
  SortBy
} from 'react-instantsearch-dom'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Rating from '../components/Rating'
import {algolioGetAPIDet} from '../actions/AlgolioActions'
import Message from '../components/Message'
import Loader from '../components/loader'
import { Row,Col } from 'react-bootstrap'

const HomeScreenWithSearch = ({match}) => {
  const cat_id = match.params.id

  const dispatch = useDispatch()

  const AlgolioAPI = useSelector(state => state.AlgolioAPI)
  const {loading,error,api_data,api_key,api_index,api_pri_desc,api_pri_asc} = AlgolioAPI
  
  const apiIndex = api_index
  const apidesc = api_pri_desc
  const apiasc = api_pri_asc

  useEffect(() => {
      dispatch(algolioGetAPIDet())
    }, [dispatch])
    
     const  searchClient = algoliasearch(
      api_data,
      api_key
     )
    
      const Hit = (props) => {
        return (
            <>
            <img src={props.hit.image} className="img-thumbnail" style={{width:'100%',height: 'auto'}} align="left" alt={props.hit.name} />
            <div className="hit-name" >
            <Link to={`/product/${props.hit._id}`}>
            <Highlight attribute="name" hit={props.hit}/>
              </Link>
            </div>
            <div className="hit-price">Rs. {props.hit.price}</div>
            <Rating value={props.hit.rating} color={'black'}/>
          </>
        )
      }
    
      Hit.propTypes = {
        hit: PropTypes.object.isRequired,
      }

    return (
      
        <>
        {loading ? <Loader /> : error ? <Message variant='red'>{error}</Message> : (
             <Row >
                <InstantSearch indexName={`${apiIndex}`} 
             searchClient={searchClient}>
              <Col md={4}>
              <div>
                 <ClearRefinements />
                 <br></br>
                 <h5>Brands</h5>
                 <RefinementList attribute="brand"  limit={8} showMore={true} searchable/>
                 <Configure hitsPerPage={8} />
                 <br></br>
                 <h5>Category</h5>
                  {cat_id !== '' ? (
                      <RefinementList attribute="category" defaultRefinement={[`${cat_id}`]} limit={8} showMore={true}/>
                  ) : (
                    <RefinementList attribute="category"  limit={8} showMore={true}/>
                  )}
                 
                 
                 <br></br>
                 <h5>PRICE</h5>
                 <NumericMenu attribute="price"
                 items={[
                     { end: 1000, label: '< Rs 1000' },
                     { start: 1000, end: 10000, label: 'Rs. 1000-10000' },
                     { start: 10000, end: 500000, label: 'Rs. 10000-$500000' },
                     { start: 500000, label: '>Rs. 500000' }]}/>
                     <br></br>
                     <RangeInput attribute="price" />
                     
                     <br></br>
                 <h5>Avg. Customer Review</h5>
                 <RatingMenu attribute="rating"  max={5} min={0}  translations={{ratingLabel: '& Up',}}/>
               </div>
              </Col>
              <Col md={8}>
               
                <SearchBox />
                
                 <Row>
                   <Col>
                   <Stats />
                   </Col>
                  <Col>
                  <SortBy defaultRefinement={`${apiIndex}`} 
                 items={[
                  { value: `${apiIndex}` , key: '0' , label: 'Most Relevent' },
                  { value: `${apidesc}`, key: '1',label: 'Price desc.' },
                  { value: `${apiasc}` ,key: '2',label: 'Price asc.' },
                ]}/>
                  </Col>
                 
                 </Row>
                 <br></br>
                 
                 <Hits hitComponent={Hit} />
                 
                 
                 
                 
                 <Pagination />
               
              </Col>
              </InstantSearch>
               
               
           
             
           </Row>
        )}
                
        </>
    )

    
}

export default HomeScreenWithSearch
