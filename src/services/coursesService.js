import axios from "../config/axios";


export const addDraftedCourseDetails = async ( data ) =>{
    const url = `/courses`;
    try {
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


export const getCourseDetails = async ( courseId ) => {
    const url = `/courses/${courseId}`;
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

export const modifyCourseDetails = async ( courseId, data ) => {
  const url = `/courses/${courseId}`;

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

export const addSection = async ( courseId, data ) => {
  const url = `/courses/${courseId}/sections/`;
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


export const deleteSection = async ( courseId, sectionId ) => {
  const url = `/courses/${courseId}/sections/${sectionId}`;
  try{
      const response = await axios.delete(
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


export const modifySection = async( courseId, sectionId, data ) => {
  const url = `/courses/${courseId}/sections/${sectionId}`;
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


export const addContent = async( courseId, sectionId, data ) => {
  const url = `/courses/${courseId}/sections/${sectionId}/contents`;

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
    throw error;
  }
}


export const modifyContent = async( courseId, sectionId, contentId, data ) => {
  const url = `/courses/${courseId}/sections/${sectionId}/contents/${contentId}`
  
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

  }catch(error) {
    throw error;
  }

}

export const deleteContent = async( courseId, sectionId, contentId ) => {
  const url = `/courses/${courseId}/sections/${sectionId}/contents/${contentId}`
  
  try {

    const response = await axios.delete(
      url,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },

    );

    return response;
  }catch(error) {
    throw error;
  }

}

export const getContent = async ( courseId, sectionId, contentId ) => {
  const url = `/courses/${courseId}/sections/${sectionId}/contents/${contentId}`
  try{
  const response = await axios.get(
    url,
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  )
  return response;
  }catch( error ) {
    throw error;
  }
  
}

export const getPublishedCourses = async ( query ) => {
  const url = `/courses?isPublished=true&${query}`
  try{
  const response = await axios.get(
    url,
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  )
  return response;
  }catch( error ) {
    throw error;
  }
}


export const getAccomplishments = async ( courseId ) => {
  const url = `/courses/${courseId}/accoumplishments`;

  try{
  const response = await axios.get(
    url,
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  )
  return response;
  }catch( error ) {
    throw error;
  }
}

export const setAccoumplishments = async ( courseId, data ) => {
  const url = `/courses/${courseId}/accoumplishments`;

  try{
  const response = await axios.put(
    url,
    data,
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  )
  return response;
  }catch( error ) {
    throw error;
  }
}

export const deleteCourse = async (courseId) => {
  const url = `/courses/${courseId}`;

  try{
    const response = await axios.delete(
      url,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )
  
    return response;
    }catch( error ) {
      throw error;
    }
}





export const publishCourse = async ( courseId ) => {
  const url = `/courses/${courseId}/publish`;
  
  try{

    const response = await axios.post(
      url,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )
  
    return response;

    } catch( error ) {
      throw error;
    }

} 


export const getOwnedCoursesThatNeedQuiz = async (search) => {

  const url = `/courses?isForAddQuiz=true&${search}`;
  
  
  try{
  const response = await axios.get(
    url,
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  )

  return response;
  }catch( error ) {
    throw error;
  }

}



export const getOwnedCoursesForEditing = async ( page, itemPerPage ) => {
  const url = `/courses?isLive=true&isOwned=true`;

  try{
  const response = await axios.get(
    url,
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  )

  return response;
  }catch( error ) {
    throw error;
  }
}

export const getDraftedCourses = async (query ) => {
  const url = `/courses?isDrafted=true&${query}`;

  try{
  const response = await axios.get(
    url,
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  )

  return response;
  }catch( error ) {
    throw error;
  }
}

export const getLiveCoursesForAdmin = async ( query ) => {

  const url = `/courses?isLive=true&${query}`;

  try{
  const response = await axios.get(
    url,
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  )

  return response;
  }catch( error ) {
    throw error;
  }
}

export const getCoursesThatNeedAccoumplishments = async ( query ) => {
  const url = `/courses?isForAddAccomplishment=true&${query}`
  try{
  const response = await axios.get(
    url,
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  )
  return response;
  }catch( error ) {
    throw error;
  }
}


export const getCoursesThatHaveAccoumplishments = async ( query ) => {
  const url = `/courses?isForModifyAccomplishment=true&${query}`
  try{
  const response = await axios.get(
    url,
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  )
  return response;
  }catch( error ) {
    throw error;
  }
}


export const getOwnedCoursesThatHaveQuizzes = async ( query ) => {
  const url = `/courses?isForModifyOwnedQuiz=true&${query}`

  try{
    const response = await axios.get(
      url,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )
    return response;
    }catch( error ) {
      throw error;
    }
}

export const approveCourse = async ( courseId ) => {
  const url = `/courses/${courseId}/approve`;

  try{
    const response = await axios.post(
      url,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )
    return response;
    }catch( error ) {
      throw error;
    }

}

export const copyCourseForEditing = async (courseId) => {
  const url = `/courses/${courseId}/copy`;

  try{
    const response = await axios.post(
      url,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )
    return response;
    }catch( error ) {
      throw error;
    }

}

export const validateCourseEditing = async (courseId) => {
  const url = `/courses/${courseId}/validateChange`;

  try{
    const response = await axios.post(
      url,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )
    return response;
    }catch( error ) {
      throw error;
    }

}


export const getPreRequisitesList = async (courseId,course_name) => {
  const url = `/courses?isForPreRequisites=true`;

  try{
    const response = await axios.get(
      url,
      {
        params: {'course_id':courseId,'name':course_name},
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )
    return response;
    }catch( error ) {
      throw error;
    }

}


export const getAllCoursesType = async (itemPerTypeCount) => {

  const url = `/courses`;
  debugger;
  const params = { itemPerTypeCount, 'type': 'allTypes' };
  try{
    const response = await axios.get(
      url,
      {
        params,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )
    return response;
    }catch( error ) {
      throw error;
    }
}

export const getFreeCourses = async ( page, itemPerPage, category ) => {
  const url = `courses?type=free`;
  const params = {page,'count': itemPerPage };

  if( category ){
    params[ 'category' ] = category;
  }
  debugger;

  try{
    const response = await axios.get(
      url,
      {
        params,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )
    return response;
    }catch( error ) {
      throw error;
    }

}

export const getRecommendedCourses = async ( page, itemPerPage, cetegory ) => {
  const url = `courses?type=recommended`;
  const params = {page,'count': itemPerPage };
  

  try{
    const response = await axios.get(
      url,
      {
        params,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )
    return response;
    }catch( error ) {
      throw error;
    }


}

export const getUpcommingCourses = async ( page, itemPerPage ) => {

  const url = `courses?type=upcomming`;
  const params = {page,'count': itemPerPage };


  try{
    const response = await axios.get(
      url,
      {
        params,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )
    return response;
    }catch( error ) {
      throw error;
    }

}

export const getCompletedCourses = async( page, itemPerPage, category ) =>{

  const url = `courses?type=completed`;
  const params = {page,'count': itemPerPage };

  if( category ){
    params[ 'category' ] = category;
  }

  try{
    const response = await axios.get(
      url,
      {
        params,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )
    return response;
    }catch( error ) {
      throw error;
    }

}

export const getOnGoingCourses = async( page, itemPerPage ) => {

  const url = `courses?type=ongoing`;
  const params = {page,'count': itemPerPage };


  try{
    const response = await axios.get(
      url,
      {
        params,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )
    return response;
    }catch( error ) {
      throw error;
    }

}

export const getUserOnCourseOperation = async( courseId ) => {

  const url = `courses/${courseId}/operation`;


  try{
    const response = await axios.get(
      url,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )
    return response;
    }catch( error ) {
      throw error;
    }

}

export const getFreeCourseOperatin = async ( courseId ) => {
  const url = `courses/${courseId}/operation`;


  try{
    const response = await axios.get(
      url,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )
    return response;
    }catch( error ) {
      throw error;
    }
}