import React, { useState } from 'react'
import { deleteProfilePicBeforeNewOne, uploadImg } from '../firebase/firebaseSTORAGE'
import { db } from '../firebase/firebase'
import { changeProfilePic } from '../firebase/firebaseCRUD'
import { doc } from 'firebase/firestore'

export default function ProfilePicture({setProfilePicChanged ,close , uid , currentImgName}) {

    const [file , setFile ] = useState(null)

  

  async  function handleChange(){
              
            if(file === null){
              
                await deleteProfilePicBeforeNewOne(uid , currentImgName.imgName)
                const ref = doc(db, `users` , uid  );
                await changeProfilePic( ref , 'null')
                setProfilePicChanged(true)
                close(false)

            }else{
              
                if(currentImgName === 'null'){
                  
                  const img =  await uploadImg(uid , file)
                  const ref = doc(db, `users` , uid  );
                  await changeProfilePic( ref , img)
                  setProfilePicChanged(true)
                  close(false)

                }else{
                  
                  await deleteProfilePicBeforeNewOne(uid , currentImgName.imgName)
                  const img =  await uploadImg(uid , file)
                  const ref = doc(db, `users` , uid  );
                  await changeProfilePic( ref , img)
                  setProfilePicChanged(true)
                  close(false)

                }
            }

   
            

    }


  return (
    <>
    <div onClick={()=>close(false)}  className='new-post-close'>
    </div>

       <div className='new-post-box'>
            <h4 className='new-post-title' >Change your profile picture</h4>   

                <label aria-label="upload your new proflie picture" >
                   <img alt='' className='upload-img' src='./page-img/upload.svg' />
                <input accept="image/*" className='change-pp-input' onChange={e => setFile(e.target.files[0])}  type='file' />
                </label>
               

            <button aria-label="delete or change your profile picture"  onClick={handleChange}  className='btn1'> { currentImgName === 'null' ? 'Change' :  file ? 'Change' : 'Delete profile picture' } </button>
            
        </div>  

        
    </>
  )
}

