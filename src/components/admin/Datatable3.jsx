import React,{useState,useEffect} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';


function Datatable3({data,setData}) {
  const [bool3,setBool3]= useState(false)
  const accesToken=localStorage.getItem('token')
  axios.interceptors.request.use(
    config => {
        config.headers.authorization =  `Bearer ${accesToken}`
        return config
     },
     error =>{
        return Promise.reject(error);
    }
 )

const handleDelete= (id)=>{
  axios.delete("http://127.0.0.1:8000/conferences/admin/"+id).then(response=>{console.log(response);setBool3(!bool3)})


}

 useEffect(() => {  
  axios.get("http://127.0.0.1:8000/conferences/list/path").then(response=>
    setData(response["data"]))
}, [bool3]);



    return (
     <table  className='tb' >
 
      <thead>
       <tr>
            <th>Accepted Conferences</th>
            <th>Chairman</th>
            <th>Actions</th>
            <th>Page</th>
       </tr>
          
      </thead>

       <tbody>
    
        { data.map( (column,i) => 
          <tr key={i} > 
             <td> {column.title}</td>  
             <td>{column.name_of_host}</td>
             <td className='icons' > 
                     <FontAwesomeIcon icon={faTrashCan} className='icon-refuse'  onClick={()=>handleDelete(column.id)}/>
                      </td>
             <td>lien vers conference</td>
             
             
             
             
             
             </tr> )} 

        
        

       </tbody>






     </table>  
    
  ) 
}

export default Datatable3