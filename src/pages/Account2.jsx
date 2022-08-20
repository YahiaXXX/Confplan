import axios from 'axios'
import React,{useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import AdminMain from './AdminMain'

function Account2() {

  const accesToken=localStorage.getItem('token')
  const [isAdmin, setIsadmin] = useState()
  const navigate=useNavigate()
  const [bool,setBool]=useState(false)

  axios.interceptors.request.use(
      config => {
          config.headers.authorization =  `Bearer ${accesToken}`
          return config
       },
       error =>{
          return Promise.reject(error);
      })

   
   const Display=()=>{
     return (
        <div>
       <button className='btn-logout'  onClick={()=>{
          localStorage.removeItem('token')
          localStorage.removeItem('is_admin')

          navigate('/login')
  }} > logout </button>
     </div>

      )
    }

    
  return (
    <div> {Display()} </div>
  )
}

export default Account2