import React,{useState} from 'react'
import './Admin.css'

function AdminSideBar() {
    // var element1= document.getElementById('i1');
    // var element2= document.getElementById('i2');
    // var element3= document.getElementById('i3');


    // const handleActive=(element)=>{
    //     if (!element.classList.contains('active')){
    //          element.classList.add('active')
    //     }
    // }
  
    // const [users,setUsers]=useState(true)
    // const [conferences,setConferences]=useState(false)

  return (
    <div className='adminsidebar' >
        <div className='adminsidebarwrraper' >
            <div className='adminsidebarmenu' >
                <h3 className='logo' > ConfePlan </h3>
                 <ul className='menulist' > 
                 <li className='item active' id='i1'  >Users Management</li>
                 <li className='item' id='i2'  >Users Management</li>
                 <li className='item' id='i3'  >Users Management</li>




                 </ul>


                {/* <div className='menulist' >
                    <div className='item  active'  id='i1' >Users Management</div>
                    <div className='item'  id='i2'  >Conferences Management</div>
                    <div className='item'  id='i3'>Log out</div>

                </div> */}
            </div>
        </div>
    </div>
  )
}

export default AdminSideBar