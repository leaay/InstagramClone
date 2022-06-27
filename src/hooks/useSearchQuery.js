import {useEffect, useState,useContext} from "react";
import { Context } from "../context/context";

function useSearchQuery(query){

    const {allUsers} = useContext(Context)
    const [results , setResults] = useState([])

    useEffect(() => {

        if(query.length === 0){
          setResults([])
        }
        if(query.length > 1){
          const r = allUsers.filter(user => user.userName.includes(query.toLowerCase()) )
          const slicedArray = r.slice(0, 5);
          setResults(slicedArray)
        }
              
      }, [query]);

      return results

}

export default useSearchQuery;