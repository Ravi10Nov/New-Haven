import React, {useContext,useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import Loader from 'components/Loader';
import { useAuth } from 'hooks/useAuth';

const AccomplishmentsHome = ({url}) => {
    const {user} = useAuth();
  return (
    <div className="bg-white flex justify-center items-center">
        {/* Courses and Certificates */}
        <div className="rounded overflow-hidden shadow-lg w-4/5">
            <div className="px-6 py-4 flex items-center justify-between">
                <div className="font-bold text-xl mb-2">Courses and Certificates</div>
                <Link to={`${url}/accomplishments/courses/certificates/${user._id}`}>
                <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                    View
                </button>
                </Link>
            </div>
        </div>
        {/* Courses and Certificates */}
    </div>


  )
}

export default AccomplishmentsHome