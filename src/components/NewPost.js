import React,{useState} from 'react'
import { uploadImg } from '../firebase/firebaseSTORAGE'
import { doc } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { addImgUrlToPosts } from '../firebase/firebaseCRUD'
import Loader from './Loader'

export default function NewPost({post , uid , postsArray}) {

  const [file,setFile] = useState(null)
  const [postText , setPostText] = useState('')
  const [done,setDone] = useState(false)
  const [loading , setLoading] = useState(false)

  const isInvalid = postText ==='' || file === null
 
 async function addNewPost(){
    setLoading(true)
   const recivedURL =  await uploadImg(uid , file)
    const  post = {
      dateCreated:Date.now(),
      postImg:recivedURL,
      postDescription:postText,
    }
   postsArray.push(post)
    const ref = doc(db, `users` , uid  );
    await addImgUrlToPosts( ref , postsArray)
    setDone(true)
    setTimeout(close,1000)
  }

  function close(){
    post(false)
  }

  return (
    <>
    <div onClick={()=>post(false)} aria-label="close popup"  className='new-post-close'>
    </div>
        {loading ? <Loader /> : 
        <div className='new-post-box'>
            <h4 className='new-post-title' >Create new post</h4>
            <input aria-label="select file from your computer " style={{alignSelf:"start"}} accept="image/*" type='file' onChange={e => setFile(e.target.files[0]) } />
            <textarea aria-label="post text (mandatory)" onChange={e => setPostText(e.target.value)} maxLength="200" className='text-input textarea' />
            <button aria-label="publish new post" disabled={isInvalid} onClick={addNewPost} className='btn1'>Publish</button>
        </div>  
        }
        
    </>
    
  )
}

