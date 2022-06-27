import { onAuthStateChanged } from 'firebase/auth'
import React, { useState , useEffect } from 'react'
import { auth } from '../firebase/firebase'
import { specificUser } from '../firebase/firebaseCRUD'
import { db  } from "../firebase/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore"; 

const Context = React.createContext()

export default function ContextProvider({children}) {



    
    

    const [loggedUser,setLoggedUser] = useState()
    const [awaitUser ,setAwaitUser] = useState(false)
    const [headerHeight , setHeaderHeight] = useState(null)
    const [loggedUserData , setLoggedUserData] = useState(null)
    const [allUsers , setAllUsers] = useState([])
    const [allPosts ,setAllPosts] = useState([])
    const [awaitPostData , setAwaitPostData ] = useState(false)

    useEffect(() => {
      if(loggedUserData){
          let arr = []
        
          const q =  query(collection(db,'users'), where("follwers", "array-contains", loggedUserData[0].userID))
          const s = onSnapshot(q , i => {
          //    i.forEach(u => (u.data().posts.map(i => arr.push(i))))
              i.forEach(u => {
                  let postOb = {
                      profilePicture: u.data().profilePicture,
                      userName: u.data().userName,
                  }
                  u.data().posts.map(i => {
                      
                      let ob = {
                          ...postOb,
                          postDetail:i
                      }

                      arr.push(ob)

                  })
              })
          })
          setAllPosts(arr)
          setAwaitPostData(true)
         
      }
  }, [loggedUserData]);


    useEffect(() => {
      
       if(awaitUser && loggedUser){
        async function a(){
            const q =  query(collection(db,'users'),where('userName', '==', loggedUser.displayName.toLowerCase()))
            return  onSnapshot(q , i => setLoggedUserData(i.docs.map(a => a.data())))
          }
        a()
       }
    }, [awaitUser , loggedUser]);


    useEffect(()=>{

      return onSnapshot(collection(db,'users'),(snap)=>setAllUsers(snap.docs.map(doc => doc.data())))

    },[])




    onAuthStateChanged(auth , u=>{
        if (u) {
            setLoggedUser(u)
            setAwaitUser(true)
          } else {
            setLoggedUser(false)
            setAwaitUser(true)
          }
    })

    return(
        <Context.Provider value={{
                                  setLoggedUser,
                                  loggedUser,
                                  awaitUser,
                                  loggedUserData,
                                  setHeaderHeight,
                                  setLoggedUserData,
                                  setAllPosts,
                                  headerHeight,
                                  allUsers,
                                  allPosts,
                                  awaitPostData
                                  }}>
            {children}
        </Context.Provider>
    )

}
export {Context , ContextProvider}