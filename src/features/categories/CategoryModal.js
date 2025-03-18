import React, { useEffect, useState } from 'react';
import { addCategory, modifyCategory } from '../../services/categoryService';
import { Card, Col, Form, NavDropdown, Row, Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

export const CategoryModal = ( { categoryName, categoryId, showModal, onClose, onAddOrChange } ) => {
    const [ show, setShow ] = useState(null);
    const [ categoryNameState, setCategoryNameState ] = useState(categoryName ? categoryName : '');
    console.log(categoryId);
    const handleClose = () => { 
      onClose(false); 
      setShow(false);
    }
    const handleShow = () => setShow(true);
    
    useEffect(()=>{
      setShow(showModal);
    },[showModal])
  
    
    const handleEditAddButton = async () => {
      
        try{
          if(!categoryId){
            const response = await addCategory({'category_name': categoryNameState} );
            toast.success('Category been succesfully added')
            handleClose()
            onAddOrChange();
            
          }else{
            debugger;
            const response = await modifyCategory(categoryId,{'category_name': categoryNameState})
            toast.success('Category been succesfully modified')
            handleClose();
            onAddOrChange();
          }
        }catch(error){
          if(error.response.status == 500){
            toast.error('Category name should be unique');

          } 
        }
      
    }
    return (
      <>
        <Modal centered={true} show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{ (categoryId ? 'Editing category' : 'Adding category') }</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Category name</Form.Label>
                <Form.Control
                  type="Category name"
                  placeholder={ "Category name" }
                  onChange = {( event )=> setCategoryNameState(event.target.value) }
                  value={ (categoryNameState) }
                  autoFocus
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button disabled={categoryNameState.length == 0 } variant="primary" onClick={handleEditAddButton}>
            </Button>
                    <button disabled={categoryNameState.length == 0 } className='see_more_btn' onClick={handleEditAddButton}>
                    { categoryId ? 'Editing category' :  'Adding category' }<i class='fa-solid fa-angle-right'></i>
                    </button>
          </Modal.Footer>
        </Modal>
  
      </>
    );
  }