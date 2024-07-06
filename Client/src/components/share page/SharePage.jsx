import React, { useEffect } from 'react'
import styles from './SharePage.module.css'
import Logo from '../../assets/codesandbox.svg'
import {useParams} from 'react-router-dom'
import { useState } from 'react'
import { getTaskById } from '../../apis/task'
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';

const SharePage = () => {
  const [element, setElement] = useState({})
  const {id} = useParams()
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
  const notify = () => toast.error(  "Public page! readonly");
  const fetchTask = async () =>{
  if(!id) return
  const response = await getTaskById(id)
  setElement(response.data)
  }
  useEffect(()=>{
  fetchTask()
  },[])
  return (
    <div className={styles.SharePage}>
      <Toaster />
    <h1><sub><img className={styles.logo} src={Logo} alt="logo" /></sub> Pro Manage</h1>
    <div className={styles.container}>
    <span className={styles.dot} 
    style={{color: `${element?.priority == 'LOW PRIORITY' ? "#63C05B" : element?.priority == 'HIGH PRIORITY' ? "#FF2473" : element?.priority == 'MODERATE PRIORITY' ? "#18B0FF" : null}`}}>&#11044;</span>
    <span className={styles.prioritySel}>{element?.priority}</span> <br /><br />
    <div className={styles.title}>{element?.title}</div><br />
    <span className={styles.checklist}>Checklist (0/{element?.checkList?.length})</span>
    <div className={styles.checklistarr}>
    {element?.checkList?.map((elem, i)=>(
    <div key={i} className={styles.checklisttask}><sub><MdCheckBoxOutlineBlank onClick={notify} className={styles.checkbox}/></sub>{elem}</div>))}  
    </div><br />
    {element?.date ? <div className={styles.dateSel}>
      <span>Due Date</span> &nbsp; 
      <span style={{padding: "5px", backgroundColor: "#CF3636", color: "#FFFFFF", borderRadius: ".2rem"}}>{months[element?.date.charAt(6)-1]} {element?.date.charAt(8)+element?.date.charAt(9)}</span></div> : <></>}
    </div>
    </div>
  )
}

export default SharePage