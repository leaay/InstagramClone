import React,{useContext, useEffect,useState} from 'react'
import { useParams , Navigate} from 'react-router-dom'
import { toggleFollow  } from '../firebase/firebaseCRUD'
import Header from '../components/Header'
import NewPost from '../components/NewPost'
import { Context } from '../context/context'
import { LOGIN } from '../utility/routes'
import ProfilePicture from '../components/ProfilePicture'
import Loader from '../components/Loader'
import PostGallery from '../components/PostGallery'
import { db  } from "../firebase/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore"; 



export default function ProfilePage() {

  const {username} = useParams()
  const [loading, setLoading] = useState(true)
  const [uid,setUID] = useState(null)
  const [currentUser , setCurrentUser] = useState()
  const [newPost , setNewPost] = useState(false)
  const {loggedUser,awaitUser,loggedUserData } = useContext(Context)
  const [isOwner , setIsOwner] = useState(false)
  const [profilePic , setProfilePic] = useState(false)
  const [gallery , setGallery] = useState(false)
  const [galleryData , setGalleryData] = useState(null)
  const [skip,setSkip] = useState(false)
  const [isFollowed , setIsFollwed] = useState(null)
  



  useEffect(()=>{

    setLoading(true)
    async function a(){
      const q =  query(collection(db,'users'),where('userName', '==', username))
     return await onSnapshot(q , i => setCurrentUser(i.docs.map(a => a.data())))
    }
    a()
  },[username])


  useEffect(()=>{
    if(gallery || newPost || profilePic){
      document.body.style.overflow = 'hidden'
    }else{
      document.body.style.overflow = 'auto'
    }
  },[gallery,newPost,profilePic])


  useEffect(()=>{
    if(skip && awaitUser){
      setLoading(false)
      const followed = currentUser[0].follwers.includes(loggedUser.uid)
      setIsFollwed(followed)
    
    }else{
      setIsFollwed(false)
      setSkip(true)
    }
  },[ currentUser ])


  useEffect(()=>{
   async function a(){
      if(awaitUser){
        if(loggedUser.displayName.toLowerCase() === username){
          setUID(loggedUser.uid)
          setIsOwner(true)
        }else{
          setIsOwner(false)
        }
      }
    }
    a()
  },[username,awaitUser])

  function handleFollow(){
    console.log('adding to following and adds new follower to this user')

    toggleFollow( isFollowed , loggedUser.uid , currentUser[0].userID , loggedUserData[0].following , currentUser[0].follwers )

    

  }

  function addPostModal(){
    setNewPost(true)
  }

  function changeProfilePic(){
    setProfilePic(true)
  }

  

  return (

    loggedUser === false ? <Navigate to={LOGIN} /> :

    loading ? <Loader /> : 

      <div style={newPost ? {overflowY:'hidden'} : {overflowY:'auto'}} className=' profil-page'>
        <Header />


        <div  className='user-info'>
            <div aria-label={isOwner ? 'change user profile picture ' : null}  style={isOwner ? null : {pointerEvents:'none'}} onClick={isOwner ? changeProfilePic : null} className='profileIcon profileIconBig userProfileImg' > <img alt='profil'  src={currentUser[0].profilePicture ==='null' ? './page-img/user.png' : `${currentUser[0].profilePicture.imgURL}`} /></div>
            <h2 className='profil-username'>{currentUser[0].userName}</h2>
              <div className='profil-stats'>
                <p style={{fontWeight:'300', color:'hsl( var(--clr-gray))'}}><span style={{fontWeight:'bolder', color:'black'}}>{currentUser[0].posts.length}</span> posts</p>
                <p style={{fontWeight:'300', color:'hsl( var(--clr-gray))'}}><span style={{fontWeight:'bolder', color:'black'}}>{currentUser[0].follwers.length}</span> followers</p>
                <p style={{fontWeight:'300', color:'hsl( var(--clr-gray))'}}><span style={{fontWeight:'bolder', color:'black'}}>{currentUser[0].following.length}</span> following</p>
              </div>
            <p className='standard-text'>{currentUser[0].fullName}</p>


          { isOwner ? <button aria-label='add new post ' onClick={addPostModal}  className='btn1 new-post-btn' >  New Post  </button> : null}
          { isOwner ? null : <button aria-label='follow or unFollow profile' onClick={handleFollow}  style={isFollowed ? {backgroundColor:'hsl( var(--clr-gray))'} : {backgroundColor:'hsl( var(--clr-blue))'}}  className='btn1 new-post-btn follow-btn' > {isFollowed ? 'Unfollow' : 'Follow'} </button>}


        </div>
        <div className='posts posts-grid'>

              {currentUser[0].posts.length === 0 ? <div style={{gridColumn:'2/3',fontSize:'1.2rem',marginTop:'2rem'}}>
                <img src='./page-img/camera.svg' />
                <div >No Posts Yet</div> 
                </div>: 

                currentUser[0].posts.sort((a,b)=> b.dateCreated - a.dateCreated).map((post , index) => <button aria-label='open user post for more detail' onClick={()=>{setGallery(true) ; setGalleryData({index: index , post: post })}} className='post-item' key={post.dateCreated}>
                  <img src={post.postImg.imgURL} />
                </button>)
              
              }


        </div>
        
        {newPost ? <NewPost postsArray={currentUser[0].posts} uid={uid}  post={setNewPost} /> : null}
        {profilePic ? <ProfilePicture  uid={uid} close={setProfilePic} currentImgName={currentUser[0].profilePicture} /> : null}
        {gallery ? <PostGallery  uid={uid} postsArray={currentUser[0].posts} owner={isOwner} close={setGallery} data={galleryData} userImg={currentUser[0].profilePicture.imgURL} /> : null}
      
      </div>

  )
}
