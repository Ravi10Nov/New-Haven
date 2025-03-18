import React from "react";

export default function AdminDashboardContent() {

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
    <div className="w-[90%] px-6 py-8 rounded-lg">
      <h1 className="text-3xl text-center text-blue-900 font-bold mb-6">Spirit of Truth Native American Church</h1>
      <h1 className="text-3xl text-center text-blue-900 font-bold mb-6">Back Office Educational Portal</h1>
      {/* <p className="text-2xl font-bold mb-6">Back Office Educational Portal</p> */}
      <p className="text-gray-700 mb-8 text-2xl">
        Welcome to your back office. To further your advancement and education, please enroll and complete the educational courses. These courses are to assist you on your Spiritual Journey and give you a greater understanding of the Church. Over time the courses will branch out into many different educational areas. Follow your unique educational path by choosing the courses you are most interested in. If you desire more education in a specific area, please email admin so they can better assist you on your Journey.
      </p>
    </div>
  </div>
  );
}
