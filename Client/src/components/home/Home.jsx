import React, { useState } from 'react'
import styles from './Home.module.css'
import Logo from '../../assets/codesandbox.svg'
import { GoDatabase } from "react-icons/go";
import { CiSettings } from "react-icons/ci";
import { PiLayoutLight } from "react-icons/pi";
import { IoLogOutOutline } from "react-icons/io5";
import {NavLink} from "react-router-dom"
import LogoutModal from '../logout modal/LogoutModal';

const Home = () => {
  const [logout, setLogout] = useState(false)
  return (
    <div className={styles.home}>
      {logout ? <LogoutModal logout={logout} setLogout={setLogout} /> : null}
    <h1><sub><img style={{height: "5vh", width : "2.5vw"}} src={Logo} alt="logo" /></sub> Pro Manage</h1>
   <NavLink to='/board' className={styles.board} style={{padding:  "1vh 6.4vw 1vh 1.5vw"}}><sub><PiLayoutLight  style={{fontSize: "2vw"}} /></sub> &nbsp;Board </NavLink><br /><br />
    <NavLink to='/analytics' className={styles.analytics} style={{padding:  ".5vh 4.38vw 1vh .8vw"}}>&nbsp;&nbsp;<sub><GoDatabase style={{fontSize: "1.9vw"}}/></sub> &nbsp;Analytics</NavLink><br /><br />
    <NavLink to='/setting' className={styles.setting} style={{padding:  ".5vh 5.8vw 1vh 1.45vw"}}><sub><CiSettings style={{fontSize: "2vw"}}/></sub> &nbsp;Setting</NavLink>
    <p onClick={()=>setLogout(true)} className={styles.logout}><sub><sub><IoLogOutOutline color='#CF3636' size={30} /></sub></sub> &nbsp; Log out</p>
    </div>
  )
}

export default Home