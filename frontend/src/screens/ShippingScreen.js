import React,{useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Button, Form} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import {saveShippingAddress} from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingScreen = ({ history }) => {

const cart = useSelector(state => state.cart)
const { shippingAddress } = cart

const [address,setAddress] = useState(shippingAddress.address || '') //https://stackoverflow.com/questions/47012169/a-component-is-changing-an-uncontrolled-input-of-type-text-to-be-controlled-erro/47012342#47012342
const [city,setCity] = useState(shippingAddress.city || '')
const [postalcode,setPostalCode] = useState(shippingAddress.postalcode || '')
const [country,setCountry] = useState(shippingAddress.country || '')

const dispatch = useDispatch()

const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({address,city,postalcode,country}))
    history.push('/payment')
}

    return (
        <FormContainer>
            <CheckoutSteps step1 step2/>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control type='address' placeholder='Enter address' required value={address} onChange={(e) => setAddress(e.target.value)}></Form.Control>       
            </Form.Group>

            <Form.Group controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control type='city' placeholder='Enter city' required value={city} onChange={(e) => setCity(e.target.value)}></Form.Control>       
            </Form.Group>

            <Form.Group controlId='postalcode'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control type='postalcode' placeholder='Enter postal code' required value={postalcode} onChange={(e) => setPostalCode(e.target.value)}></Form.Control>       
            </Form.Group>

            <Form.Group controlId='country'>
                <Form.Label>Country</Form.Label>
                <Form.Control type='country' placeholder='Enter country' required value={country} onChange={(e) => setCountry(e.target.value)}></Form.Control>       
            </Form.Group>

            <Button type='submit' variant='primary'>
                    Continue
            </Button>

            </Form>
           

        </FormContainer>
    )
}

export default ShippingScreen
