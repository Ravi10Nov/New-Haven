import axios from "../config/axios";

export const getQuiz = async (quizId) => {
    const url = `/quizzes/${quizId}`;

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

export const updateQuiz = async ( quizId, data ) => {
    const url = `/quizzes/${quizId}`;

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

export const addQuiz = async ( courseId, data ) => {
    const url = `/courses/${courseId}/quizzes`;

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
    }catch(error) {
          throw error
    }

}

