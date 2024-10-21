import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from './Sections.module.css'
import Down from '../../assets/Down.svg'
import Up from '../../assets/Up.svg'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { moveTaskInZone, deleteTask, getAllTasks } from '../../apis/task';
import toast, { Toaster } from 'react-hot-toast';
import Store from '../../Store';

const Sections = ({priority, assignTo, title, checkList, time, id, zone1, zone2, zone3, setIsOpen}) => {
  const date = new Date()
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
  const [check, setCheck] = useState(false)
  const [click, setClick] = useState(false)
  const notify = () => toast.success("Share link copied");
  const {setBacklogData, setDoneTask, setProgress, setTask, setUpdateId, setUpdate} = useContext(Store)
  const controlRef = useRef()

  function randomLetters(s) {
    const firstLetter = s[0]
    const secondLetter = s[1]
    const words = firstLetter.toUpperCase() + secondLetter.toUpperCase();
    return words
      }
  const getTasks = async ()=>{
    const response = await getAllTasks()
    const doneZoneTasks = response?.data?.filter((elem)=>{
      return elem.zone === 'Done'
    })
    const backlogZoneTasks = response?.data?.filter((elem)=>{
      return elem.zone === 'Backlog'
    })
    const todoZonetask = response?.data?.filter((elem)=>{
      return elem.zone === 'Todo'
    })
    const progressZoneTask = response?.data?.filter((elem)=>{
      return elem.zone === 'Progress'
    })
    setDoneTask(doneZoneTasks)
    setBacklogData(backlogZoneTasks)
    setTask(todoZonetask)
    setProgress(progressZoneTask)
    } 
  const moveTask = async (id, zone)=>{
    const response = await moveTaskInZone(id, {zone})
    if(response.status === 200){
      getTasks()
     toast.success("Status updated")
    }
    }
    const deleteHandle = async (id)=>{
      const response = await deleteTask(id)
      if(response.status = 200){
        getTasks()
        toast.success('Task Deleted successfully')
      }
    }
    const closeControls=(e)=>{
      if(click && controlRef.current && !controlRef.current.contains(e.target)){
        setClick(false)
      }
    }
    useEffect(()=>{
      document.addEventListener('mousedown', closeControls)
    })
  return (
      <div className={styles.display}><span className={styles.outputdot} style={{color: `${priority == 'LOW PRIORITY' ? "#63C05B" : priority == 'HIGH PRIORITY' ? "#FF2473" : priority == 'MODERATE PRIORITY' ? "#18B0FF" : null}`}} >&#11044;</span> <span className={styles.priorityname}>{priority}</span>
      <Toaster />
      {assignTo ? <span title={assignTo} className={styles.assignedEmail}>{randomLetters(assignTo)}</span> : null} 
      <span onClick={(e)=>{setClick(true)
        e.stopPropagation()
      }}  className={styles.dots}>{!click ?  <b> ... </b> : <></>}</span><br />
      {click ? <div ref={controlRef} className={styles.controls}>
      <div onClick={()=>{
      setIsOpen(true)
      setClick(false)
      setUpdateId(id)
      setUpdate({title, priority, assignTo, date, checkList})
      }} className={styles.edit}>Edit</div>
      <CopyToClipboard text={`${window.location.href}/task/${id}`} ><div onClick={notify} className={styles.share}>Share</div></CopyToClipboard>
      <div onClick={()=>deleteHandle(id)} className={styles.deletetask}>Delete</div>
      </div> : null}
      <h2 style={{marginLeft: "0", fontSize: '2vw', zIndex: '0'}}>{title.length >= 10 ? <span title={title}>{title.slice(0,10)}...</span> : <span>{title}</span>}</h2>
      <span style={{marginLeft: "0", marginRight: "0", fontSize: "1.2vw", fontWeight: "500", marginBottom: "1vh"}}>Checklist (0/{checkList?.length})</span><span style={{marginLeft: "12vw"}}>
      {check ? <img className={styles.down} onClick={()=>setCheck(false)} src={Up} alt="down arrow" /> : 
      <img className={styles.up} onClick={()=>setCheck(true)} src={Down} alt="Up arrow" />}</span>
      <div>{checkList?.map((elem, i)=>(
      check && <div key={i} className={styles.checklisttask}><input type="checkbox" name=""/>{elem}</div>))}  
      </div><br />
      <div className={styles.details}>
      {time ? <span style={{padding: "2px"}}>{months[time.substr(5,2)-1]} {time.substr(8,1)+time.substr(9,1)}</span> : <></>}
      <span className={styles.spansec} onClick={()=>moveTask(id, String(zone1))}>{zone1}</span>
      <span className={styles.spansec} onClick={()=>moveTask(id, String(zone2))}>{zone2}</span>
      <span className={styles.spansec} onClick={()=>moveTask(id, String(zone3))}>{zone3}</span>
      </div>
      </div>
  )
}

export default Sections
