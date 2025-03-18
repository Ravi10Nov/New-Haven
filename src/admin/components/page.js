import React, {useEffect,useState} from 'react'

export default function pagename(){
  return(
    <div className='pageclass'>
      <div className='row col-lg-12'>
        <div className='col-lg-2'>
          <p>this is sidebar</p>
        </div>
        <div className='col-lg-10'>
          <p>this is content</p>
        </div>
      </div>
    </div>
  )
}