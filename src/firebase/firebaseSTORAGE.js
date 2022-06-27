import { storage } from "./firebase";
import { getDownloadURL, ref , uploadBytes , deleteObject} from "firebase/storage";


async function uploadImg(userID , file){
    const imgName = userID + Date.now()
    const imgRef = ref(storage,`${userID}/${imgName}`)
   await uploadBytes(imgRef , file)

    try{
        const  imgURL = await getDownloadURL(imgRef)
        return {
            imgURL: imgURL,
            imgName: imgName
        }
    }catch(err){
        console.log(err)
    }
}

async function deleteProfilePicBeforeNewOne(userID , imgName){
   
    const Ref = ref(storage, `${userID}/${imgName}`);
    await deleteObject(Ref)

}

export {uploadImg , deleteProfilePicBeforeNewOne}