import axios from "../config/axios";



// get list of course changes
export const getCoursesChangeRequests = async ( search ) =>{
    const url = `/changes/courses?${search}`;

    try {
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

export const getUserChangeRequests = async ( search ) =>{
    const url = `/changes/users?${search}`;

    try {
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

export const getUserChagneRequestForView = async ( requestId ) =>{
  const url = `/changes/courses/${requestId}`;

  try {
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

export const approveCourseChangeRequest = async(requestId) => {
    const url = `/changes/courses/${requestId}/approve`;

    try {
        const response = await axios.post(
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


export const disapproveCourseChangeRequest = async(requestId) => {
    const url = `/changes/courses/${requestId}/disapprove`;

    try {
        const response = await axios.post(
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


export const getApproveCourseChangeRequest = async(requestId) => {
    const url = `/changes/courses/${requestId}`;

    try {
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


export const disapproveUserChangeRequest = async(requestId) => {
  const url = `/changes/users/${requestId}/disapprove`;

  try {
      const response = await axios.post(
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


export const approveUserChangeRequest = async(requestId) => {
  const url = `/changes/users/${requestId}/approve`;

  try {
      const response = await axios.post(
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

export const updateUser = async(data) => {
  const url = `/changes/users`;

  try {
      const response = await axios.put(
        url,data,
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

