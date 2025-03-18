import React, { createContext } from 'react';

export const ContextApi = createContext();

const CourseModalContextProvider = ({ children }) => {

  const [ selectedCourse, setSelectedCourse ] = React.useState(false);
  const [ showModal, setShowModal ] = React.useState( null );

  const data = { selectedCourse, showModal, setSelectedCourse, setShowModal };
  return <ContextApi.Provider value={data}>{children}</ContextApi.Provider>;
};

export default CourseModalContextProvider;
