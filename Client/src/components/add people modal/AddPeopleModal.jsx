import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from './AddPeopleModal.module.css'
import { addEmail, getAllMails } from '../../apis/auth'
import toast, { Toaster } from 'react-hot-toast';
import Store from '../../Store';

const AddPeopleModal = ({setEmailOpen, emailOpen}) => {
  const [popUp, setPopUp] = useState()
  const { setMails } = useContext(Store)
  const addPeopleRef = useRef()
  const [emailId, setEmailId] = useState({
    email: []
  })
  const getMailAll = async () =>{
    const response = await getAllMails()
    setMails(response.data)
  }
  const emailAdd = async()=>{
    const response = await addEmail(emailId)
    setEmailId(response)
    setPopUp(response.email?.email)
    getMailAll()
    }
  const handleEamil = (event) => {
    setEmailId({ ...emailId, [event.target.name]: event.target.value });
    };
    const closeAddPeople = (e) =>{
      if(emailOpen && addPeopleRef.current && !addPeopleRef.current.contains(e.target)){
        setEmailOpen(false)
      }
    }
    useEffect(()=>{
      document.addEventListener('mousedown', closeAddPeople)
    })
  return (
    <div className={styles.addpeople}>
      <Toaster />
    {emailOpen ? <div ref={addPeopleRef} className={styles.addemail}>
    {!popUp ? <div>
    <h2>Add people to the board</h2><br />
    <input type='text' placeholder='Enter the email' name='email' onChange={handleEamil} /><br /><br />
    <button onClick={()=>setEmailOpen(false)} className={styles.cancleemail}>Cancel</button>
    <button onClick={emailAdd} className={styles.addemailbtn}>Add Email</button>
    </div> : <div className={styles.afteremailadd}>
    {popUp} added to board <br />
    <button onClick={()=>{setEmailOpen(false)
    setPopUp(false)
    toast.success('Email added successfully')
    }}>Okay,got it!</button>
    </div> }
    </div> : null}
    </div>
  )
}

export default AddPeopleModal