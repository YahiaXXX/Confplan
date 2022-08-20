import axios from 'axios'
import React, { useEffect,useState } from 'react'

function useFetch(url) {
    const [data,setData]= useState(null)
    const [loading,setLoading]= useState(false)
    const [errors,setErrors]= useState(null)
     useEffect(()=>{
        setLoading(true);
        axios.get(url).then((response)=>{
          setData(response.data)


        }).catch((err)=>{
             setErrors(err)
        }).finally(()=>{
            setLoading(false)
        })
 

     },[url])
  return {data,loading,errors}
}

export default useFetch