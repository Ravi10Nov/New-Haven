import React from 'react';
import { Link } from 'react-router-dom';
export default function NotFound() {
  return (
    <div className='notFound'>
      <div className='row mt-5'>
        <h2 className='text-center'>404</h2>
        <h1 className='text-center'>Page not found!</h1>
        <div className='text-center'>
          <Link to='/'>back to home</Link>
        </div>
      </div>
    </div>
  );
}
