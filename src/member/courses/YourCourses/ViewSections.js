import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import SendIcon from '@mui/icons-material/Send';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Loader from 'components/Loader';



// import { useCourse } from 'hooks/useCourse';
// import CourseContext from 'contexts/CourseContext';
import { useAuth } from 'hooks/useAuth';

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

export default function ViewSections({ url }) {

  // const {createCourse} = useCourse();
  // const {createCourse} = useContext(CourseContext);
  const { getSectionsofModule } = useAuth();
  const { courseId, moduleId } = useParams();

  const [sections, setSections] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetch = async () => {
    setIsLoading(true);
    const response = await getSectionsofModule(moduleId);
    console.log(response);
    if (response.success) setSections(response.sections);
    setIsLoading(false);

  }

  useEffect(() => {
    fetch();
  }, [])

  if (!isLoading) {
    return (
      <div style={{ backgroundColor: "white" }}>

        <div className="flex justify-start items-center p-2">
          <Link to={`${url}/courses/enrolled/${courseId}/modules`}>
            <Button variant="contained" className="mb-2 mt-2" startIcon={<FastRewindIcon />}>
              Back
            </Button>
          </Link>
        </div>

        {/* Display sections */}

        <div className="bg-white flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            View Sections
          </h2>

          <div className="rounded overflow-hidden shadow-lg w-4/5">
            {sections && sections.map((section) => (
              <div key={section?._id} className="px-6 py-4 flex items-center justify-between border-b">
                <div className="font-bold text-xl mb-2">{section?.title}</div>

                <div className='flex items-center justify-end'>
                  <Link to={`${url}/courses/enrolled/${courseId}/${moduleId}/section/${section._id}/details`}>
                    <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-2"
                    >
                      Continue
                    </button>
                  </Link>
                </div>

              </div>
            ))}
          </div>

        </div>

        <div className='p-2'>
          <Link to={`${url}/courses/enrolled/${courseId}/modules`}>
            <Button variant="contained" className="mb-2 mt-2" startIcon={<FastRewindIcon />}>
              Back
            </Button>
          </Link>
        </div>

        {/* Display sections */}

      </div>
    );
  }
  else {
    return <Loader />
  }
}