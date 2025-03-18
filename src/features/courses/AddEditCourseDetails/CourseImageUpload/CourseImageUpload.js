import React from 'react';
import axios from '../../../../config/axios';
import { getImagePath } from '../../../../services/imageService'
import './CourseImageUpload.css';
//import "antd/dist/antd.css";
//import 'antd/dist/antd.min.css'
import 'antd/dist/reset.css';


//Image upload modules
import { Upload, Progress } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const CourseImageUpload = ({setIdOnParent, defaultImage, operation, type}) => {
const [ defaultFileList, setDefaultFileList ] = React.useState([]);
const [ progress, setProgress ] = React.useState(0);
const [ id, setId ] = React.useState(defaultImage);

  React.useEffect(
    () => {
    console.log('new Id on parent', id)
    setIdOnParent(id);
    // debugger;
    },[ id ]
  )

  const intiDefaultImage = async (defaultImage) => {

    try{
      
    const imagePath = await getImagePath(defaultImage)
    console.log(imagePath)
    setDefaultFileList([{uid: "-1",status:'done',name:'image.jpg',url: imagePath}])
    }catch(error){
    console.log(error)
    }

  }

  React.useEffect(()=>{
      if(defaultImage){
      intiDefaultImage(defaultImage);
      }   
  },[defaultImage])


  const uploadImage = async options => {
    const { onSuccess, onError, file, onProgress } = options;
    const fmData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: event => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      }
    };

    fmData.append("photo", file);

    try {
      // debugger
      const res = await axios.post(
        "/media",
        fmData,
      );
      setId(res.data.data._id)
      onSuccess("Ok");
      console.log("server res: ", res);
    } catch (err) {
      console.log("Eroor: ", err);
      const error = new Error("Some error");
      onError({ err });
    }
  };

  const handleOnChange = ({ file, fileList, event }) => {
    // console.log(file, fileList, event);
    //Using Hooks to update the state to the current filelist
    setDefaultFileList(fileList);
    //filelist - [{uid: "-1",url:'Some url to image'}]
  };
  const handleOnRemove = async () => {
 
    switch(operation){
      case 'add':
        setId('');
        break;
      case 'edit':
        setId('');
        break;
      default:
        console.error(' No operation is specified ');

    }
    
  }
  const removeImageFromDataBase = async () => {
    try{
    const res = await axios.delete(
      `/media/${id}`
    );
    setId('');
    }catch( error ){
      console.log(error);
    }
  }
  return (
      <>
      <Upload
        accept="image/*"
        customRequest={uploadImage}
        onChange={handleOnChange}
        onRemove={handleOnRemove}
        listType="picture-card"
        fileList={defaultFileList}
        className="image-upload-grid"
      >
        {defaultFileList.length >= 1 ? null : <div>{ type == 'PROFILE' ? "Picture Upload (10 MB Max Size)" : "Course Image upload" }</div>}
      </Upload>
      { progress > 0 ? <Progress percent={progress} /> : null}
      </>
  );
};

export default CourseImageUpload;