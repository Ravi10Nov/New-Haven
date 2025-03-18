import React, {useContext,useState,useEffect} from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import {Link} from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const SectionCard = ({ section, index, handleDeleteButtonClick,url,courseId,moduleId,handleSectionDelete,sectionDeleteModalOpen,setSectionDeleteModalOpen}) => {
  return (
    <Draggable draggableId={section._id} index={index} className="w-full">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="w-full flex flex-col items-center justify-center"
        >

              <div className="rounded overflow-hidden shadow-lg w-4/5">
                <div key={section?._id} className="px-6 py-4 flex flex-col items-center justify-between border-b">

                {/* Row 1 */}
                <div className="px-6 py-4 flex items-center justify-between border-b w-full">
                  <div className="font-bold text-xl mb-2">{section?.title}</div>

                  <div className='flex items-center justify-end'>

                    {
                        section.approvalStatus ? (
                            <div className='flex justify-end'>
                            <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-2 italic">Approved</span>
                            </div>
                        ) : (
                            <div className='flex justify-end my-2'>
                            <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm mr-2 italic">Pending</span>
                            </div>
                        )
                    }

                 </div>

                </div>
                {/* Row 1 */}

                {/* Row 2 */}
                <div className="px-6 py-4 flex items-center justify-end border-b w-full">
                  <div className='flex items-center justify-end'>


                  {/* Delete Section */}
                  {/* <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-2" onClick={()=>handleDeleteButtonClick(section._id)}
                    >
                      Delete
                  </button>

                  <Modal
                        open={sectionDeleteModalOpen}
                        onClose={()=>{setSectionDeleteModalOpen(false)}}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        className="rounded-lg"
                    >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                        Are you sure you want to delete this section?,all the associated pdfs will be deleted
                        </Typography>
                
                        <div className="flex w-full justify-end items-center mt-3">
                        <Button style={{marginRight:'5px'}} variant="contained" onClick={handleSectionDelete}>Delete</Button>
                        <Button style={{marginLeft:'5px'}} variant="contained" onClick={() => setSectionDeleteModalOpen(false)}>Cancel</Button>
                        </div>
                    </Box>
                  </Modal> */}
                  {/* Delete Section */}

                
                    {/* View Section */}
                    <Link to={`${url}/courses/${courseId}/${moduleId}/sections/${section._id}/details`}>
                    <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-2"
                    >
                      View Section
                    </button>
                    </Link>
                    {/* View Section */}
                  </div>
                </div>
                {/* Row 2 */}

                </div>
              </div>
        </div>
      )}
    </Draggable>
  );
};

export default SectionCard;
