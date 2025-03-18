import axios from "../config/axios";

export const getCoursesTransactionForAdmin = async (query) => {
  const url = `/transactions/admin/courses?${query}`;

  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getDonationsTransactionForAdmin = async (query, userId) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/transactions/donations-admin/?${query}`,
      { userId }
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const getEarningsForInstructor = async (query, userId) => {
  // const url = `/transactions/earnings?${query}`;

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/transactions/donations-admin/?${query}`,
      { userId }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getDonationsHistoryForUser = async (query, userId) => {
  // const url = `${process.env.REACT_APP_BACKEND_URL}/api/transactions/donations?${query}`;
  // `/transactions/donations?${query}`;

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/transactions/donations/?${query}`,
      { userId }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateTransaction = async (transactionId, data) => {
  const url = `/transactions/${transactionId}`;

  try {
    const response = await axios.put(url, data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getPerchauseCourses = async (userId, query) => {
  const url = `/transactions/admin/users/${userId}?${query}`;

  let config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  try {
    const resposne = await axios.get(url, config);

    return resposne;
  } catch (error) {
    debugger;
    throw error;
  }
};
