import React from 'react'
import '../Signup/Form.css'

function Login_Form({user,pwd,setUser,setPwd,formErrors,setFormErrors}) {
  return (
<div className='form1'>

    <div  className='form_inputs2_complet' >
    <input className='form_inputs2' type="email" placeholder='Email' 
         value={user} onChange={(e)=>{setUser(e.target.value);setFormErrors({}) }}/> 
         {formErrors.email && <div className='err' >{formErrors.email}</div>}
      
      </div>        
        
          
        
        
       <div className='form_inputs2_complet'  >

       <input className='form_inputs2' type="password" placeholder='Password'
         value={pwd} onChange={(e)=>{setPwd(e.target.value);setFormErrors({}) }} />
         {formErrors.password && <div className='err' >{formErrors.password}</div>}
       </div>
        
       
       
         {formErrors.other && <div className='err' >{formErrors.other}</div>}


  
  

      
      
    </div>
  )
}

export default Login_Form