import axios from "../config/axios";


export const finishRegistration = async ( userId ) =>{
  const url = `/users/${userId}`;
  try {
  const response = await axios.patch(
    url,
    {},
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

export const completeRegistration = async ( userId,data ) => {
  const url = `/users/${userId}`;
  try {
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


export const adminUserUpdate = async ( userId,data ) => {
  const url = `/users/${userId}`;
  try {
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



export const activateUser = async (data) => {
}

export const signUp = async (firstName, middleName, lastName, email, password, callBack = undefined) => {
  try{

    const body = {
      "name": firstName,
      "middle_name": middleName,
      "last_name": lastName,
      "email": email,
      "password": password
    }

    const response = await axios.post(
      '/auth/register',
      body,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );

    return response;
  }catch(error){ 
        throw error;
  }
}
export const logIn = async (email,password,history,callback = undefined) => {
    try{    
      debugger
        const body = {
          "email": email,
          "password": password
        }
    
        const response = await axios.post(
          '/auth/login',
          body,
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          },
        );
        
        if(response.status == 200){
          localStorage.setItem("user_id", response.data.data._id );

            /*if( response.data.data.user.account_status == 'not_active') {
                history.push('/OTP')
            }
            if( response.data.data.user.account_status == 'active') {
                history.push('/StepperArea')
            }
            if( response.data.account_status == 'completed' ) {
                if(response.data.data.user.role == 'admin'){
                    history.push('/AdminDashboard')
                }
                if(response.data.data.user.role == 'instructor'){
                    history.push('/InstructorDashboard')      
                }
                if(response.data.data.user.role == 'member') {
                    history.push('/MemberDashboard')
                }
            }*/
            return response;
        }
        if(callback){await callback();}
        

      }catch(error){
            throw error;
      }
}

export const getCourseProgress = async ( courseId ) => {
  
  const url = `/users/courses/${courseId}`;

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

export const addProgress = async ( courseId, sectionId, contentId ) => {
  
  const url = `/users/courses/${courseId}/progress/section/${sectionId}/content/${contentId}`;

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


export const getAccomplishmentsForUser = async ( courseId ) => {
  
  const url = `/users/courses/${courseId}/accoumplishments`;

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


export const getFreeCourse = async ( courseId ) => {
  
  const url = `/users/courses/${courseId}/free`;

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


export const getUserDetails = async ( userId ) => {
  
  const url = `/users/${userId}`;

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

  export const getUserListForChat = async ( ) => {
  
    const url = `/users/chats/`;
  
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

export const getNotifications = async (skip) => {
  
      const url = `/users/notifications?skip=${skip}`;
    
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
export const seeNotification = async (notificationId) => {
  const url = `/users/notifications/${notificationId}`;
    
  try {
    const response = await axios.patch(
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

export const refreshUser = async () => {
  console.log(axios);
  const url = `/users/refresh`;

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
    
    debugger
    return response;
    }catch(error){
      throw error
    }
}


export const getVerificationMail = async () => {
  try{
    debugger;
      const resposne = await axios.get(
              'users/activate',
              {
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                },
              },
      );
      return resposne.data.data.generatedTimeCounter;

  }catch(error) {
    debugger;
    throw error;
  }
  
}

export const changePassword = async (data) => {
  try{
      debugger;   

      let config = {
          headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            }
        }
      const resposne = await axios.patch(
        'auth/changePassword',
        data,
        config,
      );

      return resposne.data.data;
    }catch(error){
        throw error;
    
    }
  }

export const forgetPassword = async(data)=>{
 
  try{
    debugger;   

    let config = {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          }
      }
    const resposne = await axios.post(
      'users/forgetPassword',
      data,
      config,
    );

    return resposne.data.data;
  }catch(error){
      throw error;
  
  }
}

export const verifyAccount = async (verificationCode) => {
  try{
      debugger;   

      let config = {
          headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            params: {
              token: verificationCode
          },
        }

      const resposne = await axios.post(
        'users/activate',
        {'body':'nothing'},
        config,
      );

      return resposne.data.data.account_status;
    }catch(error){
      debugger
          throw error;
    }
}


export const getUsersListForAdmin = async ( query ) => {
  const url = `users/admin?${query}`;

  let config = {
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }
  }
    try{
      const resposne = await axios.get(
        url,
        config,
      );

    return resposne;
    }catch(error){
      debugger
      throw error;
    }
}

export const getUserCreatedCourses = async ( userId, query ) => {
  const url = `users/${userId}/courses/?${query}`;

  let config = {
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }
  }
    try{
      const resposne = await axios.get(
        url,
        config,
      );

    return resposne;
    }catch(error){
      debugger
      throw error;
    }
}

export const getEnrolledMembersForInstructor = async ( query ) => {
  const url = `users/courses/enrolled?${query}`;

  let config = {
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }
  }
    try{
      const resposne = await axios.get(
        url,
        config,
      );

    return resposne;
    }catch(error){
      debugger
      throw error;
    }
}

export const getStatsForAdmin = async(selectedDate) =>{
  const url = `/users/admin/stats`;

  let config = {
    params: {'date':selectedDate},
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }
  }
    try{
      const resposne = await axios.get(
        url,
        config,
      );

    return resposne;
    }catch(error){
      debugger
      throw error;
    }
}

export const getStatsForMember = async() =>{
  const url = `/users/member/stats`;

  let config = {
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }
  }
    try{
      const resposne = await axios.get(
        url,
        config,
      );

    return resposne;
    }catch(error){
      debugger
      throw error;
    }
}

export const getStatsForInstructor = async() => {
  const url = `/users/instructor/stats`;
  let config = {
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }
  }
    try{
      const resposne = await axios.get(
        url,
        config,
      );

    return resposne;
    }catch(error){
      debugger
      throw error;
    }
}

export const logOut = async() => {
  const url = `/auth/logout`;
  let config = {
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }
  }
    try{
      const resposne = await axios.get(
        url,
        config,
      );

    return resposne;
    }catch(error){
      debugger
      throw error;
    }

  
}


export const sendContanct = async(data) => {
  
  const url = '/users/contancts';
  
  let config = {
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }
  }

  try{
      const resposne = await axios.post(
        url,
        data,
        config,
      );

    return resposne;
  }catch(error){
      debugger
      throw error;
    }

}