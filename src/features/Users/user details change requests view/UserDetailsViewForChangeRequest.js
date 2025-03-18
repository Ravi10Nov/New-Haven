import React, { useEffect, useState } from 'react';
import './UserDetails.css';
import { getImagePath } from 'services/imageService';
import { useHistory, useParams,NavLink } from 'react-router-dom';
import { approveUserChangeRequest, disapproveUserChangeRequest, getUserChagneRequestForView } from 'services/changesService';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';



const NormalimageAvatarContainer = ( {oldImage} ) =>{

    return(
        <div className={`mx-auto w-[130px] h-[130px]`} style={{ 'border-radius': '28%', 'margin': 'auto', 'overflow': 'hidden'}} >


        <img height={'100%'} width={'100%'} className={' w-full h-full object-fill '} src={oldImage} alt="Extra large avatar"/>

        </div>
    )
}

const ChangeImageAvatarContainer = ( {oldImage,newImage} ) => {
    const [ isShowNewValue, setIsShowNewValue ] = React.useState( false );

    return(
        <div onMouseEnter={ () => setIsShowNewValue(true) } onMouseLeave={ () => setIsShowNewValue(false)} className={`mx-auto w-[130px] h-[130px] ${ isShowNewValue || 'shadow-lg '}`} style={{ 'border-radius': '28%', 'margin': 'auto', 'overflow': 'hidden'}} >


        { isShowNewValue || <img height={'100%'} width={'100%'} className={' w-full h-full object-fill '} src={oldImage} alt="Extra large avatar"/>  }
        { !isShowNewValue || <img height={'100%'} width={'100%'} className={' w-full h-full object-fill '} src={newImage} alt="Extra large avatar"/>  }

        </div>
    )
    
}


const NormalFormValue = ( {value, fieldName, label}  ) => {
    return(
        <div className='col-lg-4 col-md-12 col-sm-12 inputs_group'>
        <div className={`row first_name` } >
            <label className={`!min-w-[210px]`} > { label } </label>
            <input
              type='text'
              id={fieldName}
              name={fieldName}
              disabled={true}
              value = {value }
            />
        </div>
        </div>
        )
}

const ChangedFormValue = ( {oldValue, newValue, fieldName, label} ) => {
    const [ isShowNewValue, setIsShowNewValue ] = React.useState( false );
    return(
    <div className='col-lg-4 col-md-12 col-sm-12 inputs_group'>
    <div className={`row first_name` } onMouseEnter={ () => setIsShowNewValue(true) } onMouseLeave={ () => setIsShowNewValue(false) }>
        <label className={`!min-w-[210px] ${isShowNewValue ? '' : ' !text-blue-500'}`} > { label } </label>
        <input
          className={`${isShowNewValue ? '' : ' !bg-blue-300 text-white'}`}
          type='text'
          id={fieldName}
          name={fieldName}
          disabled={true}
          value = { isShowNewValue ? `${ newValue }` : oldValue }
        />
    </div>
    </div>
    )
}

const UserDetailsForChangeViewRequest = ( { url, initialUserData, initImageId } ) => {

  const [ isLoading, setIsLoading] = React.useState(true);
  const [ userId, __ ] = React.useState( '' ); 
  const [ images, setImages ] = React.useState( null )
  const { changeRequestId } = useParams();
  const [ id, setId ] = useState(null);
  const [MockUpData, setMockupData] = React.useState(null);
  useEffect( ()=> {
    initData()

  },[]);  

  const history = useHistory();

  const handleApprove = async () => {
    try{

      const response = await approveUserChangeRequest( id );
      toast.success('user profile change have been successfully approved');
      history.push(`${url}/users/changes`);
    }catch(error){
      toast.error(error);
    }
  }
  const handleDisapprove = async ( id ) =>{

    try{

      const response = await disapproveUserChangeRequest( );
      toast.success('user profile change have been successfully dissaproved');
      history.push(`${url}/users/changes`);

    }catch(error){
      toast.error(error);
    }

  }

  
  const initData = async () => {
    try{
    const response = await getUserChagneRequestForView(changeRequestId);
    const newValues = response.data.data.new_values;
    setId(response.data.data._id);
    if(newValues['image'].isModified){
        const oldImage = await getImagePath(newValues['image'].old);
        const newImage = await getImagePath(newValues['image'].new);
        debugger;
        setImages( {'old': oldImage,'new': newImage} );
    }else{
        const oldImage = await getImagePath(newValues['image']);

        setImages( {'old': oldImage } );
    }
    setMockupData(newValues);
    setIsLoading(false)
  }catch(error){
    toast.warning('This request is already treated');
    history.push(`${url}/notifications`);
  }
  }


  if(!isLoading){
  return (
    <div className='container-fluid mt-4 px-4'>
    <div className='profilecontentPanel dashboardContentPanel'>
      <br />

      <div className='profileInput'>


        <div className='user_info_container'>
          <div className='container personal_info personal_info_shadow_none'>

        <h3 className='content_title'>Personal Information</h3>

        <div>
          <hr />
        </div>

        <div className='row'>

        <div className='col-md-3 col-sm-12 mx-auto'>
          
  
          { 
            MockUpData['image'].isModified ?
            <>
                <ChangeImageAvatarContainer oldImage={images.old} newImage={images.new} ></ChangeImageAvatarContainer> 
            </>
            :
            <>
                <NormalimageAvatarContainer oldImage={images.old}/>
            </>
            }   


        </div>

          <div className='col-md-9 col-sm-12 user_form mx-auto'>
         

          

            <form className='row mx-auto form_inputs'>
                

                
                {Object.keys(MockUpData).map( formField => {
                    if ( formField == 'image' ) {
                        return;
                    }


                    if( MockUpData[formField].isModified ) {
                        
                        if( formField == 'birth_date' ) {

                        return <ChangedFormValue oldValue={ MockUpData[formField].old } newValue={MockUpData[formField].new} label={`${formField.replace("_", " ")} (yyyy-mm-dd)`} fieldName={ formField.replace("_", " ") } > </ChangedFormValue>

                        }

                        return <ChangedFormValue oldValue={MockUpData[formField].old} newValue={MockUpData[formField].new} label={`${formField.replace("_", " ")} `} fieldName={ formField.replace("_", " ") } > </ChangedFormValue>
                    }
                    if( formField == 'birth_date' ) {

                      return <NormalFormValue value={MockUpData[formField]} fieldName={`${formField.replace("_", " ")} `} label={`${formField.replace("_", " ")} (yyyy-mm-dd)`} > </NormalFormValue>

                      }

                    return <NormalFormValue value={MockUpData[formField]} fieldName={`${formField.replace("_", " ")} `} label={`${formField.replace("_", " ")} `} > </NormalFormValue>
                })}


            


  





                

            </form>
 
          </div>
          <div className='lc_flex justify-center items-center !mb-4'>
    
    <Button variant='contained' className='bt_success' onClick={()=> handleApprove(id)}> Approve </Button>


    <Button variant='contained' className='bt_danger' onClick={()=> handleDisapprove(id)} > Dissaprove </Button>

    </div>
          <br></br>
           
        </div>
      </div>
 
    </div>
  
    </div>

    </div>
    {/* 
    <div className='mt-4 mb-3'>
              
              <Button
                variant='contained'
                style={{
                  background: `${ isChangeRequested ? 'white' : '#18498B' } `,
                  borderRadius: '2px',
                  margin: '5px',
                }}
                disabled={ !validateForm() || imageId.length <= 0 || isChangeRequested }
                >
                { isChangeRequested ? 'A change is already requested' : 'Request Update'}
              </Button>

              <Button
                variant='outlined'
                style={{
                  background: '#E6F0FF',
                  borderRadius: '2px',
                  color: '#18498B',
                  margin: '5px',
                }}>
                Cancel
              </Button>
            </div>
            */}
      </div>
            
  );
  }
};

export default UserDetailsForChangeViewRequest;


































const mockUpData = {
    "error": false,
    "responseTimestamp": "2022-09-10T19:10:42.343Z",
    "statusCode": 200,
    "data": {
        "_id": "631ce13249e2843598c1f93c",
        "object_id": "631bb8c657e0862ab23ebcae",
        "old_values": {
            "spirtual_name": "Modalyoto",
            "role": "member",
            "status": true,
            "temp_object": "631ce12f49e2843598c1f93b",
            "new_email": "",
            "isDonated": true,
            "account_status": "finished",
            "completed_courses": {},
            "on_going_courses": {},
            "_id": "631bb8c657e0862ab23ebcae",
            "name": "Mugiwara",
            "middle_name": "Madlawili",
            "last_name": "macklos",
            "email": "elbatouri.cf@gmail.com",
            "isChangeBlocked": true,
            "progress_array": [],
            "chat_room": [],
            "createdAt": "2022-09-09T22:05:58.827Z",
            "updatedAt": "2022-09-10T19:10:40.871Z",
            "__v": 0,
            "adresse_line_1": "Akwaparko",
            "adresse_line_2": "Akwaparko 2",
            "city": "MADONISYA",
            "country": "Marwekoss",
            "dralla_wallet_adress": "Baby let's dralla",
            "image": "631c15c3c0daee94b37431be",
            "phone_number": 524649803,
            "sex": "male",
            "state": "MARANAMO",
            "zip_code": 46300,
            "birth_date": "2000-04-13"
        },
        "new_values": {
            "last_name": "macklos",
            "name": "Mugiwara",
            "sex": {
                "new": "female",
                "old": "male",
                "isModified": true
            },
            "birth_date": {
                "new": "2001-04-13",
                "old": "2000-04-13",
                "isModified": true
            },
            "image": {
                "new": "631ce0b7e493a52a4b536e96",
                "old": "631c15c3c0daee94b37431be",
                "isModified": true
            },
            "middle_name": "Madlawili",
            "dralla_wallet_adress": "Baby let's dralla",
            "spirtual_name": "Modalyoto",
            "email": "elbatouri.cf@gmail.com",
            "adresse_line_1": "Akwaparko",
            "adresse_line_2": "Akwaparko 2",
            "state": "MARANAMO",
            "city": "MADONISYA",
            "zip_code": 46300,
            "country": "Marwekoss",
            "phone_number": 524649803
        },
        "object_type": "user",
        "createdAt": "2022-09-10T19:10:42.337Z",
        "updatedAt": "2022-09-10T19:10:42.337Z",
        "id": "631ce13249e2843598c1f93c"
    }
}