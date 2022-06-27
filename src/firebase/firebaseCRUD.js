
import { db  } from "./firebase";
import { collection, query, where, getDocs, onSnapshot ,  updateDoc , doc } from "firebase/firestore"; 


async function ifUserExist(un){

    const q =  query(collection(db,'users'),where('userName', '==', un))
    const s = await getDocs(q)
    
    if(s.docs.length === 0){
        return false
    }else if(s.docs.length === 1){
        return true
    }
}



async function getAllUsers(){

    try{
       const data = await onSnapshot(collection(db,'users'),(snap)=>snap.docs.map(i => i.data()))
       
    }catch(err){
        console.log(err)
    }
}

async function specificUser(user){

    const  name = user.toLowerCase()
    let data = []
    const q =  query(collection(db,'users'),where('userName', '==', name))
    const s = await onSnapshot(q , i => {
        i.forEach(u => data.push(u.data()))
    })
    console.log(data)
    return data

}


async function addImgUrlToPosts(ref , data){

    try{
        await updateDoc(ref , {
            posts:data
        });

    }catch(err){
        console.log(err)
    }

}


async function changeProfilePic(ref , data){

    try{
        await updateDoc(ref , {
            profilePicture:data
        });

    }catch(err){
        console.log(err)
    }

}

async function updatePostArray(uid , newArray){


    const ref = doc(db, `users` , uid  );

    try{
        await updateDoc(ref , {
            posts:newArray
        });

    }catch(err){
        console.log(err)
    }

}

async function toggleFollow( isFollowed , currentLoggedUser , targetUser , currentLoggedUserFollowing , targetUserFollwers ){

    console.log(isFollowed)
    console.log(currentLoggedUser)
    console.log(targetUser)
    console.log(currentLoggedUserFollowing)
    console.log(targetUserFollwers)

    const loggedUserRef = doc(db, `users` , currentLoggedUser  );
    const targetUserRef = doc(db, `users` , targetUser  );


    if(isFollowed){

     const newFollowing =  currentLoggedUserFollowing.filter(i => i !== targetUser)
     const newFollwers = targetUserFollwers.filter(i => i !== currentLoggedUser )


     try{

        await updateDoc(loggedUserRef , {
            following: newFollowing
        });
        await updateDoc(targetUserRef , {
            follwers: newFollwers
        });

     }catch(error){
        console.log(error)
     }

            
    }

    if(isFollowed === false) {
       currentLoggedUserFollowing.push(targetUser)
        targetUserFollwers.push(currentLoggedUser)
     
        try{
            await updateDoc(loggedUserRef , {
                following: currentLoggedUserFollowing
            });
            await updateDoc(targetUserRef , {
                follwers: targetUserFollwers
            });

        }catch(error){
            console.log(error)
        }
    }
}





export {ifUserExist , getAllUsers , specificUser , addImgUrlToPosts , changeProfilePic , updatePostArray , toggleFollow }