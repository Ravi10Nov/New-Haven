import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalHeader } from 'react-bootstrap';

export default function ModalArea() {
  const [modal1show, setModal1Show] = useState(false);

  function recommendationClick() {
    setModal1Show(true);
  }
  return (
    <div>
      <Button onClick={recommendationClick()}>Open modal</Button>
      {/* MOdal */}
      <Modal
        show={modal1show}
        size='lg'
        onHide={() => setModal1Show(false)}
        backdrop='static'
        keyboard={false}
        centered
        className='userD_modal'>
        <ModalHeader closeButton className='userD_modal_title'>
          {/* Please donate to activate this course */}
        </ModalHeader>
        <ModalBody>
          <label className='userD_modal_label'>
            formal request for spiritual adoption by the principal medicine
            chief of The Spirit Of Truth native American Church
          </label>
          <label className='userD_modal_content'>
            Whereas: the Spirit Of Truth Native American Church is the
            "Spiritual Family" of the President of Church, through the ancient
            principle of "Making Relations", which is the Church also calls
            "Spiritual Adoption", and it is through this religious practice that
            I request Spiritual Adoption by the President of the Church, and;
          </label>
          <label className='userD_modal_content'>
            Therefore: By this request I state that (1) Natural Healing/Medicine
            is a part of my Spiritual Orientation and I wish to follow the
            Sacred Healing Way as set out by the Creator; (2) I will live by the
            practice of "First, Do Good";
          </label>
          <input
            className='userD_modal_input'
            placeholder='User Interaction'></input>
          <div
            style={{
              display: 'flex',
              justifyContent: 'end',
              marginTop: '30px',
            }}>
            {/* <Button
              color='secondary'
              variant='contained'
              onClick={() => {
                setModal1Show(false);
              }}
              id='modal_cancel_btn'>
              Cancel
            </Button> */}
            {/* <Button
              color='primary'
              variant='contained'
              onClick={() => {
                history.push('/LearnerDonationSendPage');
              }}
              id='modal_donate_btn'>
              Donate
            </Button> */}
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
