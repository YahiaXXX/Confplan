import axios from 'axios'
import React,{useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import AdminMain from './AdminMain'

function Admin() {

  const accesToken=localStorage.getItem('token')

  axios.interceptors.request.use(
      config => {
          config.headers.authorization =  `Bearer ${accesToken}`
          return config
       },
       error =>{
          return Promise.reject(error);
      })
    
  return (
    <div> 
        <AdminMain/>
    </div>
  )
}

export default Admin