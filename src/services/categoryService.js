import axios from "../config/axios";

export const modifyCategory = async( categoryId, data ) => {
    const url = `/categories/${categoryId}`;
    try{
        const response = await axios.patch(
            url,
            data,
            {
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                },
              },
            );
        return response;
    }catch(error){
      throw error
    }
  }
  
  export const addCategory = async ( data ) => {
    const url = `/categories`;
    try{
        const response = await axios.post(
            url,
            data,
            {
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                },
              },
            );
        return response;
    }catch(error){
      throw error
    }
  }

  export const getAllCategories = async ( query ) => {
    let url = '';
    if(query){
      url = `/categories?${query}`;
    }else{
      url = `/categories`;
    }
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
        return response;
    }catch(error){
      throw error
    }
  }