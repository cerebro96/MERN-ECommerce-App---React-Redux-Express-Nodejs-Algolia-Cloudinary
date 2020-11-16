import React from 'react'
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { Modal } from 'react-responsive-modal' //https://www.npmjs.com/package/react-responsive-modal
import "react-responsive-modal/styles.css" //https://react-responsive-modal.leopradel.com/examples#custom-styling-with-css

const ModalTemplate = ({addProduct,handleShow,handleClose,cartItems}) => {
    return (
        <>
      

      <Modal open={addProduct} onClose={handleClose} center>
        <h2>Product Added Successfully</h2>
        <p>
        A new item has been added to your Shopping Cart. You now have {cartItems.length} items in your Shopping Cart.
        </p>
        <Button variant="secondary" className='btn btn-block btn-light my-3'>
          <Link to='/cart'>
          View Shopping Cart
        </Link>  
          </Button>

          <Button variant="primary" onClick={handleClose} className='btn btn-block btn-black my-3'>
            Continue Shipping
          </Button>
      </Modal>

      </>
    )
  


}


export default ModalTemplate
