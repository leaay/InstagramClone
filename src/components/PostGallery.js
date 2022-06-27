import React  from 'react'
import { updatePostArray } from '../firebase/firebaseCRUD'
import { deleteProfilePicBeforeNewOne } from '../firebase/firebaseSTORAGE'

export default function PostGallery({setPostDeleted ,close , data , userImg , owner , postsArray ,uid }) {

    let d = new Date(data.post.dateCreated).toISOString().slice(0, 10)
  
  async  function handleDelete(){
      
    const newPostArray =  await postsArray.filter(i => {
            if(i.dateCreated !== data.post.dateCreated){
              return i
            }else{
              return
            }
      })

      await  updatePostArray(uid , newPostArray)
      await  deleteProfilePicBeforeNewOne(uid,data.post.postImg.imgName)
      setPostDeleted(true)
      close(false)


    }


  return (
        <>
        <div  onClick={()=>close(false)} className='new-post-close'></div>
        <div className='post-gallery'>
           {owner ?  <button onClick={handleDelete} className='delete-post'><img src='./page-img/bin.svg' /></button> : null }
            <img style={{pointerEvents:'none' }} src={data.post.postImg.imgURL} />
            <p style={{fontSize:'.6rem' }} className='standard-text post-date'>Posted: {d}</p>
            <div className='post-desc-box'><img style={{margin:'0 1rem 1rem'}} className='profileIcon  userProfileImg' src={userImg  ? `${userImg}` : './page-img/user.png'  } /><p className='standard-text post-desc'>{data.post.postDescription}</p></div>
            
        </div>
        </>
  )
}
