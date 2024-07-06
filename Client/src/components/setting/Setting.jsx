import React from 'react'
import styles from './Setting.module.css'
import Home from '../../components/home/Home'
import { FaRegUser } from "react-icons/fa";
import { RiLockLine } from "react-icons/ri";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useState } from 'react'
import { updateUser } from '../../apis/auth'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router';

const Setting = () => {
  const navigate = useNavigate()
  const email = localStorage.getItem('email')
  const name = localStorage.getItem('user')
  const [error, setError] = useState({})
  const [formData, setFormData] = useState({
    newName: "" || name,
    oldPassword: "",
    newPassword: ""
  })
  const [showPwd, setShowPwd] = useState(true)
  const [showUpPwd, setShowUpPwd] = useState(true)
  const [samePwd, setSamePwd] = useState(false)
  const changeHandle = (e) =>{
    setFormData({...formData, [e.target.name]: e.target.value})
     }
    const passwordShow = () =>{
      setShowPwd(false)
    }
    const upPasswordShow = () =>{
      setShowUpPwd(false)
    }
    const submitHandle = async (e) =>{
      e.preventDefault()
      const error = {}
      if(!formData.oldPassword.length){
        error.password = "Password required"
      }
      if(!formData.newPassword.length){
        error.upPassword = "Confirm password required"
      }
      setError(error)
      if(formData.oldPassword === formData.newPassword){
        setSamePwd(true)
      }
      const response = await updateUser(email,formData.newName, formData.oldPassword, formData.newPassword)
      console.log(response.success)
      if(response?.success === false){
        toast.error(response.message)
      }
      if(response?.success === true){
        toast.success(response.message)
        setTimeout(()=>{
        localStorage.clear()
          navigate('/login')
        }, 2000)
      }
    }
  return (
    <div className={styles.setting}>
      <Toaster />
   <div className={styles.leftSection}>
    <Home />
   </div>
   <div className={styles.rightSection}>
    <h1>Setting</h1>
    <form action="">
    <FaRegUser className={styles.name} />
          <input type="text" defaultValue={name} name='newName' onChange={changeHandle}/><br />
          <RiLockLine className={styles.pwd} />
          <input type={showPwd? "password" : "text"} placeholder='Old Password' name='oldPassword' onChange={changeHandle} />
          {showPwd ? <BsEye className={styles.pwdShow} onClick={passwordShow} /> : <BsEyeSlash className={styles.pwdHide} onClick={()=>setShowPwd(true)}/>}
          {error.password? <p className={styles.error}>{error.password}</p>:<></>}<br />
          <RiLockLine className={styles.cnfPwd}/>
          <input className={styles.cnfinp} type={showUpPwd? "password" : "text"} placeholder='New Password' name='newPassword' onChange={changeHandle}/>
          {showUpPwd ? <BsEye className={styles.upPwdShow} onClick={upPasswordShow}/> : <BsEyeSlash className={styles.upPwdHide} onClick={()=>setShowUpPwd(true)}/>}
          {error.upPassword? <p className={styles.error}>{error.upPassword}</p>:<></>}<br />
          {samePwd ? <p style={{marginBottom: "1vh"}} className={styles.error}>Your old Password and new Password should not be same</p> : <></>}
          <button onClick={submitHandle}  className={styles.registerbtn}>Update</button>
    </form>
   </div>
    </div>
  )
}

export default Setting