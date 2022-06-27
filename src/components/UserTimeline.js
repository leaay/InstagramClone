import React, { useContext , useEffect , useState} from 'react'
import { Context } from '../context/context'
import Loader from './Loader'
import { Link } from 'react-router-dom'

export default function UserTimeline() {

    const { allPosts , awaitPostData} = useContext(Context)
    const [loading , setLoading] = useState(true)







    useEffect(()=>{
        

        if(awaitPostData){
            setTimeout(()=>setLoading(false),1000)
        }
    },[awaitPostData])
    







  return (
    <div  className='timeline'>
        { 
            loading ? <Loader /> : allPosts.length === 0 ? <div style={{maxWidth:'400px' , margin:'0 auto'}}> Start following people for more content </div> :   allPosts.sort((a,b)=> b.postDetail.dateCreated - a.postDetail.dateCreated).map(post => <div className='timeline-post' key={post.postDetail.dateCreated}>
            <Link className='timeline-link' to={`/${post.userName}`} ><img className='timeline-owner' src={post.profilePicture === 'null' ? './page-img/user.png' : `${post.profilePicture.imgURL}`} /><p>{post.userName}</p></Link>
            <img className='timeline-post-img' src={post.postDetail.postImg.imgURL} />
            <div className='timeline-post-content'>
                <Link style={{fontWeight:'bolder'}} to={`/${post.userName}`} >{post.userName} </Link> {post.postDetail.postDescription}
            </div>
            </div>) 
            }
        
    </div>
    
    
  )
}
