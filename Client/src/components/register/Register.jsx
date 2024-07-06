import React, { useState, useRef } from 'react'
import styles from './Register.module.css'
import back from '../../assets/Back.jpg'
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { RiLockLine } from "react-icons/ri";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { registerUser } from '../../apis/auth';
import { useNavigate } from 'react-router';
import Logo from '../../assets/HomePageLogo.png'
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
  const [showPwd, setShowPwd] = useState(true)
  const [showCnfPwd, setShowCnfPwd] = useState(true)
  const [samePwd, setSamePwd] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cnfPassword: ""
  })
  const navigate = useNavigate()
  const [error, setError] = useState({})
 const changeHandle = (e) =>{
setFormData({...formData, [e.target.name]: e.target.value})
 }
const passwordShow = () =>{
  setShowPwd(false)
}
const cnfPasswordShow = () =>{
  setShowCnfPwd(false)
}
const submitHandle = async (e) =>{
  e.preventDefault()
  const error = {}
  if(!formData.name.length){
    error.name = "Name Required"
  }
  if(!formData.email.length){
    error.email = "Email required"
  }
  if(!formData.password.length){
    error.password = "Password required"
  }
  if(!formData.cnfPassword.length){
    error.cnfPassword = "Confirm password required"
  }
  setError(error)
  if(formData.password !== formData.cnfPassword){
    setSamePwd(true)
  }
  const response = await registerUser({...formData})
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
    }, 1500)
  }
}
  return (
    <div className={styles.register}>
      <Toaster />
      <div className={styles.leftSection}>
      <img src={back} className={styles.imgBg} />
        <img className={styles.logo} src={Logo} alt="Register page image" />
        <h1>Welcome aboard my friend</h1>
        <p>just a couple of clicks and we start</p>
      </div> 
      <div className={styles.rightSection}>
        <h1>Register</h1>
        <form method='post'>
        <FaRegUser className={styles.name} />
          <input type="text"  placeholder='Name' name='name' onChange={changeHandle}/>
          {error.name? <p className={styles.error}>{error.name}</p>:<></>}<br />
          <MdOutlineMail className={styles.email}/>
          <input type="email" placeholder='Email' name='email' onChange={changeHandle}/>
          {error.email? <p className={styles.error}>{error.email}</p>:<></>}<br />
          <RiLockLine className={styles.pwd} />
          <input type={showPwd? "password" : "text"} placeholder='Password' name='password' onChange={changeHandle} />
          {showPwd ? <BsEye className={styles.pwdShow} onClick={passwordShow} /> : <BsEyeSlash className={styles.pwdHide} onClick={()=>setShowPwd(true)}/>}
          {error.password? <p className={styles.error}>{error.password}</p>:<></>}<br />
          <RiLockLine className={styles.cnfPwd}/>
          <input className={styles.cnfinp} type={showCnfPwd? "password" : "text"} placeholder='Confirm Password' name='cnfPassword'  onChange={changeHandle}/>
          {showCnfPwd ? <BsEye className={styles.cnfPwdShow} onClick={cnfPasswordShow}/> : <BsEyeSlash className={styles.cnfPwdHide} onClick={()=>setShowCnfPwd(true)}/>}
          {error.cnfPassword? <p className={styles.error}>{error.cnfPassword}</p>:<></>}<br />
          {samePwd ? <p style={{marginBottom: "1vh"}} className={styles.error}>Your confirm Password does not matches with Password</p> : <></>}
          <button onClick={submitHandle} className={styles.registerbtn}>Register</button>
        </form>
        <div>Have an account ?</div>
        <button onClick={()=>navigate('/login')} className={styles.login}>Log in</button>
      </div>
    </div>
  )
}

export default Register