import React from 'react'
import {Button} from "react-bootstrap"
export default function CourseSubmenu(){
   return(
      <div className='courseSubmenu'  style={{display:"flex",justifyContent:"space-between"}}>
         <Button style={{backgroundColor:"grey"}}>User Interface</Button>
         <Button style={{backgroundColor:"grey"}}>User Expericence</Button>
         <Button style={{backgroundColor:"grey"}}>Website design</Button>
         <Button style={{backgroundColor:"grey"}}>User Interface</Button>
         <Button style={{backgroundColor:"grey"}}>User Interface</Button>
      </div>
   )
}