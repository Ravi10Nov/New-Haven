import { UPLOADS_PATH } from "config/magic_constants";
import axios from "../config/axios";




const getImagePath = async (imageId) => {
    const url = `/media/${imageId}`;
    debugger
    try{
        const response = await axios.get(
            url,
            {
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                },
              },
            );
        const path = `${UPLOADS_PATH}/${response.data.data.filename}`;
        debugger;
        return path;
    }catch(error){
      throw error
    }
}

const deleteImage = async (imageId) => {

}

const uploadImage = async (imageData) => {
    
}

export {getImagePath};