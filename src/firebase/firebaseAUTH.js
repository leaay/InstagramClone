
import { createUserWithEmailAndPassword , signOut , signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

async function createNewUser(login , password){

    try{
        await createUserWithEmailAndPassword( auth , login , password)
        
    }
    catch(error){
        const err = error.message
        return err
    }
        
    

}

async function loginUser(login , password){
    try{
        await signInWithEmailAndPassword(auth , login , password )
        
    }
    catch(error){
        const err = error
        return err.code
    }
}


async function signUserOut(){
    try{
        await signOut(auth)

    }
    catch(error){
        const err = error.message
        return err
    }
}

export {signUserOut , createNewUser , loginUser}