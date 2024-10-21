import React, { useEffect, useRef } from 'react'
import styles from './Logout.module.css'
import { useNavigate } from 'react-router'
import toast, { Toaster } from 'react-hot-toast';

const LogoutModal = ({logout, setLogout}) => {
  const navigate = useNavigate()
  const logoutRef = useRef()
  const userLogout = ()=>{
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    navigate('/login')
    setTimeout(() => {
      toast.success("User Logged out successfully")
    }, 1000);
   }
const closeLogoutModal = (e)=>{
  if(logout && logoutRef.current && !logoutRef.current.contains(e.target)){
    setLogout(false)
  }
}
useEffect(()=>{
  document.addEventListener('mousedown', closeLogoutModal)
})
  return (
    <div className={styles.logout}>
      <Toaster />
    {logout ?  <div ref={logoutRef} className={styles.logoutpop}>
      <h2>Are you sure you want to Logout?</h2><br />
       <button onClick={userLogout} className={styles.sure}>Yes, Logout</button><br />
       <button onClick={()=>setLogout(false)} className={styles.cancel}>cancel</button>
      </div> : null}
    </div>
  )
}

export default LogoutModal