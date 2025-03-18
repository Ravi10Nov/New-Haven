import React, { createContext, useEffect, useReducer, useState } from 'react';



export const UploadContextApi = createContext();



const UploadContextProvider = ({ children }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "SUCCESS":
        console.log('action',action);

        return state.map((uploadedFile) => {
          if (uploadedFile.id === action.id) {
            return { ...uploadedFile, status: 'success',file_name:action.file_name,file_id:action.file_id };
          } else {
            return uploadedFile;
          }
        });
        case "ERROR":
          return state.map((uploadedFile) => {
            if (uploadedFile.id === action.id) {
              return { ...uploadedFile, status: 'error' };
            } else {
              return uploadedFile;
            }
          });
      case "DELETE":
          const newUploadFiles = state.filter((fileBuffer) => fileBuffer.id != action.id );
          return newUploadFiles;
          break;
      case "ADD":
        const newState = [...state];
        newState.push({'id':action.uuid, 'progress':0,'status':'info', 'formData':action.bodyFormData });
        return newState;
      case 'INIT':
        return [];
      default:
        return state;
    }
  };
  const [uploadedFiles, dispatch] = useReducer(reducer, []);
  const [uploadBuffer, setUploadBuffer] = useState();

  useEffect(()=>{
    console.log(uploadedFiles);
    const uploadBufferTemp = uploadedFiles.filter( (item) => item.status == 'success').map(item => {return{ id:item.file_id, filename:item.file_name  }});
    setUploadBuffer(uploadBufferTemp);
  },[uploadedFiles])
  const data = { uploadedFiles, dispatch,uploadBuffer };
  return <UploadContextApi.Provider value={data}>{children}</UploadContextApi.Provider>;
};

export default UploadContextProvider;
