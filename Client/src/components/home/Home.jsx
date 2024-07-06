import React, { useState } from 'react'
import styles from './Home.module.css'
import Logo from '../../assets/codesandbox.svg'
import board from '../../assets/layout.svg'
import { GoDatabase } from "react-icons/go";
import { CiSettings } from "react-icons/ci";
import { PiLayoutLight } from "react-icons/pi";
import { IoLogOutOutline } from "react-icons/io5";
import {NavLink, useNavigate} from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';
import Modal from 'react-modal';

const Home = () => {
  const navigate = useNavigate()
  const [logout, setLogout] = useState(false)

 const logoutOpen = () =>{
  setLogout(true)
 }
 const userLogout = ()=>{
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  localStorage.removeItem('email')
  navigate('/login')
  setTimeout(() => {
    toast.success("User Logged out successfully")
  }, 1000);
 }
  return (
    <div className={styles.home}>
      <Toaster />
      <Modal
        isOpen={logout}
        className={styles.logoutpop}
      >
       <h2>Are you sure you want to Logout?</h2><br />
       <button onClick={userLogout} className={styles.sure}>Yes, Logout</button><br />
       <button onClick={()=>setLogout(false)} className={styles.cancel}>cancel</button>
      </Modal>
    <h1><sub><img style={{height: "5vh", width : "2.5vw"}} src={Logo} alt="logo" /></sub> Pro Manage</h1>
   <NavLink to='/board' className={styles.board} style={{padding:  "1vh 6.4vw 1vh 1.5vw"}}><sub><PiLayoutLight  style={{fontSize: "2vw"}} /></sub> &nbsp;Board </NavLink><br /><br />
    <NavLink to='/analytics' className={styles.analytics} style={{padding:  ".5vh 4.38vw 1vh .8vw"}}>&nbsp;&nbsp;<sub><GoDatabase style={{fontSize: "1.9vw"}}/></sub> &nbsp;Analytics</NavLink><br /><br />
    <NavLink to='/setting' className={styles.setting} style={{padding:  ".5vh 5.8vw 1vh 1.45vw"}}><sub><CiSettings style={{fontSize: "2vw"}}/></sub> &nbsp;Setting</NavLink>
    <p onClick={logoutOpen} className={styles.logout}><sub><sub><IoLogOutOutline color='#CF3636' size={30} /></sub></sub> &nbsp; Log out</p>
    </div>
  )
}

export default Home