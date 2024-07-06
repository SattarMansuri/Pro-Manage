import React, { useState } from 'react'
import styles from './Login.module.css'
import Logo from '../../assets/HomePageLogo.png'
import back from '../../assets/Back.jpg'
import { MdOutlineMail } from "react-icons/md";
import { RiLockLine } from "react-icons/ri";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useNavigate } from 'react-router';
import {loginUser} from '../../apis/auth'
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const [error, setError] = useState({})
  const [showPwd, setShowPwd] = useState(true)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate()
  const changeHandle = (e) =>{
    setFormData({...formData, [e.target.name]: e.target.value})
     }
  const passwordShow = () =>{
      setShowPwd(false)
    }
const submitHandle = async (e) =>{
  e.preventDefault()
  const error = {}
  if(!formData.email.length){
    error.email = "Email required"
  }
  if(!formData.password.length){
    error.password = "Password required"
  }
  setError(error)
  const response = await loginUser(formData.email, formData.password)
  if(response?.success === false){
    toast.error(response.message)
  }
  if(response?.success === true){
    localStorage.setItem('user', response.name)
       localStorage.setItem('token', response.token)
       localStorage.setItem('email', response.email)
       navigate("/Board")
    setTimeout(()=>{
       toast.success(response.message)
    }, 2000)
  }
  
    
}

  return (
    <div className={styles.login}>
      <Toaster />
    <div className={styles.leftSection}>
    <img src={back} className={styles.imgBg} />
        <img className={styles.logo} src={Logo} alt="Register page image" />
        <h1>Welcome aboard my friend</h1>
        <p>just a couple of clicks and we start</p>
    </div>
    <div className={styles.rightSection}>
    <h1>Login</h1>
    <form>
          <MdOutlineMail className={styles.email}/>
          <input type="email" placeholder='Email' name='email' onChange={changeHandle}/>
          {error.email? <p className={styles.error}>{error.email}</p>:<></>}<br />
          <RiLockLine className={styles.pwd} />
          <input type={showPwd? "password" : "text"} placeholder='Password' name='password' onChange={changeHandle} />
          {showPwd ? <LuEye className={styles.pwdShow} onClick={passwordShow} /> : <LuEyeOff className={styles.pwdHide} onClick={()=>setShowPwd(true)}/>}
          {error.password? <p className={styles.error}>{error.password}</p>:<></>}<br />
          <button onClick={submitHandle} className={styles.loginbtn}>Log in</button>
    </form>
    <div>Have no account yet?</div>
    <button onClick={()=>navigate('/')} className={styles.registerbtn}>Register</button>
    
    </div>
    </div>
  )
}

export default Login