import AttachFileIcon from '@mui/icons-material/AttachFile';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import avatar from '../assets/avartar.png';
import friend2 from '../assets/NoahStark.png';
import friend1 from '../assets/RobertBarateon.png';
import UserHeader from '../components/header';
import './member.css';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '768px',
  width: '100%',
  height: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function GroupChat({ sub, url }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className='sharedDashboard'>
      <div className='dashboardRow'>

        <div className='content dashboardContent'>
          <div className='dashboardHeader'>
            <UserHeader title='Group Chat' sub='Home' role='member' url={url} />
          </div>

          <div className='dashboardContentPanel mt-4' >
            <div className='notificationContent group_c_m_mx' >
              <div className='subheader' >
                <div>
                  {/* <Button onClick={handleOpen}>Open modal</Button> */}
                  <Modal
                    aria-labelledby='transition-modal-title'
                    aria-describedby='transition-modal-description'
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}>
                    <Fade in={open}>
                      <Box sx={style}>
                        <Typography
                          id='transition-modal-title'
                          variant='h6'
                          component='h2'
                          style={{
                            fontWeight: 600,
                            fontSize: '16px',
                            marginBottom: '40px',
                          }}>
                          New Group Message
                        </Typography>

                        <div className='groupPost_Modal'>
                          <Form>
                            <Form.Group
                              className='mb-3'
                              controlId='exampleForm.ControlInput1'>
                              <Form.Control
                                className='text_input'
                                type='text'
                                placeholder='Topic..'
                              />
                            </Form.Group>

                            <Form.Group
                              className='mb-3'
                              controlId='exampleForm.ControlTextarea1'>
                              <Form.Control
                                className='text_input'
                                as='textarea'
                                rows={3}
                                placeholder='Message..'
                              />
                            </Form.Group>
                          </Form>

                          <div className='fileAttach_content'>
                            <AttachFileIcon />
                            <span>Select Attachment</span>
                          </div>

                          <div>
                            <Button
                              variant='contained'
                              style={{
                                background: '#18498B',
                                borderRadius: '4px',
                                fontWeight: 700,
                                fontSize: '14px',
                                marginRight: '5px',
                                width: '156px',
                              }}>
                              POST
                            </Button>

                            <Button
                              variant='contained'
                              style={{
                                color: '#18498B',
                                borderRadius: '4px',
                                fontWeight: 700,
                                fontSize: '14px',
                                width: '156px',
                                background: '#E6F0FF',
                              }}>
                              CANCEL
                            </Button>
                          </div>
                        </div>
                      </Box>
                    </Fade>
                  </Modal>
                </div>

                <Button
                  variant='contained'
                  style={{
                    background: '#18498B',
                    borderRadius: '4px',
                    fontWeight: 700,
                    fontSize: '14px',
                  }}
                  onClick={handleOpen}>
                  Add Group Chat
                </Button>
              </div>

              <div style={{ overflow: 'hidden', marginBottom: '74px' }}>
                <div className="grpChatList" style={{ marginBottom: '32px' }}>
                  <div className="grpChat_frnList">
                    <div className="grpChat_frndDetail">
                      <img src={avatar} alt="" />

                      <div className="grpChat_frndName">
                        <p >Jon Snow</p>
                        <h6 >Question</h6>
                      </div>
                    </div>

                    <div className="grpChat_bulkAct">
                      <NavLink to={`${url}/GroupChatEdit`}>
                        <span style={{ color: '#333333', marginRight: '15px', cursor: 'pointer' }}><i className="fas fa-pen-to-square"></i></span>
                      </NavLink>

                      <span style={{ color: '#333333', cursor: 'pointer' }}><i className="fas fa-trash"></i> </span>
                    </div>
                  </div>
                </div>

                <div className="grpChatList" style={{ marginBottom: '32px' }}>
                  <div className="grpChat_frnList">
                    <div className="grpChat_frndDetail">
                      <img src={friend1} alt="" />

                      <div className="grpChat_frndName">
                        <p >Robert Barateon</p>
                        <h6 >About courses</h6>
                      </div>
                    </div>

                    <div className="grpChat_bulkAct">
                    <NavLink to={`${url}/GroupChatEdit`}>
                        <span style={{ color: '#333333', marginRight: '15px', cursor: 'pointer' }}><i className="fas fa-pen-to-square"></i></span>
                      </NavLink>
                      <span style={{ color: '#333333', cursor: 'pointer' }}><i className="fas fa-trash"></i> </span>
                    </div>
                  </div>
                </div>

                <div className="grpChatList" style={{ marginBottom: '32px' }}>
                  <div className="grpChat_frnList">
                    <div className="grpChat_frndDetail">
                      <img src={friend2} alt="" />

                      <div className="grpChat_frndName">
                        <p >Noah Stark</p>
                        <h6 >Courses ui ux really hard</h6>
                      </div>
                    </div>

                    <div className="grpChat_bulkAct">
                    <NavLink to={`${url}/GroupChatEdit`}>
                        <span style={{ color: '#333333', marginRight: '15px', cursor: 'pointer' }}><i className="fas fa-pen-to-square"></i></span>
                      </NavLink>
                      <span style={{ color: '#333333', cursor: 'pointer' }}><i className="fas fa-trash"></i> </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
