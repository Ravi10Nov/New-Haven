import Pagination from '@mui/material/Pagination';
import React from 'react';
import mark from '../../assets/truthCertificate.png';
import './certificate.css';
export default function Letter() {
  return (
    <div className='letter'>
      
      <div className='pagination'>
        <div>
          <p>showing 1 to 10</p>
        </div>
        <div>
          <Pagination count={2} shape='rounded'></Pagination>
        </div>

        <div>
          <select>
            <option>0/page</option>
            <option>5/page</option>
            <option>10/page</option>
          </select>
        </div>

        <div>
          <span> go to</span>
          <input></input>
        </div>
      </div>
    </div>
  );
}
